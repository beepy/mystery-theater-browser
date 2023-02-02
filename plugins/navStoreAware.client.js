// import { useNavStore } from '~/stores/NavStore';

export default defineNuxtPlugin((nuxtApp) => {
  // const store = useNavStore();
  // const router = useRouter();
  // const methods = ['push', 'replace', 'go', 'back', 'forward'];
  // let programmatic = false;
  // we can't patch router any more
  // methods.forEach((methodName) => {
  //   const method = router[methodName]
  //   router[methodName] = (...args) => {
  //     programmatic = true
  //     method.apply(router, args)
  //   }
  // })
  // router.beforeEach((to, from, next) => {
  //   // name is null for initial load or page reload
  //   if (!from.name || programmatic) {
  //     // triggered bu router.push/go/... call
  //     // route as usual
  //     store.$patch({ historyNav: false });
  //     next();
  //   } else {
  //     // triggered by user back/forward
  //     // do not route
  //     store.$patch({ historyNav: true });
  //     next();
  //   }
  //   programmatic = false; // clear flag
  // });
  // return {
  //   provide: {
  //     injected: () => console.log('my injected function')
  //   }
  // }
  //
  // console.log('plugin beforeEach')
  // router.beforeEach((to, from, next) => {
  //   console.log('beforeEach')
  //   console.log([to,from, next])
  //   next()
  // })
});
