const PROVIDERS = {
  TWITCH: 'twitch',
} as const

export type ProviderName = (typeof PROVIDERS)[keyof typeof PROVIDERS]

export interface TwitchToken {
  expiresAt: Date
  expiresIn: number
  refreshToken: string
  scope: string[]
  token: string
  type: 'bearer'
}

export interface TwitchUser {
  token: TwitchToken
  id: any
  nickName: any
  name: any
  email: any
  emailVerificationState: 'unsupported'
  avatarUrl: any
  original: any
}

export type SocialUser = TwitchUser

export interface User {
  id: number
}
