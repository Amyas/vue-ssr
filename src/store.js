import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const getListApi = id => {
  return new Promise(resolve => {
    setTimeout(() => {
      const n = 20;
      const list = [];
      for (let i = 0; i < n; i++) {
        list.push({
          id: i,
          name: `id=${i}`
        });
      }
      const cur = list.find(v => v.id === id);
      resolve(cur);
    }, 1000);
  });
};

export function createStore() {
  return new Vuex.Store({
    state: {
      list: {
        id: 0,
        name: ""
      },
      loading: false
    },
    mutations: {
      SET_LIST(state, o) {
        state.list = o;
      },
      SET_LOADING(state, o) {
        state.loading = o;
      }
    },
    actions: {
      async getList({ commit }, id = 1) {
        const list = await getListApi(Number(id));
        commit("SET_LIST", list);
      }
    }
  });
}
