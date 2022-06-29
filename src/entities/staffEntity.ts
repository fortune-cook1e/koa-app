import { Gender } from './../types/user'
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'staff' })
export class StaffEntity {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  name: string

  @Column()
  occupation: string

  @Column({ nullable: true })
  gender: Gender

  @Column({ nullable: false })
  entryTime: string

  @Column({ nullable: false })
  resignationTime: string

  @Column({ nullable: false })
  department: string

  @Column({ nullable: false })
  company: string
}
