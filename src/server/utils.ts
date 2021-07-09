import { Context } from 'koa'
import fs from 'fs'

export function sendJSStream(ctx: Context, filename: string) {
  ctx.type = 'application/javascript'
  const stream = fs.createReadStream(filename)
  ctx.body = stream
}
