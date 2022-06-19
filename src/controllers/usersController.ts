import { IContext } from './../types/common'
import { generateToken, injectToken } from './../middlewares/jwtMiddleware'
import { DeepPartial } from 'typeorm'
import {
  JsonController,
  Get,
  Post,
  Body,
  UnauthorizedError,
  Ctx
} from 'routing-controllers'
import { Inject, Service } from 'typedi'
import { genSalt, hash } from 'bcrypt'
import { UsersService } from '../services'
import { UsersEntity } from '../entities'
import { LoginRequest } from '../types'

@JsonController('/users')
@Service()
export default class UserController {
  @Inject() private readonly usersService: UsersService

  // 获取所有用户
  @Get()
  async getAll(@Ctx() ctx) {
    return ctx.success(await this.usersService.getData())
  }

  // 登录
  @Post('/login')
  async login(
    @Ctx() ctx: IContext,
    @Body() user: LoginRequest
  ): Promise<DeepPartial<UsersEntity>> {
    const { username, password } = user
    try {
      const databaseUser = await this.usersService.getByWhere({
        username
      })
      if (!databaseUser) throw new UnauthorizedError('User not found')
      const hashedPass = await hash(password, databaseUser.salt)
      // TIP: 用salt加密后再比较
      if (hashedPass === databaseUser.password) {
        const { password, salt, ...otherInfo } = databaseUser
        const accessToken = generateToken(ctx, otherInfo)
        injectToken(ctx, accessToken)
        return {
          ...otherInfo,
          accessToken
        }
      } else throw Error('password is not correct!')
    } catch (e) {
      console.log(e)
      throw new UnauthorizedError(e.message || 'user not found')
    }
  }

  // 新增用户
  @Post('/register')
  async addUser(@Ctx() ctx: IContext, @Body() user: DeepPartial<UsersEntity>) {
    const { username, password } = user
    if (!username || !password) throw new Error('username or password is empty')
    const databaseUser = await this.usersService.getByWhere({
      username
    })
    if (databaseUser) throw new Error('用户已存在')

    const salt = await genSalt()
    const hashedPass = await hash(password, salt)
    const newUser = {
      ...user,
      salt,
      password: hashedPass
    }

    const newUserInfo = await this.usersService.create(newUser)
    const { password: userPasswor, salt: userSalt, ...otherInfo } = newUserInfo
    const accessToken = generateToken(ctx, otherInfo)
    injectToken(ctx, accessToken)

    return {
      access_token: accessToken,
      ...otherInfo
    }
  }

  // 注销
  @Post('/logout')
  logout(@Ctx() ctx: IContext) {
    const { key } = ctx.config.jwt
    ctx.cookies.set(key, '')
    return null
  }
}
