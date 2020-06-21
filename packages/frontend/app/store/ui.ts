type State = {
  dark: boolean,
  menuOpen: boolean | null,
  menuSmall: boolean,
}

export const state = (): State => ({
  dark: false,
  menuOpen: null,
  menuSmall: true,
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
}
