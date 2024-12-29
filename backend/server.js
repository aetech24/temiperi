import express from "express";
import { connectDB } from "./config/db.js";
<<<<<<< HEAD
import router from "./route/userRoute.js";
import orderRouter from "./route/orderRoute.js";
import morgan from "morgan";
import products from "./route/productRoute.js";
import { notFound } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";
import invoiceRouter from "./route/inoviceRoute.js";
import cors from "cors";

const app = express();
=======
import morgan from "morgan";
import { notFound } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";
import bodyParser from "body-parser";
import cors from 'cors'
import orderRouter from "./route/orderRoute.js";
import productsRouter from "./route/productRoute.js";
import invoiceRouter from "./route/inoviceRoute.js";

const app = express()
>>>>>>> 97e05c18e7d04786bdefc534ce840a5ec71f1cf3
const port = process.env.PORT || 4000;

connectDB();

<<<<<<< HEAD
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
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
=======

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
>>>>>>> 97e05c18e7d04786bdefc534ce840a5ec71f1cf3

app.use(notFound);
app.use(errorHandler);

<<<<<<< HEAD
app.listen(port, () => {
  console.log(`app is listening on ${port}`);
});
=======

app.listen(port, () => {
   console.log(`app is listening on ${port}`)
})
>>>>>>> 97e05c18e7d04786bdefc534ce840a5ec71f1cf3
