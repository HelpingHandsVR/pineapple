import { VuetifyThemeVariant } from 'vuetify/types/services/theme'

import { getTheme, PineappleTheme } from '~/themes'

export type Toast = {
  type: string,
  message: string,
  icon: string,
  title: string,
  occurrences?: number,
}

type State = {
  dark: boolean,
  menuOpen: boolean,
  menuSmall: boolean,
  toasts: Toast[]
  theme: PineappleTheme,
}

export const state = (): State => ({
  dark: false,
  menuOpen: false,
  menuSmall: true,
  toasts: [],
  theme: PineappleTheme.DEFAULT,
})

export const mutations = {
  setDark (state: State, value: boolean): void {
    state.dark = value
  },
  setMenuOpen (state: State, value: boolean): void {
    state.menuOpen = value
  },
  setMenuSmall (state: State, value: boolean): void {
    state.menuSmall = value
  },
  createToast (state: State, incoming: Toast): void {
    const duplicateIndex = state.toasts.findIndex((toast) => {
      return incoming.icon === toast.icon
        && incoming.message === toast.message
        && incoming.title === toast.title
        && incoming.type === toast.type
    })

    incoming.occurrences = 1

    if (duplicateIndex === -1) {
      state.toasts.push(incoming)
    } else {
      state.toasts[duplicateIndex].occurrences = state.toasts[duplicateIndex].occurrences + 1
    }
  },
  dismissToast (state: State): void {
    state.toasts.shift()
  },
  setTheme (state: State, theme: PineappleTheme): void {
    state.theme = theme
  },
}

export const getters = {
  isDark (state: State): boolean {
    return Boolean(state.dark)
  },
  menuOpen (state: State): boolean | null {
    return state.menuOpen
  },
  menuSmall (state: State): boolean {
    return state.menuSmall
  },
  firstToast (state: State): Toast | null {
    return state.toasts ? state.toasts[0] || null : null
  },
  allToasts (state: State): Toast[] {
    return state.toasts
  },
  showToast (state: State): boolean {
    return state.toasts ? Boolean(state.toasts[0]) : false
  },
  theme (state: State): VuetifyThemeVariant {
    return getTheme(state.theme)
  },
  themeName (state: State): PineappleTheme {
    return state.theme
  },
}
