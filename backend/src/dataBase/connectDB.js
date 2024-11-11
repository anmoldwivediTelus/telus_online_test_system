import mongoose from "mongoose";

const connectBD = async (DB_URL) => {
  try {
    await mongoose.connect(DB_URL).then((res) => {
      console.log(`DB connected sucessfully at: ${res.connection.host}`);
    });
  } catch (error) {
    console.log(`Failed to connect DB error is:- ${error.message}`)
    process.exit(1);
  }
};

export default connectBD;