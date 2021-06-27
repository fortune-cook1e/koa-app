import { Context, Next } from 'koa'

export default async function errorMiddleware(ctx: Context, next: Next) {
  try {
    await next()
  } catch (e) {
    console.log(e.message)
    ctx.statusCode = 500
    ctx.body = {
      code: 2,
      msg: e.message
    }
  }
}
