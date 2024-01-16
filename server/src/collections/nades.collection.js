const connect = require("../config/mongoose.config");
const Nade = require("../models/nade.model");

const dbGetNades = async query => {
    await connect();
    console.log("getting nades fitting query", query);
    return await Nade.find(query)
    .limit(50);
}

const dbAddNade = async body => {
    await connect();
    console.log("adding nade with fields", body);
    const nade = Nade(body);
    await nade.save();
}

module.exports = {
    dbGetNades,
    dbAddNade
}