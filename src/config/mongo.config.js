import mongoose from 'mongoose'
import {STATUS_MESSAGES} from '../constants/constants.js'

const MONGODB_USER = process.env.MONGODB_USER
const MONGODB_PASS = process.env.MONGODB_PASS
const MONGODB_DBNAME = process.env.MONGODB_DBNAME
const MONGODB_CONNECTION_URI = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASS}@maincluster.oadtpio.mongodb.net/${MONGODB_DBNAME}?retryWrites=true&w=majority`

const handleError = (error) => {
  console.log(`${STATUS_MESSAGES.MONGO.ERROR}: ${error}`)
}
const handleSuccess = () => {
  console.log(`${STATUS_MESSAGES.MONGO.CONNECTION}`)
}
mongoose.connection.on('error', (err) => {
  handleError(err)
})

export class MongoConfig {
  static #instance
  constructor() {
    mongoose
      .connect(MONGODB_CONNECTION_URI, { useNewUrlParser: true })
      .then(handleSuccess)
      .catch((error) => {
        handleError(error)
      })
  }

  static getInstance() {
    if (this.#instance) {
      console.log(STATUS_MESSAGES.MONGO.ALREADY_INITIALIZED)
      return this.#instance
    }
    this.#instance = new MongoConfig()
    console.log(STATUS_MESSAGES.MONGO.INITIALIZATION)
    return this.#instance
  }
}
