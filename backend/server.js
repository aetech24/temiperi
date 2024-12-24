import express from "express";
import { connectDB } from "./config/db.js";
import morgan from "morgan";
import { notFound } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";
import bodyParser from "body-parser";
import cors from 'cors'
import orderRouter from "./route/orderRoute.js";
import productsRouter from "./route/productRoute.js";
import invoiceRouter from "./route/inoviceRoute.js";

const app = express()
const port = process.env.PORT || 4000;

connectDB();


app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(morgan('tiny'))
app.use(bodyParser.json())


app.use(cors());

app.use('/temiperi', invoiceRouter)
app.use('/temiperi', orderRouter)
app.use('/temiperi', productsRouter)
app.use('/temiperi', invoiceRouter)

app.get('/temiperi', (req, res) => {
   res.send('software is working');
})

app.use(notFound);
app.use(errorHandler);


app.listen(port, () => {
   console.log(`app is listening on ${port}`)
})