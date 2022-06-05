import { GLOBAL_CONFIG } from '../config/index'
import { getEnvConstants } from '../utils/index'
import { Context, Next } from 'koa'
import { DeepPartial } from 'typeorm'
import { UsersEntity } from '../entities'
import { Middleware, KoaMiddlewareInterface } from 'routing-controllers'
import { Service } from 'typedi'
import { verify, decode } from 'jsonwebtoken'
import { CodeMap } from '../types'

const { JWT_SECRET } = getEnvConstants()

export const getJWT = ({ authorization }: any): string => {
  if (!authorization) return ''
  const [, token]: string = authorization.split(' ')
  return token
}

export const decodeJWT = (token: string): DeepPartial<UsersEntity> =>
  decode(token) as DeepPartial<UsersEntity>

@Middleware({ type: 'before' })
@Service()
export class JWTMiddleware implements KoaMiddlewareInterface {
  async use(ctx: Context, next: Next) {
    if (GLOBAL_CONFIG.JWT_UNLESS.includes(ctx.request.url)) {
      await next()
    } else {
      const accessToken = getJWT(ctx.request.headers)
      if (!accessToken) {
        ctx.body = {
          code: CodeMap.Fail,
          msg: 'token is not provided'
        }
        return false
      }
      try {
        // TODO: 这里拿到token并jwt解码后 应该根据用户信息再查一次数据库才是最好的
        const decoded = verify(accessToken, JWT_SECRET)
        ctx.state.user = decoded
        await next()
      } catch (e) {
        console.log('JWT error:', e)
        ctx.body = {
          code: CodeMap.NoLogin,
          msg: 'token is not valid'
        }
      }
    }
  }
}
