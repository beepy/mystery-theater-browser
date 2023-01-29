export default defineNuxtRouteMiddleware((to, from) => {
  // const store = useNavStore();
  // const router = useRouter();

  // let methods = ['push', 'replace', 'go', 'back', 'forward'];
  // let programmatic = false;

  // we can't patch router any more
  // methods.forEach((methodName) => {
  //   const method = router[methodName] as Function
  //   router[methodName] = (...args) => {
  //     programmatic = true
  //     method.apply(router, args)
  //   }
  // })

  // router.beforeEach((to, from, next) => {
  //   // name is null for initial load or page reload
  //   if (from.name === null || programmatic) {
  //     // triggered bu router.push/go/... call
  //     // route as usual
  //     store.$patch({ historyNav:  false })
  //     next()
  //   } else {
  //     // triggered by user back/forward
  //     // do not route
  //     store.$patch({ historyNav:  true })
  //     next()
  //   }
  //   programmatic = false // clear flag
  // })
  // can we set route meta in nuxt? Only statically.
  console.log('defineNuxtRouteMiddleware');
  console.log([to, from, to.meta?.foo]);
});
