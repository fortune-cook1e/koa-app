import { Service } from 'typedi'
import { DataSource } from 'typeorm'
import { UsersEntity } from '../entities'
import { BaseService } from './baseService'

@Service()
export class UsersService extends BaseService<UsersEntity> {
  constructor(db: DataSource) {
    super(db.getRepository(UsersEntity))
  }
}
