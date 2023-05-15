require("dotenv").config({ path: "./config.env" });
const express = require("express");
const mongoose = require("mongoose");

const path = require("path");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

const bodyParser = require("body-parser");
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

app.use("/Merchent", require("./Route/Controller/MerchentControlle"));
app.use(require("./Middelware/Error"));

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database is working "))
  .catch((err) => console.log("Error is " + err));
let port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("Server is work  on  port " + port);
});

app.listen(443, () => {
  console.log("Server is work  on  port  443");
});
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
} else
  app.get("/", (req, res) => {
    res.send("api is running");
  });
