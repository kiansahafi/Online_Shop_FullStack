import express, { Express } from 'express'
import dotenv from "dotenv"

// Defining environment variables and connecting to db
dotenv.config()
require("./db")
import winston from 'winston'
import expressWinston from 'express-winston'
import cors from 'cors'

import mainRouter from './routes'
import config from "./utils/config"

const server: Express = express()

server.use(express.json({limit: '50mb'}))
server.use(express.urlencoded({ extended: true, limit: '10mb' }))
server.use('/images', express.static('static'))
server.use(cors())

// Logging requests
server.use(expressWinston.logger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json(),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  ),
  meta: true, 
  msg: "HTTP {{req.method}} {{res.statusCode}} {{req.url}}",
  expressFormat: false,
  colorize: true, 
}))

server.use('/', mainRouter)

// Logging errors
server.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  )
}))

const port: number = (config.port || 3000) as number

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})