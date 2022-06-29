import { Gender } from '../types/user'
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    comment: '主键id'
  })
  id: string

  @Column({
    type: 'varchar',
    comment: '用户名'
  })
  username: string

  @Column({ type: 'int', nullable: true, comment: '年龄' })
  age: number

  @Column({ type: 'int', nullable: true, comment: '性别 1:Male 0:Female' })
  gender: Gender

  @Column({ type: 'varchar', nullable: false, comment: '密码' })
  password: string

  @Column({ type: 'varchar', nullable: false, comment: '盐' })
  salt: string

  accessToken?: string
}
