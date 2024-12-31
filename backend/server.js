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

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.options("*", cors());
app.use(
  cors({
    origin: [
      "http://localhost:5174",
      "http://localhost:5173",
      "https://temiperi-stocks-frontend.onrender.com",
      "https://temiperi-stocks-admin.onrender.com",
      "https://temiperi-frontend.vercel.app",
    ],
    credentials: true,
    allowedHeaders: [
      "Content-Type",
      "Content-Length",
      "Access-Control-Allow-Credentials",
      "Keep-Alive",
      "X-Requested-With",
      "X-Powered-By",
      "Connection",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  })
);

app.use(express.json());
app.use(morgan("tiny"));
app.use("/temiperi", router);
app.use("/temiperi", orderRouter);
app.use("/temiperi", products);
app.use("/temiperi", invoiceRouter);

app.get("/", (req, res) => {
  res.send("software is working");
});

app.patch("/product-update", updateProduct);
app.delete("/clear-products", clearDatabase);

app.patch(`/temiperi/products`, updateProductField);

app.delete(`/temiperi/delete-product`, deleteProduct);
// app.use(notFound);
// app.use(errorHandler);

app.listen(port, () => {
  console.log(`app is listening on ${port}`);
});
