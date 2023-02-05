import { NavInfo, useNavStore } from '@/stores/NavStore';

const navsForPaths: Record<string, NavInfo> = {};

export default defineNuxtRouteMiddleware((to, from) => {
  // we are caching the nav info for every path the user navigates to
  // so we can show appropriate transitions when they navigate e.g. with the
  // back button
  //
  const store = useNavStore();
  const patch: Record<string, NavInfo> = {};

  // if the store already has the path we think we are navigating to
  // then cache the nav info for that path locally
  if (store.navTo.path === to.path) {
    navsForPaths[to.path] = { ...store.navTo };
    return;
  }

  // otherwise if we have a cached value for the path we are going to, patch it
  if (to?.path && navsForPaths[to.path]) {
    patch.navTo = { ...navsForPaths[to.path] };
  }

  // if we have a cached value for the path we are coming from, patch it
  if (from?.path && navsForPaths[from.path]) {
    patch.navFrom = { ...navsForPaths[from.path] };
  }

  // if we have any patches, apply them
  if (patch.navTo || patch.navFrom) {
    store.$patch(patch);
  }
});
