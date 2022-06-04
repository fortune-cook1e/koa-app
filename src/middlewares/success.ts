import { Context, Next } from 'koa'
import { Middleware, KoaMiddlewareInterface } from 'routing-controllers'
import { Service } from 'typedi'

@Middleware({ type: 'after' })
@Service()
export class SuccessMiddleware implements KoaMiddlewareInterface {
  // 接口声明可选
  async use(ctx: Context, next: Next): Promise<any> {
    if (ctx.type === 'application/json') {
      ctx.body = {
        code: 0,
        data: ctx.body
      }
    }
    await next()
  }
}
