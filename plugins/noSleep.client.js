import NoSleep from 'nosleep.js'

export default (context, inject) => {
  const noSleep = new NoSleep()
  context.$noSleep = noSleep
  inject('noSleep', noSleep)
}
