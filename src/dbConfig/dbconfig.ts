import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    connection.once("connected", () => {
      console.log("connected to the database successfully.");
    });
    connection.on("error", (error) => {
      console.log(
        "MongoDB connection error, please make sure mongodb is running: " +
          error
      );
      process.exit();
    });
  } catch (error) {
    console.log("something went wrong while connecting to the database.");
    console.log(error);
  }
}
