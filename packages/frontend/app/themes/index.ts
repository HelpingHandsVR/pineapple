import colors from 'vuetify/es5/util/colors'
import { VuetifyThemeVariant } from 'vuetify/types/services/theme'

export enum PineappleTheme {
  PINEAPPLE,
  GREYSCALE,
  PAN_FLAG,
  TRANS_FLAG,
  LEMON,
  MELON,

  DEFAULT = PineappleTheme.PINEAPPLE,
}

const themes = new Map<PineappleTheme, VuetifyThemeVariant>()

const status = {
  success: colors.green.base,
  info: colors.blue.accent1,
  error: colors.red.darken4,
  warning: colors.orange.accent1,
}

themes.set(PineappleTheme.PINEAPPLE, {
  ...status,

  primary: '#F29F05',
  secondary: '#3E8C49',
  accent: '#590202',
})

themes.set(PineappleTheme.GREYSCALE, {
  ...status,

  primary: colors.grey.darken2,
  secondary: colors.grey.lighten1,
  accent: colors.grey.lighten5,

  success: colors.grey.base,
  info: colors.grey.lighten1,
  error: colors.grey.darken3,
  warning: colors.grey.darken1,
})

themes.set(PineappleTheme.PAN_FLAG, {
  ...status,

  primary: '#FF218C',
  secondary: '#21B1FF',
  accent: '#FED800',
  info: '#21B1FF',
})

themes.set(PineappleTheme.TRANS_FLAG, {
  ...status,

  primary: '#59C8F3',
  secondary: '#EDA5B3',
  accent: '#FFFFFF',
})

themes.set(PineappleTheme.LEMON, {
  ...status,

  primary: '#618C03',
  secondary: '#F2CB05',
  accent: '#F2E085',
})

themes.set(PineappleTheme.MELON, {
  ...status,

  primary: '#013A27',
  secondary: '#C30604',
  accent: '#216E36',
})

export const getTheme = (key: PineappleTheme): VuetifyThemeVariant => {
  return themes.get(key) || themes.get(PineappleTheme.DEFAULT)
}

export {
  themes,
}
