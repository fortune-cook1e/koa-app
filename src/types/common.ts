import { Context } from 'koa'

export type Env = 'development' | 'production'

export interface GlobalConfig {
  jwt: {
    secret: string
    expiresIn: string
    maxAge: number | string
    unless: string[]
    type: 'cookie' | 'header'
    key: string
  }
}

export interface IContext extends Context {
  config: GlobalConfig
}
