require("dotenv").config({ path: "./config.env" })
const port = process.env.PORT || 4000

const express = require('express')
const app = express()
app.use(express.json());

const cors = require("cors")
app.use(cors());

app.use('/', require("./routes/router"));

app.listen(port, () => {
  console.log(`Server listening on ${port}`)
})