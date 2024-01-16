const { Schema, model } = require("mongoose");

const nadeSchema = new Schema({
    map: String,
    location: String,
    destination: String,
    type: String,
    embed: String,
});

const Nade = model('Nade', nadeSchema, "nades");

module.exports = Nade;