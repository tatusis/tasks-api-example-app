import { DeleteResult } from 'typeorm'

import { Task } from '../entities/task'
import { TasksDao } from '../dao/tasks_dao'

class TasksController {
    private tasksDao: TasksDao

    public constructor () {
        this.tasksDao = new TasksDao()
    }

    public findAllTasks (): Promise<Task[]> {
        return this.tasksDao.findAllTasks()
    }

    public createTask (task: any): Promise<Task[]> {
        return this.tasksDao.createTask(task)
    }

    public findTaskById (id: number): Promise<Task> {
        return this.tasksDao.findTaskById(id)
    }

    public updateTask (id: number, partialTask: any): Promise<Task> {
        return this.tasksDao.updateTask(id, partialTask)
    }

    public removeTask (id: number): Promise<DeleteResult> {
        return this.tasksDao.removeTask(id)
    }
}

export { TasksController }
