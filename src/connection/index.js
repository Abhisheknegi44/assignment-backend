import mongoose from "mongoose";
import config from "../../config.js";
const { DATABASE } = config

const connectWithRetry = () => {
  mongoose
    .connect(DATABASE)
    .then(() => {
      console.log("Database is connected");
    })
    .catch((error) => {
      console.error("Failed to connect with database", error);
      setTimeout(connectWithRetry, 5000);
    });
};
connectWithRetry();