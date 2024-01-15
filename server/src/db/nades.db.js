const { connect } = require("./conn");
const init = async connect => {
    const db = await connect();
    return db.collection("nades");
}

const dbGetNades = async query => {
    const nades = await init(connect);
    console.log("getting nades...")
    return await nades.find(query)
    .limit(50)
    .toArray();
}

const dbAddNade = async body => {
    const nades = await init(connect);
    console.log("adding nade...")
    await nades.insertOne(body);
}

module.exports = {
    dbGetNades,
    dbAddNade
}