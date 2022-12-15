const express = require('express')
const path = require('path')
const app = express()
const port = 3000

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index")
});

app.get("/browse", (req, res) => {
  res.render("browse")
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})