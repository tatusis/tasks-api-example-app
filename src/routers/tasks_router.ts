import express from 'express'

import { TasksController } from '../controllers/tasks_controller'

const tasksRouter = express.Router()

tasksRouter.get('/', (req, res) => {
    (new TasksController()).findAllTasks()
        .then(result => {
            res.json(result)
        })
})

tasksRouter.post('/', (req, res) => {
    (new TasksController()).createTask(req.body)
        .then(result => {
            res.status(200).send(result)
        })
})

tasksRouter.get('/:id', (req, res) => {
    (new TasksController()).findTaskById(parseInt(req.params.id))
        .then(result => {
            res.status(200).send(result)
        })
})

tasksRouter.put('/:id', (req, res) => {
    (new TasksController()).updateTask(parseInt(req.params.id), req.body)
        .then(result => {
            res.status(200).send(result)
        })
})

tasksRouter.delete('/:id', (req, res) => {
    (new TasksController()).removeTask(parseInt(req.params.id))
        .then(result => {
            res.status(200).send(result)
        })
})

export { tasksRouter }
