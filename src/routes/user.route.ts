import Router from 'koa-router'
// import pool from '../mysql'

const router = new Router({ prefix: '/user' })

router.get('/', async (ctx, next) => {
  ctx.body = {
    name: 'glglglgl',
    age: 20
  }

  // pool.query('SELECT * from user', (err, results) => {
  //   if (err) {
  //     console.log(err)
  //   }
  //   console.log({ results })
  // })

  await next()
})

export default router
