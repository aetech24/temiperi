import express from "express";
import {
  createInvoice,
  getInvoices,
  getInvoice,
} from "../controllers/invocieControllers.js";

const invoiceRouter = express.Router();

invoiceRouter.get("/get-invoices", getInvoices);
invoiceRouter.route("/invoice").post(createInvoice);
invoiceRouter.route("/invoice/:id").get(getInvoice);

export default invoiceRouter;
