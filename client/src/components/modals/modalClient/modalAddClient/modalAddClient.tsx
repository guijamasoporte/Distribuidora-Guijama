import React, { useEffect, useState } from "react";
import { Modal, TextField, Button, Dialog } from "@mui/material";
import styles from "./modalAddClient.module.css";
import InstanceOfAxios from "../../../../utils/intanceAxios";

interface CreateClientModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (newClient: any) => void;
}

const CreateClientModal: React.FC<CreateClientModalProps> = ({
  open,
  onClose,
  onCreate,
}) => {
  const [newClient, setNewClient] = useState({
    name: "",
    lastName: "",
    phone: "",
    email: "",
    adress: "",
    buys: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setNewClient({
      ...newClient,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onCreate(newClient);
    onClose();
  };

  return (
    <Dialog className={styles.containerForm} open={open} onClose={onClose}>
      <div className={styles.modal}>
        <p className={styles.titleForm}>Agregar nuevo cliente</p>
        <div className={styles.formInputs}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <TextField
              className={styles.formField}
              name="name"
              label="Nombre"
              value={newClient.name}
              fullWidth
              onChange={(e) => handleChange(e)}
              inputProps={{ maxLength: 20 }}
            />
            <TextField
              className={styles.formField}
              name="lastName"
              label="Apellido"
              value={newClient.lastName}
              fullWidth
              onChange={(e) => handleChange(e)}
              inputProps={{ maxLength: 20 }}
            />
            <TextField
              className={styles.formField}
              name="phone"
              label="Teléfono"
              value={newClient.phone}
              fullWidth
              onChange={(e) => handleChange(e)}
              inputProps={{ maxLength: 20 }}
            />
            <TextField
              className={styles.formField}
              name="email"
              label="Email"
              value={newClient.email}
              fullWidth
              onChange={(e) => handleChange(e)}
              inputProps={{ maxLength: 20 }}
            />
            <TextField
              className={styles.formField}
              name="adress"
              label="Dirección"
              value={newClient.adress}
              fullWidth
              onChange={(e) => handleChange(e)}
              inputProps={{ maxLength: 20 }}
            />

            <button className={styles.buttonAdd} type="submit">
              Agregar Cliente
            </button>
          </form>
        </div>
      </div>
    </Dialog>
  );
};

export default CreateClientModal;