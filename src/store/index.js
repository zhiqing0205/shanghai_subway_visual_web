import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    envScanData: {
      maxRsrp: 0,
      freqData: [],
      rsrpData: [],
    },
  },
  mutations: {
    setEnvScanData(state, data) {
      state.envScanData = data
    }
  },
  actions: {
  },
  modules: {
  }
})
