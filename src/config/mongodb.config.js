import mongoose from "mongoose";

const MONGODB_USER = process.env.MONGODB_USER;
const MONGODB_PASS = process.env.MONGODB_PASS;
const MONGODB_DBNAME = process.env.MONGODB_DBNAME;

const MONGODB_CONNECTION_URI = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASS}@maincluster.oadtpio.mongodb.net/${MONGODB_DBNAME}?retryWrites=true&w=majority`;

const connection = mongoose.connect(MONGODB_CONNECTION_URI, {
  useNewUrlParser: true,
});
