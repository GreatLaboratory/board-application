// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store"
import Cookies from "js-cookie"

// 쿠키에서 토큰을 검사하는 과정은 어플리케이션 초기화될 때 수행해야 하므로 main.js인 엔트리 파일에 작성한다.
// const savedToken = Cookies.get("accessToken");
// if (savedToken) {
  // 아래 액션은 비동기식으로 작동하고 있다.
  // 따라서 이 코드 밑에 있는 라인들, 다시 말해 Vue인스턴스가 생성될 때에는 이 액션이 완료되었음을 보장하지 못한다.
  // 따라서 서버와 통신하여 사용자 정보를 받아오는 signinByToken액션이 완료된 후 Vue인스턴스를 생성할 수 있도록 만들어줘야 한다.
//   store.dispatch("signinByToken", savedToken);
// }

// promise의 비동기식 작동방식을 강제로 성공시켜주는 함수가 resolve메소드이다.
function init() {
  const savedToken = Cookies.get("accessToken");
  if (savedToken) {
    // 저장된 토큰이 존재한다면 signinByToken액션을 반환한다.
    return store.dispatch("signinByToken", savedToken);
  } else {
    // 저장된 토큰이 존재하지 않는다면 바로 promise를 성공시켜버린다.
    return Promise.resolve()
  }
  // 이렇게 함으로써 이 함수는 무조건 signinByToken이 실행됨을 보장한다.
}

// init함수의 then메소드 내부는 init함수가 종료되었음을 보장받는다.
Vue.config.productionTip = false;
init().then((res)=>{
  new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
  });
});
