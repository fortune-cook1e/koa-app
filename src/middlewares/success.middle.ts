import { Context, Next } from 'koa'

export default async function successMiddle(ctx: Context, next: Next) {
  if (ctx.type === 'application/json') {
    ctx.body = {
      code: 0,
      data: ctx.body
    }
  }
  await next()
}
