import { io } from '../app'
import { Socket } from 'socket.io'

io.on('connection', function (socket: Socket) {
  console.log('a user connected')

  const token = socket.handshake.auth.token

  if (token !== 'token') {
  }

  socket.on('recevie', () => {
    console.log('hello')
  })
})
