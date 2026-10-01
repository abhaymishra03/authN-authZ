const express = require("express");



const app = express();

app.use(express.json());

app.post("/api/test", (req, res) => {
  console.log("Method:", req.method);
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  res.status(200).json({ message: "Got it" });
});


module.exports=app;

