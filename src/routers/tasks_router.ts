import express from 'express'

import { TasksController } from '../controllers/tasks_controller'

const tasksRouter = express.Router()

tasksRouter.get('/', (req: express.Request, res: express.Response) => {
    (new TasksController()).findAllTasks()
        .then(result => {
            res.json(result)
        })
})

tasksRouter.post('/', (req: express.Request, res: express.Response) => {
    (new TasksController()).createTask(req.body)
        .then(result => {
            res.status(200).send(result)
        })
})

tasksRouter.get('/:id', (req: express.Request, res: express.Response) => {
    (new TasksController()).findTaskById(parseInt(req.params.id))
        .then(result => {
            res.status(200).send(result)
        })
})

tasksRouter.put('/:id', (req: express.Request, res: express.Response) => {
    (new TasksController()).updateTask(parseInt(req.params.id), req.body)
        .then(result => {
            res.status(200).send(result)
        })
})

tasksRouter.delete('/:id', (req: express.Request, res: express.Response) => {
    (new TasksController()).removeTask(parseInt(req.params.id))
        .then(result => {
            res.status(200).send(result)
        })
})

export { tasksRouter }
