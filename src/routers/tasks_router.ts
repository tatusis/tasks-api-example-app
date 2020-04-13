import { Router, Request, Response, NextFunction } from 'express'
import { DeleteResult } from 'typeorm'

import { Task } from '../entities/task'
import { TasksController } from '../controllers/tasks_controller'

class TasksRouter {
    public router: Router
    private tasksController: TasksController

    public constructor() {
        this.router = Router()
        this.tasksController = new TasksController()

        this.router.get(
            '/',
            (req: Request, res: Response, next: NextFunction) => {
                this.tasksController
                    .findAllTasks()
                    .then((result: Task[]) => {
                        res.json(result)
                    })
                    .catch(next)
            }
        )

        this.router.get(
            '/:id',
            (req: Request, res: Response, next: NextFunction) => {
                this.tasksController
                    .findTaskById(parseInt(req.params.id))
                    .then((result: Task) => {
                        res.send(result)
                    })
                    .catch(next)
            }
        )

        this.router.post(
            '/',
            (req: Request, res: Response, next: NextFunction) => {
                this.tasksController
                    .insertTask(req.body)
                    .then((result: Task) => {
                        res.send(result)
                    })
                    .catch(next)
            }
        )

        this.router.put(
            '/:id',
            (req: Request, res: Response, next: NextFunction) => {
                this.tasksController
                    .updateTask(parseInt(req.params.id), req.body)
                    .then((result: Task) => {
                        res.send(result)
                    })
                    .catch(next)
            }
        )

        this.router.delete(
            '/:id',
            (req: Request, res: Response, next: NextFunction) => {
                this.tasksController
                    .deleteTask(parseInt(req.params.id))
                    .then((result: DeleteResult) => {
                        res.send(result)
                    })
                    .catch(next)
            }
        )

        this.router.use((req: Request, res: Response, next: NextFunction) => {
            res.status(404).send({
                name: 'ResourceNotFound',
                message: "Don't be mad, but that URL doesn't live here."
            })
        })

        this.router.use(
            (err: any, req: Request, res: Response, next: NextFunction) => {
                res.status(500).send(err)
            }
        )
    }
}

export { TasksRouter }
