import { Context, Next } from 'koa'

export default async function loggerMiddleware(ctx: Context, next: Next) {
  console.log(ctx.url, ctx.method)
}
