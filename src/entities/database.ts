import { DataSource } from 'typeorm'
import { UsersEntity } from './usersEntity'
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
  entities: [UsersEntity],
  logging: false,
  subscribers: [],
  migrations: []
})

export const connectWithDB = async (): Promise<DataSource> => {
  const dataSource = await AppDataSource.initialize()
  return dataSource
}
