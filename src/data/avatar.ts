export type AvatarTheme = 'light' | 'dark'
export type InterestId =
  | 'reading'
  | 'drums'
  | 'computer'
  | 'gym'
  | 'photography'
  | 'rabbits'

export type AvatarAssetData = {
  default: string
  expressions: string[]
  poses: Partial<Record<InterestId, string>>
  altByLanguage: Record<'en' | 'zh-Hans' | 'de', string>
  frameEnabled: boolean
}

export const avatarAssets: Record<AvatarTheme, AvatarAssetData> = {
  light: {
    default: '/avatar/big/avatar-1-big.png',
    expressions: [
      '/avatar/expressions/avatar-1-smile.png',
      '/avatar/expressions/avatar-1-laugh.png',
      '/avatar/expressions/avatar-1-peace.png',
      '/avatar/expressions/avatar-1-surprised.png',
    ],
    poses: {
      reading: '/avatar/poses/avatar-1-reading.png',
      drums: '/avatar/poses/avatar-1-drums.png',
      computer: '/avatar/poses/avatar-1-computer.png',
      gym: '/avatar/poses/avatar-1-gym.png',
      photography: '/avatar/poses/avatar-1-photography.png',
    },
    altByLanguage: {
      en: 'Avatar 1 portrait illustration',
      'zh-Hans': '头像一人物插画',
      de: 'Porträtillustration von Avatar 1',
    },
    frameEnabled: true,
  },
  dark: {
    default: '/avatar/big/avatar-2-big.png',
    expressions: [
      '/avatar/expressions/avatar-2-smile.png',
      '/avatar/expressions/avatar-2-wink.png',
      '/avatar/expressions/avatar-2-wink-heart.png',
      '/avatar/expressions/avatar-2-surprised.png',
    ],
    poses: {
      reading: '/avatar/poses/avatar-2-reading.png',
      drums: '/avatar/poses/avatar-2-drums.png',
      computer: '/avatar/poses/avatar-2-computer.png',
      gym: '/avatar/poses/avatar-2-gym.png',
      photography: '/avatar/poses/avatar-2-photography.png',
    },
    altByLanguage: {
      en: 'Avatar 2 portrait illustration',
      'zh-Hans': '头像二人物插画',
      de: 'Porträtillustration von Avatar 2',
    },
    frameEnabled: true,
  },
}

export const interestIds: InterestId[] = [
  'reading',
  'drums',
  'computer',
  'gym',
  'photography',
  'rabbits',
]
