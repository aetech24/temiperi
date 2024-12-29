import mongoose from "mongoose";

export const connectDB = async () => {
<<<<<<< HEAD
  await mongoose
    .connect(
      "mongodb+srv://temiperi:temiperi123@cluster0.sjoox.mongodb.net/?retryWrites=true&w=majority&appName=temiperi"
    )
    .then(() => {
      console.log("DB connected");
    })
    .catch("There was an error connecting to the database");
};
=======
   await mongoose
   .connect('mongodb+srv://temiperi:temiperi123@cluster0.sjoox.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
   .then(() => {
      console.log('DB connected');
   })
}
>>>>>>> 97e05c18e7d04786bdefc534ce840a5ec71f1cf3
