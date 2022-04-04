import 'reflect-metadata'
import { createKoaServer } from 'routing-controllers'
import { UserController } from './controllers/UserController'
import { LoggerMiddleware } from './middlewares/logger'
import { SuccessMiddleware } from './middlewares/success'
import { ErrorMiddleware } from './middlewares/error'

const PORT = 3000
const app = createKoaServer({
  // cors:{

  // },
  // routePrefix: '/api', // 全局APi前缀
  middlewares: [LoggerMiddleware, SuccessMiddleware, ErrorMiddleware],
  controllers: [__dirname + '/controllers/*.ts'],
  defaultErrorHandler: false // 设置为false 可以走自己的错误中间件
})

app.listen(PORT)
