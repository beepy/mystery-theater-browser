export const searchTerms = (state, v) => {
  state.searchTerms = v
}

export const searchedTerms = (state, v) => {
  state.searchedTerms = v
}

export const navFrom = (state, v) => {
  state.navFrom = Object.assign({}, v)
}

export const navTo = (state, v) => {
  state.navFrom = Object.assign({}, state.navTo)
  state.navTo = Object.assign({}, v)
}
