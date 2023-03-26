const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer();
const connectDB = require("./db/connect");
require("dotenv").config();
const cors = require("cors");
const jwt = require("jsonwebtoken");

const port = 8000;

app.use(cors({ origin: "http://localhost:3000" }));

const users = require("./routes/users");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());

app.use("/api/v1/users", users);

app.get("/", (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.status(200).json({ message: "NOtWELCOMe" });
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(200).json({ message: "Nice TRY bt NOtWELCOMe" });
    res.json({ message: "YOU ARE WELCOME" });
  });
});

app.use(errorHandlerMiddleware);

app.use(notFound);

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
