const express = require("express");
const mongoose = require("mongoose");
const app = express();
const router = require("./router");
const cors = require("cors");
require('dotenv').config()

app.use(express.json());
app.use(cors());
app.use(router);

const port = 3002;
const url = "mongodb+srv://ivona_express:express@cluster0.l5s8v.mongodb.net/spotify?retryWrites=true&w=majority";

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });

app.listen(port, function () {
  console.log("listening on " + port);
});
