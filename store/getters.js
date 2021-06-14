export const searchTerms = (state) => state.searchTerms
export const searchedTerms = (state) => state.searchedTerms
export const navFrom = (state) => state.navFrom
export const navTo = (state) => state.navTo
export const headOfDownloadQueue = (state) =>
  state.downloadQueue.length > 0 ? state.downloadQueue[0] : {}
