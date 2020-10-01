const express = require("express")
const app = express()

const musicas = require("./routes/musicasRoutes")

app.use("/", musicas)

module.exports = app