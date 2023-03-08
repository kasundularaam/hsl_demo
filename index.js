const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const port = 8000;

app.use(cors({ origin: ["http://localhost:3000"] }));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome");
});

const startRest = async () => {
  try {
    app.listen(
      port,
      console.log(`server is listening on http://localhost:${port}`)
    );
  } catch (error) {
    console.log(error);
  }
};

startRest();
