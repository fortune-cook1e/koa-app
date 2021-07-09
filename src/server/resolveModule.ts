import resolve from 'resolve-from'
import path from 'path'
import { sendJSStream } from './utils'
import { Context } from 'koa'

export const resolveModule = (id: string, cwd: string, ctx: Context) => {
  let modulePath = ''

  modulePath = resolve(id, `${id}/package.json`)

  if (id === 'vue') {
    modulePath = path.join(path.dirname(modulePath), 'dist/vue.runtime.esm-browser.js')
  } else {
    const pkg = require(modulePath)
    modulePath = path.join(path.dirname(modulePath), pkg.module || pkg.main)
  }

  sendJSStream(ctx, modulePath)
}
