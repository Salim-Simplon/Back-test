const express = require("express");
const mongoose = require("mongoose");
const app = express();
const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser");
var cors = require("cors");
app.use(cors());
//middlewares
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });
app.use([express.urlencoded({ extended: true }), express.json()]);

app.use("/public_img", express.static("public_img"));

//mongo atlas connection
mongoose
  .connect(
    "mongodb+srv://FirstClusterUser:1234567887654321@firstcluster.s6ozl.mongodb.net/lital?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("connected to mongo atlas db ..."))
  .catch((err) => console.error("unable to connect to mongo db ", err));

//routes and their middlewares
const users_route = require("./route/users_route");
app.use("/users", users_route);

const products_route = require("./route/products_route");
//app.use("/products", products_route);

const history_route = require("./route/history_route");
app.use("/history", history_route);

// upload feature
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public_img");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
function fileFilter(req, file, cb) {
  var filetypes = /jpeg|jpg|png/;
  var mimetype = filetypes.test(file.mimetype);
  var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  }
  cb("Error: File upload only supports the following filetypes - " + filetypes);
}

let upload = multer({ storage: storage, fileFilter: fileFilter });
app.post("/*", upload.single("photo"));
app.use("/products", products_route);

// end upload feature

app.listen(3001);
// module.exports = app;
