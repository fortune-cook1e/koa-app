import { Context } from 'koa'
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
import { sign } from 'jsonwebtoken'
import { UsersService } from '../services'
import { UsersEntity } from '../entities'
import { LoginRequest } from '../types'
import { getEnvConstants } from './../utils/index'
import { GLOBAL_CONFIG } from '../config'

const { JWT_SECRET } = getEnvConstants()

@JsonController('/users')
@Service()
export default class UserController {
  @Inject() private readonly usersService: UsersService

  @Get()
  async getAll(@Ctx() ctx) {
    return ctx.success(await this.usersService.getData())
  }

  @Post('/login')
  async login(@Body() user: LoginRequest): Promise<DeepPartial<UsersEntity>> {
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
        const jwt = sign(JSON.parse(JSON.stringify(otherInfo)), JWT_SECRET, {
          expiresIn: GLOBAL_CONFIG.JWT_EXPIRES_IN
        })
        return {
          ...otherInfo,
          accessToken: jwt
        }
      } else throw Error('password is not correct!')
    } catch (e) {
      console.log(e)
      throw new UnauthorizedError('user not found')
    }
  }

  // 新增用户
  @Post('/add')
  async addUser(@Body() user: DeepPartial<UsersEntity>) {
    const { username, password } = user
    if (!username || !password) throw new Error('username or password is empty')
    const salt = await genSalt()
    const hashedPass = await hash(password, salt)
    const newUser = {
      ...user,
      salt,
      password: hashedPass
    }
    return await this.usersService.create(newUser)
  }
}
