import { Gender } from './../types/user'
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'users' })
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  username: string

  @Column({ nullable: true })
  age: number

  @Column({ nullable: true })
  gender: Gender

  @Column({ nullable: false })
  password: string

  @Column({ nullable: false })
  salt: string

  accessToken?: string
}
