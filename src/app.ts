import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import fs from 'fs'
import logger from 'morgan'
import path from 'path'
import { createConnection } from 'typeorm'

import { TasksRouter } from './routers/tasks_router'

class App {
    public app: express.Application
    public port: number

    constructor () {
        this.app = express()
        this.app.use(logger('tiny', { stream: this.getStream() }))
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: false }))
        this.app.use(cookieParser())
        this.app.use(cors())
        this.port = 3000
    }

    private getStream (): fs.WriteStream {
        const filePath = path.join(path.resolve('./dist'), 'log')
        fs.mkdirSync(filePath, { recursive: true })
        return fs.createWriteStream(path.join(filePath, 'this.app.log'), { flags: 'a' })
    }

    private start (): void {
        createConnection().then(() => {
            const tasksRouter = new TasksRouter()
            this.app.use('/tasks', tasksRouter.router)
            this.app.listen(this.port, () => {
                console.log(`Tasks API listening on port ${this.port}!`)
            })
        })
    }

    public main (): void {
        this.start()
    }
}

(new App()).main()
