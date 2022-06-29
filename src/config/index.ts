import { GlobalConfig } from '../types'

// 全局配置
export const GLOBAL_CONFIG: GlobalConfig = {
  jwt: {
    secret: 'koa-app-study',
    expiresIn: '1h', // jwt过期时间:1s
    maxAge: 1000 * 60 * 60, // cookie过期时间:1h
    unless: ['/user/login', '/user/register'], // jwt 排除路径
    type: 'cookie',
    key: 'set-cookie'
  }
}
