import mongoose from "mongoose";
const connectDB = async () => {
  const url = "mongodb://127.0.0.1:27017/register";
  mongoose.connect(url, { useNewUrlParser: true });
  const db = mongoose.connection;
  db.once("open", (_) => {
    console.log("Database connected:", url);
  });

  db.on("error", (err) => {
    console.error("connection error:", err);
  });
};

export default connectDB;
