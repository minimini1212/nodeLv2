require('dotenv').config();
const express = require("express");
const app = express();
const user = require("./routes/user.router.js");
const products = require("./routes/product.router.js");
const auths = require("./routes/auth.router.js");



app.use(express.json());


app.use("/api", express.urlencoded({ extended: false }), user);
app.use("/api", auths);
app.use("/api", products);

app.use(express.static("assets"));



app.listen(8080, () => {
  console.log("서버가 요청을 받을 준비가 됐어요");
});



