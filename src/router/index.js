import Vue from 'vue'
import Router from 'vue-router'
import PostListPage from "@/pages/PostListPage";
import PostViewPage from "@/pages/PostViewPage";
import SignupPage from "@/pages/SignupPage";
import SigninPage from "@/pages/SigninPage";
import AppHeader from "@/components/AppHeader";
import PostCreatePage from "@/pages/PostCreatePage";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/post/create",
      name: "PostCreatePage",
      components: {
        header: AppHeader,
        default: PostCreatePage
      }
    },
    {
      path: '/',
      name: 'PostListPage',
      components: {
        header: AppHeader,
        default: PostListPage
      }
    },
    {
      path: "/post/:postId",
      name: "PostViewPage",
      components: {
        header: AppHeader,
        default: PostViewPage
      },
      props: {
        default: true   // 이 라우터의 파라미터로 할당되어 있는 postId값을 PostViewPage컴포넌트로 가져가야한다.
                        // 그래서 이렇게 props를 true로 해놓으면 자식개념인 PostViewPage컴포넌트가 postId를 가져다 쓸 수 있다.
      }
    },
    {
      path: '/signup',
      name: 'SignupPage',
      components: {
        header: AppHeader,
        default: SignupPage
      }
    },
    {
      path: '/signin',
      name: 'SigninPage',
      component: SigninPage
    },

  ]
})

// 이 파일은 main.js 엔트리파일에 new Vue() 안으로 수출된다.
// 여기에 있는 컴포넌트들이 해당 path를 요청할 때 App.vue 컴포넌트 밑으로 <router-view/>라는 이름으로 들어간다.

