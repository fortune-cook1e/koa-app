import { Env } from './../types/common'
import dotenv from 'dotenv'
interface IEnvConstants {
  HOST: string
  PORT: string
  USERNAME: string
  PASSWORD: string
}

const ENV_FILE_MAP: Record<Env, string> = {
  development: '.env.dev',
  production: '.env.prod'
}

export const getEnv = (): Env => {
  return process.env.NODE_ENV as Env
}

export const getEnvConstants = (): IEnvConstants => {
  const env = getEnv()
  const envConfig = dotenv.config({
    path: ENV_FILE_MAP[env as 'development' | 'production']
  })
  return envConfig.parsed as any
}
