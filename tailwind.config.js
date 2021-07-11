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
      fontFamily: {
        copy: 'Heebo, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
        fancy:
          '"IM Fell Great Primer", ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
      },
    },
  },
}
