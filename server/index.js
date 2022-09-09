const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const apiRoutes = require("./routes/routes");

const app = express();
const PORT = process.env.PORT || 3001;

// recieve from data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//connects to MongoDB
const dbURI =
  "mongodb+srv://sunny:son0949503358@todo-app.1dbrzi9.mongodb.net/todo-app?retryWrites=true&w=majority";

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connect to DB successfully.");
  })
  .catch((err) => {
    console.error(err);
    console.log("There is some problem with DB Connection. Please try again.");
  });

app.use("/", apiRoutes);

app.listen(PORT, (err) => {
  if (err) console.log("Error in server setup.");

  console.log(`Server is listening on port 3001.`);
});
