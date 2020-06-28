import colors from 'vuetify/es5/util/colors'
import { VuetifyThemeVariant } from 'vuetify/types/services/theme'

const themes = new Map<string, VuetifyThemeVariant>()

themes.set('pineapple', {
  primary: '#F29F05',
  secondary: '#590202',
  accent: '#3E8C49',

  success: colors.green.base,
  info: colors.blue.accent1,
  error: colors.red.darken4,
  warning: colors.orange.accent1,
})

themes.set('greyscale', {
  primary: colors.grey.darken1,
  secondary: colors.grey.lighten1,
  accent: colors.grey.lighten5,

  success: colors.green.base,
  info: colors.blue.accent1,
  error: colors.red.darken4,
  warning: colors.orange.accent1,
})

themes.set('pan-flag', {
  primary: '#FF218C',
  secondary: '#FED800',
  accent: '#21B1FF',
  info: '#21B1FF',

  success: colors.green.accent1,
  error: colors.red.darken4,
  warning: colors.orange.darken1,
})

themes.set('trans-flag', {
  primary: '#59C8F3',
  secondary: '#FFFFFF',
  accent: '#EDA5B3',

  success: colors.green.base,
  info: colors.blue.accent1,
  error: colors.red.darken4,
  warning: colors.orange.accent1,
})

themes.set('lemon', {
  primary: '#618C03',
  secondary: '#F2CB05',
  accent: '#F2E085',

  success: colors.green.base,
  info: colors.blue.accent1,
  error: colors.red.darken4,
  warning: colors.orange.accent1,
})

themes.set('melon', {
  primary: '#013A27',
  secondary: '#216E36',
  accent: '#C30604',

  success: colors.green.base,
  info: colors.blue.accent1,
  error: colors.red.darken4,
  warning: colors.orange.accent1,
})

export const getTheme = (key: string): VuetifyThemeVariant => {
  return themes.get(key) || themes.get('pineapple')
}

export {
  themes,
}
