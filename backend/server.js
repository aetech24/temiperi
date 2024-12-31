import express from "express";
import { connectDB } from "./config/db.js";
import router from "./route/userRoute.js";
import orderRouter from "./route/orderRoute.js";
import morgan from "morgan";
import products from "./route/productRoute.js";
import { notFound } from "./middleware/notFound.js";
import { fetchInvoices } from "./controllers/invoiceControllers.js";
import { errorHandler } from "./middleware/errorHandler.js";
import invoiceRouter from "./route/inoviceRoute.js";
import cors from "cors";
import {
  clearDatabase,
  deleteProduct,
  updateProduct,
  updateProductField,
} from "./controllers/productController.js";

const app = express();
const port = process.env.PORT || 4000;

connectDB();
app.use(
  cors({
    origin: "*", // Allow all origins
    credentials: false, // No cookies or Authorization headers needed
    allowedHeaders: [
      "Content-Type",
      "Content-Length",
      "Keep-Alive",
      "X-Requested-With",
      "X-Powered-By",
      "Connection",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  })
);

// Handle OPTIONS requests globally
app.options("*", cors()); // Explicitly handle OPTIONS

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("tiny"));
app.use("/temiperi", router);
app.use("/temiperi", orderRouter);
app.use("/temiperi", products);
app.use("/temiperi", invoiceRouter);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.get("/", (req, res) => {
  res.send("software is working");
});

app.use("/product-update", updateProduct);
app.use("/clear-products", clearDatabase);

app.patch(`/temiperi/products`, updateProductField);

app.delete(`/temiperi/delete-product`, deleteProduct);
// app.use(notFound);
// app.use(errorHandler);

app.listen(port, () => {
  console.log(`app is listening on ${port}`);
});
