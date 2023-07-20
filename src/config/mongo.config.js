import mongoose from 'mongoose'

const MESSAGES = {
  ERROR: '+++ Mongo DB (Error)',
  CONNECTION: '+++ Mongo DB (Connection) : Successfully connected',
  INITIALIZATION: '+++ Mongo DB (Instance) : Successfully initialized',
  ALREADY_INITIALIZED: '+++ Mongo DB (Instance) : Instance already initialized'
}

const MONGODB_USER = process.env.MONGODB_USER
const MONGODB_PASS = process.env.MONGODB_PASS
const MONGODB_DBNAME = process.env.MONGODB_DBNAME
const MONGODB_CONNECTION_URI = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASS}@maincluster.oadtpio.mongodb.net/${MONGODB_DBNAME}?retryWrites=true&w=majority`

const handleError = (error) => {
  console.log(`${MESSAGES.ERROR}: ${error}`)
}
const handleSuccess = () => {
  console.log(`${MESSAGES.CONNECTION}`)
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
      console.log(MESSAGES.ALREADY_INITIALIZED)
      return this.#instance
    }
    this.#instance = new MongoConfig()
    console.log(MESSAGES.INITIALIZATION)
    return this.#instance
  }
}
