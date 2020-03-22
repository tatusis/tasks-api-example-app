import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import fs from 'fs'
import logger from 'morgan'
import path from 'path'
import { createConnection } from 'typeorm'

import { tasksRouter } from './routers/tasks_router'

function getLogStream (): fs.WriteStream {
    const filePath = path.join(path.resolve('./dist'), 'log')
    fs.mkdirSync(filePath, { recursive: true })
    return fs.createWriteStream(path.join(filePath, 'app.log'), { flags: 'a' })
}

const app = express()
const port = 3000

app.use(logger('tiny', { stream: getLogStream() }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors())
app.use('/tasks', tasksRouter)

app.listen(port, () => {
    console.log(`Tasks API listening on port ${port}!`)
    createConnection()
})
