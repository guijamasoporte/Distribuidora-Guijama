import React, { useCallback, useEffect, useState } from "react";
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ReceiptIcon from "@mui/icons-material/Receipt";
import styles from "./sales.module.css";
import SearchBar from "../../components/searchBar/searchBar";
import InstanceOfAxios from "../../utils/intanceAxios";
import Pagination from "../../components/pagination/pagination";
import ModalComponent from "../../components/modals/modalSale/modalAddSale/modalAddSale";
import { Sales } from "../../interfaces/interfaces";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import Swal from "sweetalert2";
import Modal from "@mui/material/Modal";

import { formatNumberWithCommas } from "../../utils/formatNumberwithCommas";
import Pdfinvoice from "../../components/pdfComponents/pdfInvoice";
import { GetDecodedCookie } from "../../utils/DecodedCookie";
import EditDueSaleComponent from "../../components/modals/modalSale/modalDueEditSale/modalDueEditSale";
import EditSaleComponent from "../../components/modals/modalSale/modalEditSale/modalEditSale";
import { FadeLoader } from "react-spinners";

const SalesPage: React.FC = () => {
  const [dataSales, setDataSales] = useState<Sales[]>([]);
  const [salesSelected, setSalesSelected] = useState<Sales | null>(null);
  const [filters, setFilters] = useState<Partial<Sales>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(
    parseInt(localStorage.getItem("currentPageSales") || "1", 10)
  );
  const salesPerPage = 10;
  const [stateFilter, setStateFilter] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editDueModalOpen, setEditDueModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [totalSale, setTotalsale] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      const response: any = await InstanceOfAxios("/sales", "GET");
      setDataSales(response);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [modalOpen, editDueModalOpen, editModalOpen]);

  const handleChange = (value: string | null, field: keyof Sales) => {
    setFilters({
      ...filters,
      [field]: value !== null ? value : "",
    });
  };

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  const filteredSales: any = dataSales.filter((sale) => {
    const clientName = sale.client ? sale.client.name.toLowerCase() : "";
    const clientLastName = sale.client ? sale.client.lastName.toLowerCase() : "";
    const saleId = sale.idSale ? sale.idSale.toString().toLowerCase() : "";
    const dateObj = sale.date ? new Date(sale.date) : null;
    const date = dateObj ? dateObj.toISOString().split("T")[0] : ""; // Extraer solo la fecha sin la hora
    const year = dateObj ? dateObj.getFullYear().toString() : ""; // Extraer el año
    const priceTotal = sale.priceTotal ? sale.priceTotal.toString().toLowerCase() : "";
    const duesPayd = sale.dues ? sale.dues.payd.toString().toLowerCase() : "";
    const duesCant = sale.dues ? sale.dues.cant.toString().toLowerCase() : "";
    const createdBy = sale.createdBy ? sale.createdBy.toString().toLowerCase() : "";
    const searchTermLower = searchTerm.toLowerCase();
    const state = sale.state ? "Cerrada" : "Pendiente";
  
    const selectedMonthIndex = selectedMonth ? parseInt(selectedMonth) - 1 : -1; // Convertir el mes seleccionado a número
  
    return (
      (clientName.includes(searchTermLower) ||
        clientLastName.includes(searchTermLower) ||
        saleId.includes(searchTermLower) ||
        date.includes(searchTermLower) || // Comprobar si la fecha incluye el término de búsqueda
        priceTotal.includes(searchTermLower) ||
        duesPayd.includes(searchTermLower) ||
        duesCant.includes(searchTermLower) ||
        createdBy.includes(searchTermLower)) &&
      (stateFilter ? year === stateFilter : true) && // Filtrar por año seleccionado
      (filters.idSale ? saleId.includes(filters.idSale.toString().toLowerCase()) : true) &&
      (filters.client ? clientName.includes(filters.client.toString().toLowerCase()) : true) &&
      (filters.createBy ? createdBy.includes(filters.createBy.toString().toLowerCase()) : true) &&
      (selectedMonthIndex === -1 || (dateObj && dateObj.getMonth() === selectedMonthIndex)) && // Comparar con el mes seleccionado
      (selectedMethod ? sale.method === selectedMethod.trim() : true) // Comparación con método de pago seleccionado
    );
  });
  

  const indexOfLastSale = currentPage * salesPerPage;
  const indexOfFirstSale = indexOfLastSale - salesPerPage;
  const currentSales = filteredSales.slice(indexOfFirstSale, indexOfLastSale);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const formatDateModal = (isoDate: string): string => {
    const date = new Date(isoDate);
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
    };

    const formattedDate: string = new Intl.DateTimeFormat("es-AR", options).format(date);
    return formattedDate;
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const closeEditDueModal = () => {
    setEditDueModalOpen(false);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, eliminarlo!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const token = GetDecodedCookie("cookieToken");
        InstanceOfAxios(`/sales/${id}`, "DELETE", undefined, token).then(() => fetchData());
        Swal.fire("¡Eliminado!", "la venta ha sido eliminado.", "success");
      }
    });
    fetchData();
  };

  const calculateTotals = () => {
    const filteredSalesFunction = filteredSales.filter((sale: Sales) =>
      Object.values(sale).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    const saleTotal = filteredSalesFunction.reduce(
      (acc: number, sale: Sales) => acc + Number(sale.priceTotal),
      0
    );

    setTotalsale(saleTotal);
  };

  useEffect(() => {
    calculateTotals();
  }, [searchTerm, dataSales, filteredSales]);

  const emailToNameMap: Record<string, string> = {
    "bisogni45@gmail.com": "Juan Pablo",
    "matee.biso@icloud.com": "Mateo",
  };

  useEffect(() => {
    localStorage.setItem("currentPageSales", currentPage.toString());
  }, [currentPage]);

  return (
    <div className={styles.tableContainer}>
      <h1 className={styles.title}>Listado de ventas</h1>
      {loading === true ? (
        <div className={styles.loaderContainer}>
          <FadeLoader
            color="#603e20"
            height={23}
            width={5}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <>
          <div className={styles.filters}>
            <Autocomplete
              className={styles.autocomplete}
              disablePortal
              id="combo-box-id"
              options={Array.from(new Set(dataSales.map((sale) => sale.idSale?.toString() || "")))}
              sx={{ width: 200 }}
              renderInput={(params) => <TextField {...params} label="ID" />}
              onChange={(event, value) => handleChange(value, "idSale")}
            />
            <Autocomplete
              className={styles.autocomplete}
              disablePortal
              id="combo-box-nombre"
              options={Array.from(new Set(dataSales.map((sale) => sale.client.name)))}
              sx={{ width: 200 }}
              renderInput={(params) => <TextField {...params} label="Nombre" />}
              onChange={(event, value) => handleChange(value, "client")}
            />
            <Autocomplete
              className={styles.autocomplete}
              disablePortal
              id="combo-box-mes"
              options={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]} // Opciones de meses como cadenas
              sx={{ width: 200 }}
              renderInput={(params) => <TextField {...params} label="Mes" />}
              onChange={(event, value) => setSelectedMonth(value ? value.toString() : null)} // Convertir el valor a cadena antes de asignarlo
            />

            <Autocomplete
              className={styles.autocomplete}
              disablePortal
              id="combo-box-estado"
              options={Array.from(
                new Set(dataSales.map((sale) => new Date(sale.date).getFullYear()))
              )}
              sx={{ width: 200 }}
              renderInput={(params) => <TextField {...params} label="Año" />}
              onChange={(event, value) => setStateFilter(value ? value.toString() : null)}
            />

            <Autocomplete
              className={styles.autocomplete}
              disablePortal
              id="combo-box-estado"
              options={["Cerrada", "Pendiente"]}
              sx={{ width: 200 }}
              renderInput={(params) => <TextField {...params} label="Estado" />}
              onChange={(event, value) => setStateFilter(value)}
            />

            <Autocomplete
              className={styles.autocomplete}
              disablePortal
              id="combo-box-metodo"
              options={["Transferencia", "Efectivo"]}
              sx={{ width: 200 }}
              renderInput={(params) => <TextField {...params} label="Método" />}
              onChange={(event, value) => setSelectedMethod(value)}
            />

            <SearchBar onSearch={handleSearch} />
            <Autocomplete
              className={styles.autocomplete}
              disablePortal
              id="combo-box-creador"
              options={Array.from(new Set(dataSales.map((sale) => sale.createdBy)))}
              sx={{ width: 200 }}
              renderInput={(params) => <TextField {...params} label="Creador" />}
              onChange={(event, value) => handleChange(value, "createBy")}
              getOptionLabel={(option) => emailToNameMap[option] || option}
            />
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th className={styles.dateTable}>Fecha</th>
                  <th>Total</th>
                  <th>Cuotas</th>
                  <th>Remito</th>
                  <th>Estado</th>
                  <th>Metodo</th>
                  <th>Ed.Cuotas</th>
                  <th>Mod. Venta</th>
                  <th>Borrar</th>
                </tr>
              </thead>

              <tbody>
                {currentSales.map((sale: Sales, index: number) => (
                  <tr key={index}>
                    <td>{sale.idSale}</td>
                    <td>{sale.client.name}</td>
                    <td>{sale.client.lastName}</td>
                    <td>{formatDateModal(sale.date)}</td>
                    <td className={styles.amountTable}>
                      $ {formatNumberWithCommas(sale.priceTotal)}
                    </td>
                    <td>
                      {sale.dues.payd.filter((state) => state === true).length} / {sale.dues.cant}
                    </td>
                    <td>
                      <PDFDownloadLink
                        document={<Pdfinvoice sales={sale} id={index} saleClient={""} />}
                        fileName={sale.client.name + "_" + sale.idSale + ".pdf"}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={styles.iconPDF}
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                          <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                          <path d="M9 9l1 0" />
                          <path d="M9 13l6 0" />
                          <path d="M9 17l6 0" />
                        </svg>
                      </PDFDownloadLink>
                      {/* <PDFViewer>
                 <Pdfinvoice sales={sale} id={index} saleClient={""} />
                </PDFViewer> */}
                    </td>
                    <td>{sale.state ? "Cerrada" : "Pendiente"}</td>
                    <td>{sale.method ? sale.method : "-"}</td>
                    <td>
                      <button
                        className={styles.buttonEdit}
                        onClick={() => {
                          setEditDueModalOpen(true);
                          setSalesSelected(sale);
                        }}
                      >
                        <ReceiptIcon />
                      </button>
                    </td>
                    <td>
                      <button
                        className={styles.buttonEdit}
                        onClick={() => {
                          setEditModalOpen(true);
                          setSalesSelected(sale);
                        }}
                      >
                        <EditIcon />
                      </button>
                    </td>
                    <td>
                      <button
                        className={styles.buttonEdit}
                        onClick={() => handleDelete(`${sale._id}`)}
                      >
                        <DeleteIcon />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.totalsData}>
            <p className={styles.totalCat}>Total de Ventas: ${formatNumberWithCommas(totalSale)}</p>
          </div>
          <Pagination
            totalItems={filteredSales.length}
            itemsPerPage={salesPerPage}
            currentPage={currentPage}
            paginate={paginate}
          />

          <div className={styles.buttonsFooter}>
            <button className={styles.buttonAdd} onClick={openModal}>
              Cargar nueva venta
            </button>
            <ModalComponent open={modalOpen} onClose={closeModal} />
          </div>
        </>
      )}
      <Modal open={editDueModalOpen} onClose={closeEditDueModal}>
        <div>
          {salesSelected && (
            <EditDueSaleComponent
              salesSelected={salesSelected}
              onClose={closeEditDueModal}
              setSalesSelected={setSalesSelected}
            />
          )}
        </div>
      </Modal>
      <Modal open={editModalOpen} onClose={closeEditModal}>
        <div>
          {salesSelected && (
            <EditSaleComponent
              open={editModalOpen}
              salesSelected={salesSelected}
              onClose={closeEditModal}
            />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default SalesPage;
