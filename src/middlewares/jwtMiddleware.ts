import { JwtPayload } from './../types/user'
import { Next } from 'koa'
import { DeepPartial } from 'typeorm'
import { UsersEntity } from '../entities'
import { Middleware, KoaMiddlewareInterface } from 'routing-controllers'
import { Service } from 'typedi'
import { verify, decode, sign } from 'jsonwebtoken'
import { CodeMap, IContext } from '../types'

export const getJWTFromHttp = (ctx: IContext): string => {
  const { key, type } = ctx.config.jwt
  if (type === 'cookie') {
    return ctx.cookies.get(key) || ''
  } else if (ctx.headers['authorization']) {
    const [, token] = ctx.headers['authorization'].split(' ') || []
    return token
  } else return ''
}

export const decodeJWT = (token: string): DeepPartial<UsersEntity> =>
  decode(token) as DeepPartial<UsersEntity>

// 注入JWT
// 1. cookie 情况下则注入到cookie
// 2. header 情况下注入到header中
export const injectToken = (ctx: IContext, token: string): string | void => {
  const { expiresIn, type, key } = ctx.config.jwt
  if (type === 'cookie') {
    ctx.cookies.set(key, token, {
      httpOnly: true,
      maxAge: +expiresIn
    })
  } else {
    ctx.set(key, token)
  }
}

// 校验jwt
export const verifyToken = (ctx: IContext, token: string) => {
  const { secret } = ctx.config.jwt
  return verify(token, secret)
}

// 生成token
export const generateToken = (ctx: IContext, payload: JwtPayload) => {
  const { secret } = ctx.config.jwt
  return sign(payload, secret, {
    expiresIn: ctx.config.jwt.expiresIn
  })
}

@Middleware({ type: 'before' })
@Service()
export class JWTMiddleware implements KoaMiddlewareInterface {
  async use(ctx: IContext, next: Next) {
    const {
      config: {
        jwt: { unless }
      }
    } = ctx
    if (unless.includes(ctx.request.url)) {
      await next()
    } else {
      const accessToken = getJWTFromHttp(ctx)
      if (!accessToken) {
        ctx.body = {
          code: CodeMap.NoLogin,
          msg: 'token is not provided'
        }
        return false
      }
      try {
        // TODO: 这里拿到token并jwt解码后 应该根据用户信息再查一次数据库才是最好的
        const decoded = verifyToken(ctx, accessToken)
        ctx.state.user = decoded
        await next()
      } catch (e) {
        console.log('JWT error:', e)
        ctx.body = {
          code: CodeMap.NoLogin,
          msg: e.message || 'token is invalid'
        }
      }
    }
  }
}
