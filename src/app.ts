import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import * as logger from 'koa-logger'
import * as Router from 'koa-router'
import * as cors from 'koa2-cors'
import * as koaStatic from 'koa-static'

import errorMiddleware from './middlewares/errror.middle'
import successMiddle from './middlewares/success.middle'

import userRouter from './routes/user.route'

const app = new Koa()

app.use(koaStatic(__dirname + '/public'))
app.use(cors())
app.use(bodyParser())
app.use(logger())
app.use(errorMiddleware)

app.use(userRouter.routes())

app.use(successMiddle)

app
  .listen(3000, () => {
    console.log('listening at port 3000')
  })
  .on('error', e => {
    console.log(e.message)
  })
