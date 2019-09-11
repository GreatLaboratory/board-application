import Vue from "vue"
import Vuex from "vuex"

import state from "./states"
import getters from "./getters"
import mutations from "./mutations"
import actions from "./actions"

Vue.use(Vuex);

export default new Vuex.Store({
  actions,
  getters,
  mutations,
  state
})

// 이 파일은 main.js엔트리파일에 new Vue() 안으로 수출된다.
