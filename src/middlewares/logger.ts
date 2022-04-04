import { Middleware, KoaMiddlewareInterface } from 'routing-controllers'
const logger = require('koa-logger')

@Middleware({ type: 'after' })
export class LoggerMiddleware implements KoaMiddlewareInterface {
  // 接口声明可选
  async use(context: any, next: (err?: any) => Promise<any>): Promise<any> {
    await next()
  }
}
