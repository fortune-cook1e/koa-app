import resolve from 'resolve-from'
import path from 'path'

export const resolveModule = (id: string, cwd: string) => {
  let modulePath = ''

  modulePath = resolve(id, `${id}/package.json`)

  const pkg = require(modulePath)

  // const moduleDirname = path.dirname(pkg)
  // modulePath = path.join(moduleDirname)

  console.log({ pkg, modulePath })
}
