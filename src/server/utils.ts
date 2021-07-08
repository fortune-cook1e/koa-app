export function rewriteContent(content) {
  return content.replace(/from ['"]([^'"]+)['"]/g, function (s0, s1) {
    // import a from './c.js'不需要改写
    // 只改写需要去node_module找的
    if (s1[0] !== '.' && s1[0] !== '/') {
      return `from '/@modules/${s1}'`
    }
    return s0
  })
}
