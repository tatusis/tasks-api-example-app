import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import fs from 'fs'
import http from 'http'
import logger from 'morgan'
import passport from 'passport'
import path from 'path'
import 'reflect-metadata'
import { createConnection } from 'typeorm'

import { AuthRouter } from './routers/auth_router'
import { TasksRouter } from './routers/tasks_router'

class TasksApi {
    public app: express.Application
    public server: http.Server

    public constructor() {
        this.app = express()
        this.app.use(logger('tiny', { stream: this.getStream() }))
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: false }))
        this.app.use(cookieParser())
        this.app.use(cors())
        this.app.use(passport.initialize())
    }

    private getStream(): fs.WriteStream {
        const filePath = path.join(__dirname, 'log')
        fs.mkdirSync(filePath, { recursive: true })
        return fs.createWriteStream(path.join(filePath, 'tasks_api.log'), {
            flags: 'a'
        })
    }

    public async start(): Promise<void> {
        await createConnection()
        this.app.use(new AuthRouter().router)
        this.app.use('/tasks', new TasksRouter().router)
        this.server = http.createServer(this.app)
        this.server.listen('3000')
    }
}

export { TasksApi }
