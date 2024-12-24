import mongoose from "mongoose";

export const connectDB = async () => {
   await mongoose
   .connect('mongodb+srv://temiperi:temiperi123@cluster0.sjoox.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
   .then(() => {
      console.log('DB connected');
   })
}