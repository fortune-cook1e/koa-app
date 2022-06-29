import { DataSource } from 'typeorm'
import { UserEntity, StaffEntity } from './'
import { getEnvConstants } from '../utils'

const { HOST, PORT, USERNAME, PASSWORD } = getEnvConstants()

const AppDataSource = new DataSource({
  type: 'mysql',
  host: HOST,
  port: Number(PORT),
  username: USERNAME,
  password: PASSWORD,
  database: 'koa-app',
  synchronize: true,
  entities: [UserEntity, StaffEntity],
  logging: false,
  subscribers: [],
  migrations: []
})

export const connectWithDB = async (): Promise<DataSource> => {
  const dataSource = await AppDataSource.initialize()
  return dataSource
}
