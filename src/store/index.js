import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    event_id: 0,
    api_url: 'http://localhost:8080',
    image_placeholder: 'https://via.placeholder.com/'
  },
  getters: {
    // this.$store.getters.api_url
    api_url: function (state) {
        return state.api_url;
    },
    image_placeholder: function (state) {
        // this.$store.getters.image_placeholder(['600x400', '/aaa/fff']);
        return function (args) {
            return `${state.image_placeholder}/${args[0]}${args[1]}`;
        }
    }
  },
  mutations: {
    // this.$store.commit('event_id', {key: '', value: ''})
    event_id(state, payload) {
      state.event_id = payload.event_id;
    }
  },
  actions: {
    // this.$store.dispatch('event_id', {key:'', value:''});
    async actionA ({ commit }) {
      // commit('event_id', await sometingAPI())
    },
    async event_id(context) { // ({dispatch, commit})
        await context.dispatch('actionA') // wait for `actionA` to finish
        context.commit('event_id')
    }
  },
  plugins: [
    createPersistedState({
        storage: window.sessionStorage,
    })
  ],
  modules: {
  }
})
