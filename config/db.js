import mongoose from "mongoose";//import mongoose library

const connectDB = async () => {//creating function and using async means this function can use await for asynchronous operations like database connection 
  await mongoose.connect(process.env.MONGO_URI);
  /** mongoose.connect() → starts the connection.
   * process.env.MONGO_URI → reads the MongoDB connection string from environment variables
   * await ensures the app waits until the connection is successful before moving on.
  */
  console.log("MongoDB Connected");
};

export default connectDB;
/**
 * Exports the connectDB function so it can be used in other files
 * import connectDB from "./config/db.js";
    connectDB();

 */
