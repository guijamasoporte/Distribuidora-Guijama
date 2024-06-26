import mongoose from "mongoose";

const SaleSchema = new mongoose.Schema({
  idSale: {
    type: String,
  },
  date: {
    type: Date,
  },
  products: {
    type: Array,
  },
  priceTotal: {
    type: Number,
  },
  client: {
    type: Object,
    default: {},
  },
  dues: {
    type: Object,
    default: {
      payd: [false],
      cant: 1,
    },
  },
  createdBy: {
    type: String,
    default: "",
  },
  method: {
    type: String,
    default: "Efectivo",
  },
  state: {
    type: Boolean,
    default: false, //sale open
  },
});

SaleSchema.pre("save", async function (next) {
  if (!this.isNew) {
    return next();
  }
  // Función auxiliar para rellenar con ceros a la izquierda
  function padWithZeros(number, length) {
    let result = "" + number;
    while (result.length < length) {
      result = "0" + result;
    }
    return result;
  }
  try {
    const lastSale = await Sale.findOne().sort({ idSale: -1 });

    if (lastSale) {
      this.idSale = padWithZeros(Number(lastSale.idSale) + 1, 8);
    } else {
      this.idSale = "00000001";
    }

    next();
  } catch (error) {
    console.error("Error during pre-save hook:", error);
    next(error);
  }
});

export const Sale = mongoose.model("Sale", SaleSchema);
