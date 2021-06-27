import { Context, Next } from 'koa'

export default async function successMiddle(ctx: Context, next: Next) {
  ctx.body = {
    code: 0,
    data: ctx.body
  }

  console.log(ctx.body)
  await next()
}
