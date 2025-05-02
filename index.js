const express = require("express");
const app = express();
const port = 3000;

const db = require("./config/db");
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json());
app.use(express.static(__dirname+"/public"))

const cors=require("cors")
app.use(cors())   
const seeder = require("./config/seeder");
seeder.admin();

const adminroutes = require("./route/apiRoutes");
app.use("/api", adminroutes);

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(port, (error) => {
  if (error) {
    console.log("server error", error);
  } else {
    console.log("server is running" + port);
  }
});
