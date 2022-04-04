import { Context, Next } from 'koa'
import { Middleware, KoaMiddlewareInterface } from 'routing-controllers'

@Middleware({ type: 'before' })
export class ErrorMiddleware implements KoaMiddlewareInterface {
  async use(ctx: Context, next: Next) {
    try {
      await next()
    } catch (e) {
      ctx.statusCode = 500
      ctx.body = {
        code: 2,
        msg: e.message || e.msg || '服务器异常'
      }
    }
  }
}
