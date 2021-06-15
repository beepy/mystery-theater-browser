module.exports = {
  variants: {
    extend: {
      textDecoration: ['focus-visible'],
      textColor: ['focus-visible'],
      backgroundColor: ['focus-visible'],
      ringWidth: ['focus-visible'],
      ringColor: ['focus-visible'],
      ringOffsetWidth: ['focus-visible'],
      ringOffsetColor: ['focus-visible'],
    },
  },
  theme: {
    extend: {
      transitionProperty: {
        width: 'width',
      },
    },
  },
}
