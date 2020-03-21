import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

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

export { Task }
