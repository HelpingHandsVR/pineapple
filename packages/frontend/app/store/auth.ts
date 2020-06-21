type State = {
  loggedIn: boolean,
}

export const state = (): State => ({
  loggedIn: false,
})

export const mutations = {
  setLoggedIn (state: State, input: boolean): void {
    state.loggedIn = input
  },
}

export const getters = {
  loggedIn (state: State): boolean {
    return state.loggedIn
  },
}
