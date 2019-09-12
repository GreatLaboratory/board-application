import Vue from 'vue'
import Router from 'vue-router'
import PostListPage from "@/pages/PostListPage";
import PostViewPage from "@/pages/PostViewPage";
import SignupPage from "@/pages/SignupPage";
import SigninPage from "@/pages/SigninPage";
import AppHeader from "@/components/AppHeader";
import PostCreatePage from "@/pages/PostCreatePage";

Vue.use(Router);

import store from "@/store"
import PostEditPage from "@/pages/PostEditPage";

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/post/create",
      name: "PostCreatePage",
      components: {
        header: AppHeader,
        default: PostCreatePage
      },
      beforeEnter (to, from, next) {
        const { isAuthorized } = store.getters;
        if (!isAuthorized) {
          alert("로그인이 필요합니다.");
          next({ name: "SigninPage" });
        }
        next();
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
      path: "/post/:postId/edit",
      name: "PostEditPage",
      components: {
        header: AppHeader,
        default: PostEditPage
      },
      props: {
        default: true
      },
      beforeEnter(to, from, next) {
        const { isAuthorized } = store.getters;
        if (!isAuthorized) {
          alert("로그인이 필요합니다.");
          next({ name: "SigninPage" });
          return false;  // 여기선 왜 이 코드를 넣었을까.. // 아 아래 store.dispatch 실행시키지않으려고 빠져나오는 코드구나
        }
        store.dispatch("fetchPost", to.params.postId)
          .then(()=>{
            // 먼저 이 글을 쓴 사람이 현재 로그인으로 인증받은 사람인지를 판별한다.
            const post = store.state.post;
            const isAuthor = post.user.id === store.state.me.id;
            if (isAuthor) {
              // 일치하면서 게시물 데이터 요청이 성공했다면 다음 라우팅을 그대로 진행한다.
              next();
            } else {
              alert("게시물의 작성자만 게시물을 수정할 수 있습니다.");
              next(from)
            }
          })
          .catch((err)=>{
            alert(err.response.data.msg);
            next(from)
          })
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

