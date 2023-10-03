// LIBRARIES
import express from 'express'
import handlebars from 'express-handlebars'

import { __src } from '../utils/directories.utils.js'
import { STATUS_MESSAGES } from '../constants/constants.js'

// CONFIGURATION
const app = express()
const PORT = process.env.PORT || process.env.LOCAL_PORT
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(`${__src}/public/general`))
app.use(express.static(`${__src}/public/${process.env.NODE_ENV.toLowerCase() }`))



// HANDLEBARS

app.engine('handlebars', handlebars.engine())
app.set('views', `${__src}/api/views/`)
app.set('view engine', 'handlebars')

// LISTENER
const server = app.listen(PORT, () => console.log(STATUS_MESSAGES.EXPRESS.SERVER_CONNECTION(PORT)))

export { app, server }
