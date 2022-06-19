export interface LoginRequest {
  username: string
  password: string
}

export enum Gender {
  Male = 1,
  Female = 0
}

export interface JwtPayload {
  id: string
  username: string
  gender: Gender
}
