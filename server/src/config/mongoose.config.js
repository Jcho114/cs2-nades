const mongoose = require("mongoose");
require("dotenv").config({ path: "config.env" });
const uri = process.env.ATLAS_URI;

async function connect() {
    await mongoose.connect(uri);
}

module.exports = connect;