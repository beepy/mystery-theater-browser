export const state = () => ({
  searchTerms: '',
  searchedTerms: '',
  navFrom: { tag: '', depth: 1, index: 1 },
  navTo: { tag: '', depth: 1, index: 1 },
  downloadQueue: [],
  showAllDownloads: false,
  noSleep: false,
  historyNav: false,
  tags: {
    crime: {
      title: 'Crime',
      color: 'text-blue-700',
    },
    drama: {
      title: 'Drama',
      color: 'text-yellow-600',
    },
    murder: {
      title: 'Murder',
      color: 'text-red-700',
    },
    mystery: {
      title: 'Mystery',
      color: 'text-indigo-700',
    },
    paranormal: {
      title: 'Paranormal',
      color: 'text-pink-700',
    },
    psychological: {
      title: 'Psychological',
      color: 'text-purple-700',
    },
    supernatural: {
      title: 'Supernatural',
      color: 'text-pink-700',
    },
    whodunnit: {
      title: 'Whodunnit',
      color: 'text-indigo-700',
    },
  },
})
