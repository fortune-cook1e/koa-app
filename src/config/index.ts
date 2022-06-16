// 全局配置
export const GLOBAL_CONFIG = {
  JWT_EXPIRES_IN: '1000', // jwt过期时间:1s
  JWT_UNLESS: ['/users/login', '/users/register'] // jwt 排除路径
}
