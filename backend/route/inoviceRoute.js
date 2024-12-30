import express from "express";
import {
  createInvoice,
  getInvoice,
} from "../controllers/invoiceControllers.js";

const invoiceRouter = express.Router();

invoiceRouter.route("/invoice").post(createInvoice);
invoiceRouter.route("/invoice/:id").get(getInvoice);

export default invoiceRouter;
