const mongoose = require("mongoose");

const DBConnection = async () => {
  mongoose
    .connect("mongodb://root:password@mongo:27017/", {
      dbName: "logger",
    })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error: any) => {
      console.error("Error connecting to MongoDB:", error);
    });
};

export default DBConnection;
