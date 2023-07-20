// LIBRARIES
import express from 'express'
import handlebars from 'express-handlebars'
import { __src } from '../utils/directories.utils.js'

// CONFIGURATION
const app = express()
const PORT = process.env.PORT || process.env.LOCAL_PORT
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(`${__src}/public`))

// HANDLEBARS

app.engine('handlebars', handlebars.engine())
app.set('views', `${__src}/api/views/`)
app.set('view engine', 'handlebars')

// LISTENER
const MESSAGES = {
  SERVER_CONNECTION: (PORT) => `+++ Express (Connection): Server running on port ${PORT}`
}
const server = app.listen(PORT, () => console.log(MESSAGES.SERVER_CONNECTION(PORT)))

export { app, server }
