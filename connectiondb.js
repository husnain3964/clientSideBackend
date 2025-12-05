const mongoose = require("mongoose");
const dbConnection = () => {
  mongoose
    .connect(process.env.MOnGO_URI)
    .then(() => {
      console.log("Database Connect");
    })
    .catch((e) => {
      console.log("Error while connecting to database", e);
    });
};

module.exports = dbConnection;
