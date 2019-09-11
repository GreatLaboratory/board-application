// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store"
import Cookies from "js-cookie"

// 쿠키에서 토큰을 검사하는 과정은 어플리케이션 초기화될 때 수행해야 하므로 main.js인 엔트리 파일에 작성한다.
const savedToken = Cookies.get("accessToken");
if (savedToken) {
  store.dispatch("signinByToken", savedToken);
}

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
