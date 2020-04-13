import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

interface UserInterface {
    id?: number
    username?: string
    password?: string
}

@Entity()
class User {
    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    public username: string

    @Column()
    public password: string
}

export { UserInterface, User }
