import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

interface TaskInterface {
    id?: number
    name?: string
    description?: string
    isDone?: boolean
}

@Entity()
class Task {
    @PrimaryGeneratedColumn()
    private id: number

    @Column()
    private name: string

    @Column()
    private description: string

    @Column()
    private isDone: boolean
}

export { TaskInterface, Task }
