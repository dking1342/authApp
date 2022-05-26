import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = process.env.MONGO_URI;
    const options = {
      useNewUrlParser:true,
      useUnifiedTopology:true
    }
    await mongoose.connect(conn, options);
    console.log(`Mongodb connected...`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}