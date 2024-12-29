import express from "express";
import { connectDB } from "./config/db.js";
import router from "./route/userRoute.js";
import orderRouter from "./route/orderRoute.js";
import morgan from "morgan";
import products from "./route/productRoute.js";
import { notFound } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";
import invoiceRouter from "./route/inoviceRoute.js";
import cors from "cors";

const app = express();
const port = process.env.PORT || 4000;

connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5174",
    credentials: true,
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

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`app is listening on ${port}`);
});
