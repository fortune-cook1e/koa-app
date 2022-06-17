import { GlobalConfig } from '../types'

// 全局配置
export const GLOBAL_CONFIG: GlobalConfig = {
  jwt: {
    expiresIn: '1000', // jwt过期时间:1s
    unless: ['/users/login', '/users/register'], // jwt 排除路径
    type: 'cookie',
    key: 'set-cookie'
  }
}
