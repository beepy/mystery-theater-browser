export default ({ app, store }, inject) => {
  // this is Nuxt stuff, in vanilla Vue use just your router intances
  const { router } = app

  let programmatic = false
  ;['push', 'replace', 'go', 'back', 'forward'].forEach((methodName) => {
    const method = router[methodName]
    router[methodName] = (...args) => {
      programmatic = true
      method.apply(router, args)
    }
  })

  router.beforeEach((to, from, next) => {
    // name is null for initial load or page reload
    if (from.name === null || programmatic) {
      // triggered bu router.push/go/... call
      // route as usual
      store.commit('historyNav', false)
      next()
    } else {
      // triggered by user back/forward
      // do not route
      store.commit('historyNav', true)
      next()
    }
    programmatic = false // clear flag
  })
}
