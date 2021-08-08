import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'
// import Router from 'koa-router'
import cors from 'koa2-cors'
import views from 'koa-views'
import http from 'http'
import SocketIo from 'socket.io'

import errorMiddleware from './middlewares/errror.middle'
import successMiddle from './middlewares/success.middle'

import userRouter from './routes/user.route'
import socketRouter from './routes/socket.route'

const app = new Koa()
// TIP: 服务websocket
export const server = http.createServer(app.callback())

// TIP: io 一定要放在server后 目前不能用单独文件引入
export const io = new SocketIo.Server(server)
require('./socket')

console.log('koa app test ci/cd')
app.use(views(__dirname + '/public', { extension: 'html' }))
app.use(cors())
app.use(bodyParser())
app.use(logger())
app.use(errorMiddleware)

app.use(userRouter.routes()).use(userRouter.allowedMethods())
app.use(socketRouter.routes())

app.use(successMiddle)

server.listen(3000, () => {
  console.log('http://localhost:3000')
})
