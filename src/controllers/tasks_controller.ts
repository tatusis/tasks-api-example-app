import { DeleteResult } from "typeorm"

import { TaskInterface, Task } from "../entities/task"
import { TasksDao } from "../dao/tasks_dao"

class TasksController {
    private tasksDao: TasksDao

    public constructor() {
        this.tasksDao = new TasksDao()
    }

    public findAllTasks(): Promise<Task[]> {
        return this.tasksDao.findAllTasks()
    }

    public insertTask(task: TaskInterface): Promise<Task> {
        return this.tasksDao.insertTask(task)
    }

    public findTaskById(id: number): Promise<Task> {
        return this.tasksDao.findTaskById(id)
    }

    public updateTask(id: number, partialTask: TaskInterface): Promise<Task> {
        return this.tasksDao.updateTask(id, partialTask)
    }

    public deleteTask(id: number): Promise<DeleteResult> {
        return this.tasksDao.deleteTask(id)
    }
}

export { TasksController }
