import { Router, Request, Response, NextFunction } from 'express'

import { TasksController } from '../controllers/tasks_controller'

const tasksRouter = Router()

class TasksRouter {
    public router: Router;
    private tasksController: TasksController

    constructor () {
        this.router = Router()
        this.tasksController = new TasksController()

        this.router.get('/', (req: Request, res: Response, next: NextFunction) => {
            this.tasksController.findAllTasks()
                .then(result => {
                    res.json(result)
                })
                .catch(next)
        })

        this.router.post('/', (req: Request, res: Response, next: NextFunction) => {
            this.tasksController.createTask(req.body)
                .then(result => {
                    res.send(result)
                })
                .catch(next)
        })

        this.router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
            this.tasksController.findTaskById(parseInt(req.params.id))
                .then(result => {
                    res.send(result)
                })
                .catch(next)
        })

        this.router.put('/:id', (req: Request, res: Response, next: NextFunction) => {
            this.tasksController.updateTask(parseInt(req.params.id), req.body)
                .then(result => {
                    res.send(result)
                })
                .catch(next)
        })

        this.router.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
            this.tasksController.removeTask(parseInt(req.params.id))
                .then(result => {
                    res.send(result)
                })
                .catch(next)
        })

        this.router.use((err: any, req: Request, res: Response, next: NextFunction) => {
            res.status(500).send(err)
        })
    }
}

export { TasksRouter }
