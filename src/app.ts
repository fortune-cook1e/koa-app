import 'reflect-metadata'
import path from 'path'
import logger from 'koa-logger'
import { Container } from 'typedi'
import { DeepPartial } from 'typeorm'
import {
  Action,
  createKoaServer,
  UnauthorizedError,
  useContainer
} from 'routing-controllers'
import {
  JWTMiddleware,
  SuccessMiddleware,
  ErrorMiddleware,
  decodeJWT,
  getJWTFromHttp
} from './middlewares'
import { connectWithDB } from './entities/database'
import { services } from './services'
import { UsersEntity } from './entities'
import { GLOBAL_CONFIG } from './config'

const PORT = 3000

const start = async () => {
  try {
    // useContainer必须在 createKoaServer之前调用
    // 由于使用了 container，在所有的middlewares和controllers之前必须加@Service
    // FIXME: https://github.com/typestack/routing-controllers/issues/642
    const dataSource = await connectWithDB()
    services.forEach(Service => {
      Container.set(Service, new Service(dataSource))
    })
    useContainer(Container)

    const app = createKoaServer({
      // cors:{

      // },

      // routePrefix: '/api', // 全局APi前缀
      middlewares: [SuccessMiddleware, ErrorMiddleware, JWTMiddleware],
      controllers: [path.resolve(__dirname, './controllers/*.ts')],
      defaultErrorHandler: false, // 设置为false 可以走自己的错误中间件
      currentUserChecker(action: Action) {
        try {
          const token = getJWTFromHttp(action.request.headers)
          const decodedUser: DeepPartial<UsersEntity> = decodeJWT(token)
          return decodedUser
        } catch {
          throw new UnauthorizedError()
        }
      }
    })

    // 将全局配置注入到 context中
    app.context.config = GLOBAL_CONFIG
    app.use(logger())

    app.listen(PORT, () => {
      console.log(`app is running at http://localhost:${PORT}`)
    })
  } catch (e) {
    console.log('TypeORM connection error:', e.message)
  }
}

start()
