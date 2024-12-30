import express from "express";
import {
  createInvoice,
  getInvoice,
} from "../controllers/invoiceControllers.js";
import { fetchInvoices } from "../controllers/invoiceControllers.js";

const invoiceRouter = express.Router();
const app = express();

invoiceRouter.route("/invoice").post(createInvoice);
invoiceRouter.route("/invoice/:id").get(getInvoice);

invoiceRouter.get("/invoices", fetchInvoices);
export default invoiceRouter;
