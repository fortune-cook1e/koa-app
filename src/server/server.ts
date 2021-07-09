import Koa, { Context, Next } from 'koa'
import http from 'http'
import path from 'path'
import fs from 'fs-extra'
import resolve from 'resolve-from'

import { rewrite } from './rewriteContent'
import { resolveModule } from './resolveModule'

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

      const content = rewrite(jsContent)
      ctx.body = content
    } else if (url.startsWith('/__modules')) {
      resolveModule('vue', cwd, ctx)
      // const prefix = path.resolve(__dirname, '../../node_modules', url.replace('/@modules/', ''))
      // const module = require(prefix + '/package.json').module
      // const p = path.resolve(prefix, module)
      // console.log({ prefix, module, p })
      // const ret = fs.readFileSync(p, 'utf-8')
      // ctx.type = 'application/javascript'
      // ctx.body = rewriteContent(ret)
    }
    await next()
  })

  app.listen(port, () => {
    console.log(`http://localhost:${port}`)
  })
}
