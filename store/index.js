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
    adaptation: {
      title: 'Adaptation',
      color: 'gray-700',
    },
    crime: {
      title: 'Crime',
      color: 'blue-700',
    },
    drama: {
      title: 'Drama',
      color: 'yellow-600',
    },
    'good-audio': {
      title: 'Good Audio',
      color: 'green-400',
    },
    murder: {
      title: 'Murder',
      color: 'red-700',
    },
    multipart: {
      title: 'Multipart',
      color: 'gray-700',
    },
    mystery: {
      title: 'Mystery',
      color: 'indigo-700',
    },
    paranormal: {
      title: 'Paranormal',
      color: 'pink-700',
    },
    'poor-audio': {
      title: 'Poor Audio',
      color: 'red-400',
    },
    psychological: {
      title: 'Psychological',
      color: 'purple-700',
    },
    'sci-fi': {
      title: 'Sci-fi',
      color: 'green-400',
    },
    supernatural: {
      title: 'Supernatural',
      color: 'pink-700',
    },
    thriller: {
      title: 'Thriller',
      color: 'red-400',
    },
    whodunnit: {
      title: 'Whodunnit',
      color: 'indigo-700',
    },
  },
})
