import { Service } from 'typedi'
import { DataSource } from 'typeorm'
import { UserEntity } from '../entities'
import { BaseService } from './baseService'

@Service()
export class UserService extends BaseService<UserEntity> {
  constructor(db: DataSource) {
    super(db.getRepository(UserEntity))
  }
}
