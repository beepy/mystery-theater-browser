import type { RouterConfig } from '@nuxt/schema';
// https://router.vuejs.org/api/interfaces/routeroptions.html
export default <RouterConfig>{
  // scrollBehavior(to, from, savedPosition) {
  //   console.log('scroll')
  //   return new Promise((resolve, reject) => {
  //       setTimeout(() => {
  //         if (savedPosition) {
  //           console.log('savedPosition')
  //           console.log(savedPosition)
  //           resolve({ ...savedPosition, behavior: 'smooth' })
  //         } else {
  //           console.log('no savedPosition')
  //           // resolve();
  //           return { top: 0, left: 0 }
  //         }
  //       }, 1500)
  //     })
  // }
};
