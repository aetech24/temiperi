import express from 'express'
import { createInvoice, getInvoices, getInvoice } from '../controllers/invocieControllers.js'
const invoiceRouter = express.Router()

invoiceRouter.route('/invoice').post(createInvoice)
invoiceRouter.route('/invoice').get(getInvoices)
invoiceRouter.route('/invoice/:id').get(getInvoice);

export default invoiceRouter