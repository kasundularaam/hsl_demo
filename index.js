const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./db/connect");
require("dotenv").config();

const port = 8000;

app.use(cors({ origin: ["http://localhost:3000"] }));

app.use(express.json());

const users = require("./routes/users");
const notFound = require("./middleware/not-found");

app.use("/api/v1/users", users);

app.use(notFound);

app.get("/", (req, res) => {
  res.send("HSL DEMO API");
});

console.log(process.env.CONNECTION_STRING);

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
