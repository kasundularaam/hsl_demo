const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer();
const connectDB = require("./db/connect");
require("dotenv").config();

const users = require("./routes/users");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());

app.use("/api/v1/users", users);

app.get("/", (req, res) => {
  res.send("HSL DEMO API");
});

app.use(errorHandlerMiddleware);

app.use(notFound);

const port = 8000;

const startRest = async () => {
  try {
    await connectDB(process.env.CONNECTION_STRING);
    app.listen(
      port,
      console.log(`server is listening on http://localhost:${port}`)
    );
  } catch (error) {
    console.log(error);
  }
};

startRest();
