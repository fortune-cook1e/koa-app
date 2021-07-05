import Koa, { Context, Next } from 'koa'
import http from 'http'
import path from 'path'
import fs from 'fs-extra'

interface ServerConfig {
  port: number
  cwd: string
}

export const createServer = async ({ cwd, port }: ServerConfig) => {
  const app = new Koa()
  const htmlCode = fs.readFileSync(cwd + '/index.html', 'utf-8')

  app.use(async (ctx: Context, next: Next) => {
    const url = ctx.url

    console.log({ url })

    // 读取当前请求地址，如果是 / 则将用户下的index.html返回去
    if (url === '/') {
      ctx.type = 'html'
      ctx.body = htmlCode
    } else if (url.endsWith('.js')) {
      // 如果是js结尾 那么改为从终端所在地方读文件
      // TIP: 如果不用文件返回的形式 那么前端会报文件不存在
      const jsFilePath = path.resolve(cwd, url.slice(1))
      const jsContent = fs.readFileSync(jsFilePath, 'utf-8')
      ctx.type = 'application/javascript'
      ctx.body = jsContent
    }
    await next()
  })

  app.listen(port, () => {
    console.log(`http://localhost:${port}`)
  })
}
