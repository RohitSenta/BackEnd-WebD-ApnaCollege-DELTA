const mongoose = require("mongoose");
const InitData = require("./data.js");
const Listing = require("../models/listing.js");
const { init } = require("../models/listing");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
      console.log("connected to DB");
  })
  .catch((err) => {
      console.log(err);
  });

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(InitData.data);
    console.log("data was initialized");
}

initDB();