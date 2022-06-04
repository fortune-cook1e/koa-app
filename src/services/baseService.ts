import { Repository, DeepPartial, FindOptionsWhere } from 'typeorm'

export class BaseService<T> {
  public readonly repo: Repository<T>

  constructor(repo: Repository<T>) {
    this.repo = repo
  }

  // 查询表所有数据
  async getData(): Promise<Array<T>> {
    return await this.repo.find()
  }

  // 根据条件查询数据
  async getByWhere(where?: FindOptionsWhere<T>): Promise<T | null> {
    return await this.repo.findOneBy({
      ...where
    })
  }

  // 创建
  async create(data: DeepPartial<T>): Promise<T> {
    return await this.repo.save(data)
  }

  // 更新
  async update(data: DeepPartial<T>): Promise<T> {
    return await this.repo.save(data)
  }

  // 删除
  async del(where?: FindOptionsWhere<T>) {
    const entity = await this.getByWhere(where)
    if (!entity) return null
    await this.repo.remove(entity)
    return entity
  }
}
