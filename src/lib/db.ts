import mongoose from "mongoose";

let isConnected = false; // Track the connection

export async function connect() {
  if (isConnected) {
    return; // Skip if already connected
  }

  try {
    await mongoose.connect(process.env.DATABASE_URL!);

    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected");
    });

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error: " + err);
      process.exit(1);
    });

    isConnected = true; // Set flag
  } catch (error) {
    console.error("Something went wrong in connecting to DB");
    console.error(error);
  }
}
