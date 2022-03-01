let downloadQueueItemId = 1

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

export const showAllDownloads = (state, v) => {
  state.showAllDownloads = v
}

export const appendToDownloadQueue = (state, v) => {
  state.downloadQueue.push(Object.assign({ id: downloadQueueItemId }, v))
  downloadQueueItemId = downloadQueueItemId + 1
}

export const noSleep = (state, v) => {
  state.noSleep = v
}

export const updateHeadOfDownloadQueue = (state, v) => {
  if (state.downloadQueue.length > 0) {
    state.downloadQueue.splice(
      0,
      1,
      Object.assign({}, state.downloadQueue[0], v)
    )
  }
}

export const popHeadOfDownloadQueue = (state) => {
  if (state.downloadQueue.length > 0) {
    state.downloadQueue.splice(0, 1)
  }
}

export const historyNav = (state, v) => {
  state.historyNav = v
}
