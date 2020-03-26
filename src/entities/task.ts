import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

interface TaskInterface {
    id?: number
    name?: string
    description?: string
    isDone?: boolean
}

@Entity()
class Task {
    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    public name: string

    @Column()
    public description: string

    @Column()
    public isDone: boolean
}

export { TaskInterface, Task }
