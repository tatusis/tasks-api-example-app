import { getRepository, Repository, DeleteResult } from 'typeorm'

import { Task } from '../entities/task'

class TasksDao {
    private repository: Repository<Task>

    public constructor () {
        this.repository = getRepository(Task)
    }

    public findAllTasks (): Promise<Task[]> {
        return this.repository.find()
    }

    public createTask (task: any): Promise<Task[]> {
        return this.repository.save(this.repository.create(task))
    }

    public findTaskById (id: number): Promise<Task> {
        return this.repository.findOneOrFail(id)
    }

    public async updateTask (id: number, partialTask: any): Promise<Task> {
        const task = await this.repository.findOneOrFail(id)
        return this.repository.save(this.repository.merge(task, partialTask))
    }

    public removeTask (id: number): Promise<DeleteResult> {
        return this.repository.delete(id)
    }
}

export { TasksDao }
