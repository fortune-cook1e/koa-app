import { Context, Next } from 'koa'
import { Middleware, KoaMiddlewareInterface } from 'routing-controllers'
import { Service } from 'typedi'
import { CodeMap } from '../types'

@Middleware({ type: 'before' })
@Service()
export class ResponseMiddleware implements KoaMiddlewareInterface {
  async use(ctx: Context, next: Next): Promise<any> {
    ctx.success = (data: any, type) => {
      ctx.type = type || 'application/json'
      return (ctx.body = {
        code: CodeMap.SUCCESS,
        data,
        msg: 'success'
      })
    }

    ctx.fail = (msg: string, code?: CodeMap, type?: any) => {
      ctx.type = type || 'application/json'
      ctx.body = {
        code: code || CodeMap.Fail,
        msg: msg || '服务器异常'
      }
    }

    await next()
  }
}
