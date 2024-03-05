interface Product {
  codigo: string;
  titulo: string;
  rubro: string;
  marca: string;
  stock: number;
  precioCosto: number;
  precioVenta: number;
}

const fakeProducts: Product[] = [
  {
    codigo: "001",
    titulo: "Producto 1",
    rubro: "Rubro 1",
    marca: "Marca 1",
    stock: 100,
    precioCosto: 500,
    precioVenta: 1000,
  },
  {
    codigo: "002",
    titulo: "Producto 2",
    rubro: "Rubro 2",
    marca: "Marca 2",
    stock: 20,
    precioCosto: 700,
    precioVenta: 1500,
  },
  {
    codigo: "003",
    titulo: "Producto 3",
    rubro: "Rubro 3",
    marca: "Marca 3",
    stock: 560,
    precioCosto: 1500,
    precioVenta: 2500,
  },
  {
    codigo: "004",
    titulo: "Tabaco Chocolate",
    rubro: "Tabacos",
    marca: "Pindonga",
    stock: 890,
    precioCosto: 800,
    precioVenta: 1600,
  },
  {
    codigo: "005",
    titulo: "Producto 5",
    rubro: "Rubro 5",
    marca: "Marca 5",
    stock: 15,
    precioCosto: 2900,
    precioVenta: 5000,
  },
  {
    codigo: "001",
    titulo: "Producto 1",
    rubro: "Rubro 1",
    marca: "Marca 1",
    stock: 100,
    precioCosto: 500,
    precioVenta: 1000,
  },
  {
    codigo: "002",
    titulo: "Producto 2",
    rubro: "Rubro 2",
    marca: "Marca 2",
    stock: 20,
    precioCosto: 700,
    precioVenta: 1500,
  },
  {
    codigo: "003",
    titulo: "Producto 3",
    rubro: "Rubro 3",
    marca: "Marca 3",
    stock: 560,
    precioCosto: 1500,
    precioVenta: 2500,
  },
  {
    codigo: "004",
    titulo: "Producto 4",
    rubro: "Rubro 4",
    marca: "Marca 4",
    stock: 890,
    precioCosto: 800,
    precioVenta: 1600,
  },
  {
    codigo: "005",
    titulo: "Producto 5",
    rubro: "Rubro 5",
    marca: "Marca 5",
    stock: 15,
    precioCosto: 2900,
    precioVenta: 5000,
  },
  {
    codigo: "001",
    titulo: "Producto 1",
    rubro: "Rubro 1",
    marca: "Marca 1",
    stock: 100,
    precioCosto: 500,
    precioVenta: 1000,
  },
  {
    codigo: "002",
    titulo: "Producto 2",
    rubro: "Rubro 2",
    marca: "Marca 2",
    stock: 20,
    precioCosto: 700,
    precioVenta: 1500,
  },
  {
    codigo: "003",
    titulo: "Producto 3",
    rubro: "Rubro 3",
    marca: "Marca 3",
    stock: 560,
    precioCosto: 1500,
    precioVenta: 2500,
  },
  {
    codigo: "004",
    titulo: "Producto 4",
    rubro: "Rubro 4",
    marca: "Marca 4",
    stock: 890,
    precioCosto: 800,
    precioVenta: 1600,
  },
  {
    codigo: "005",
    titulo: "Producto 5",
    rubro: "Rubro 5",
    marca: "Marca 5",
    stock: 15,
    precioCosto: 2900,
    precioVenta: 5000,
  },
  {
    codigo: "001",
    titulo: "Producto 1",
    rubro: "Rubro 1",
    marca: "Marca 1",
    stock: 100,
    precioCosto: 500,
    precioVenta: 1000,
  },
  {
    codigo: "002",
    titulo: "Producto 2",
    rubro: "Rubro 2",
    marca: "Marca 2",
    stock: 20,
    precioCosto: 700,
    precioVenta: 1500,
  },
  {
    codigo: "003",
    titulo: "Producto 3",
    rubro: "Rubro 3",
    marca: "Marca 3",
    stock: 560,
    precioCosto: 1500,
    precioVenta: 2500,
  },
  {
    codigo: "004",
    titulo: "Producto 4",
    rubro: "Rubro 4",
    marca: "Marca 4",
    stock: 890,
    precioCosto: 800,
    precioVenta: 1600,
  },
  {
    codigo: "005",
    titulo: "Producto 5",
    rubro: "Rubro 5",
    marca: "Marca 5",
    stock: 15,
    precioCosto: 2900,
    precioVenta: 5000,
  },
  {
    codigo: "001",
    titulo: "Producto 1",
    rubro: "Rubro 1",
    marca: "Marca 1",
    stock: 100,
    precioCosto: 500,
    precioVenta: 1000,
  },
  {
    codigo: "002",
    titulo: "Producto 2",
    rubro: "Rubro 2",
    marca: "Marca 2",
    stock: 20,
    precioCosto: 700,
    precioVenta: 1500,
  },
  {
    codigo: "003",
    titulo: "Producto 3",
    rubro: "Rubro 3",
    marca: "Marca 3",
    stock: 560,
    precioCosto: 1500,
    precioVenta: 2500,
  },
  {
    codigo: "004",
    titulo: "Producto 4",
    rubro: "Rubro 4",
    marca: "Marca 4",
    stock: 890,
    precioCosto: 800,
    precioVenta: 1600,
  },
  {
    codigo: "005",
    titulo: "Producto 5",
    rubro: "Rubro 5",
    marca: "Marca 5",
    stock: 15,
    precioCosto: 2900,
    precioVenta: 5000,
  },
  {
    codigo: "001",
    titulo: "Producto 1",
    rubro: "Rubro 1",
    marca: "Marca 1",
    stock: 100,
    precioCosto: 500,
    precioVenta: 1000,
  },
  {
    codigo: "002",
    titulo: "Producto 2",
    rubro: "Rubro 2",
    marca: "Marca 2",
    stock: 20,
    precioCosto: 700,
    precioVenta: 1500,
  },
  {
    codigo: "003",
    titulo: "Producto 3",
    rubro: "Rubro 3",
    marca: "Marca 3",
    stock: 560,
    precioCosto: 1500,
    precioVenta: 2500,
  },
  {
    codigo: "004",
    titulo: "Producto 4",
    rubro: "Rubro 4",
    marca: "Marca 4",
    stock: 890,
    precioCosto: 800,
    precioVenta: 1600,
  },
  {
    codigo: "005",
    titulo: "Producto 5",
    rubro: "Rubro 5",
    marca: "Marca 5",
    stock: 15,
    precioCosto: 2900,
    precioVenta: 5000,
  },
  {
    codigo: "001",
    titulo: "Producto 1",
    rubro: "Rubro 1",
    marca: "Marca 1",
    stock: 100,
    precioCosto: 500,
    precioVenta: 1000,
  },
  {
    codigo: "002",
    titulo: "Producto 2",
    rubro: "Rubro 2",
    marca: "Marca 2",
    stock: 20,
    precioCosto: 700,
    precioVenta: 1500,
  },
  {
    codigo: "003",
    titulo: "Producto 3",
    rubro: "Rubro 3",
    marca: "Marca 3",
    stock: 560,
    precioCosto: 1500,
    precioVenta: 2500,
  },
  {
    codigo: "004",
    titulo: "Producto 4",
    rubro: "Rubro 4",
    marca: "Marca 4",
    stock: 890,
    precioCosto: 800,
    precioVenta: 1600,
  },
  {
    codigo: "005",
    titulo: "Producto 5",
    rubro: "Rubro 5",
    marca: "Marca 5",
    stock: 15,
    precioCosto: 2900,
    precioVenta: 5000,
  },
  {
    codigo: "001",
    titulo: "Producto 1",
    rubro: "Rubro 1",
    marca: "Marca 1",
    stock: 100,
    precioCosto: 500,
    precioVenta: 1000,
  },
  {
    codigo: "002",
    titulo: "Producto 2",
    rubro: "Rubro 2",
    marca: "Marca 2",
    stock: 20,
    precioCosto: 700,
    precioVenta: 1500,
  },
  {
    codigo: "003",
    titulo: "Producto 3",
    rubro: "Rubro 3",
    marca: "Marca 3",
    stock: 560,
    precioCosto: 1500,
    precioVenta: 2500,
  },
  {
    codigo: "004",
    titulo: "Producto 4",
    rubro: "Rubro 4",
    marca: "Marca 4",
    stock: 890,
    precioCosto: 800,
    precioVenta: 1600,
  },
  {
    codigo: "005",
    titulo: "Producto 5",
    rubro: "Rubro 5",
    marca: "Marca 5",
    stock: 15,
    precioCosto: 2900,
    precioVenta: 5000,
  },
];

export default fakeProducts;