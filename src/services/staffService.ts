import { Service } from 'typedi'
import { DataSource } from 'typeorm'
import { StaffEntity } from '../entities/staffEntity'
import { BaseService } from './baseService'

@Service()
export class StaffService extends BaseService<StaffEntity> {
  constructor(db: DataSource) {
    super(db.getRepository(StaffEntity))
  }
}
