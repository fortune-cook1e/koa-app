import { Context, DefaultState } from 'koa'
import Router from 'koa-router'

const router = new Router<DefaultState, Context>({ prefix: '/socket' })

router.get('/', async (ctx, next) => {
  ctx.type = 'html'
  await ctx.render('index.html')
  await next()
})

export default router
