import Vue from "vue";
import { createApp } from "./app";

const { app, router, store } = createApp();

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
}
router.onReady(() => {
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to);
    const prevMatched = router.getMatchedComponents(from);

    let diffed = false;
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = prevMatched[i] !== c);
    });

    if (!activated.length) {
      return next();
    }

    store.commit("SET_LOADING", true);
    Promise.all(
      activated.map(c => {
        if (c.asyncData) {
          return c.asyncData({ store, route: to });
        }
      })
    )
      .then(() => {
        next();
      })
      .catch(next)
      .finally(() => store.commit("SET_LOADING", false));
  });
  Vue.mixin({
    beforeRouteUpdate(to, from, next) {
      const { asyncData } = this.$options;
      if (asyncData) {
        store.commit("SET_LOADING", true);
        asyncData({
          store: this.$store,
          route: to
        })
          .then(next)
          .catch(next)
          .finally(() => store.commit("SET_LOADING", false));
      } else {
        next();
      }
    }
  });
  app.$mount("#app");
});
