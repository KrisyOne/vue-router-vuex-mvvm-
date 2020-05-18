import Vue from 'vue'
import KVuex from './kVuex'

Vue.use(KVuex)

export default new KVuex.Store({
  state: {
    count: 0
  },
  mutations: {
    add (state, num = 1) {
      state.count += 1
    }
  },
  actions: {
    asyncAdd ({commit}) {
      return new Promise ((resolve, reject) => {
        setTimeout( () => {
          commit('add')
          resolve({ok: '1'})
        }, 1000)
      })
    }
  },
  getters: {
    count (state) {
      return state.count + 'eeeee'
    }
  }
})
