const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = require("./app");

// Load configuration file
dotenv.config({ path: "./config.env" });
// Obtain server connection details from configuration file
const database = process.env.DATABASE;
const port = process.env.PORT || 3000;

// Connect to the server
mongoose
  .connect(database)
  .then(console.log("Connect to database successfully."));

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
});
