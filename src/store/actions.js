import api from "@/api"
import {
  DESTROY_ACCESS_TOKEN,
  DESTROY_MY_INFO,
  FETCH_POST,
  FETCH_POST_LIST,
  SET_ACCESS_TOKEN,
  SET_MY_INFO
} from "@/store/mutations-types";

export default {
  fetchPostList({ commit }) {
    return api.get("/posts")
      .then((res)=>{
        commit(FETCH_POST_LIST, res.data);
      });
  },

  // 서버한테 특정 게시물을 읽어들일 때 필요한 고유한 id값을 주기 위해 액션함수의 인자에 postId를 넣는다.
  // 그리고 이 함수를 쓰는 장소인 PostViewPage에서 이 함수를 쓸 때 this.fetchPost(`/${this.postId}`) 이런 식으로 인자를 받아와서 써야한다.
  fetchPost({ commit }, postId) {
    return api.get(`/posts/${postId}`)
      .then((res)=>{
        commit(FETCH_POST, res.data)
      })
  },

  // 여기서 서버한테 클라이언트에서 입력한 이메일, 비밀번호를 보내면 서버는 검증 후 가입된 회원이면 jwt토큰을 발급해서 res.data.accessToken에
  // 넣어 응답으로 다시 보낸다. 그럼 여기서 그 응답에 데이터를 받아와 SET_ACCESS_TOKEN토큰으로 보내서 클라이언트 vue의 state.accessToken에
  // 저장하고 HTTP헤더에 Authorization에 `Bearer ${accessToken}`을 심어준다.
  signin({ commit }, payload) {
    const { email, password } = payload;
    api.post("/auth/signin", { email, password })
      .then((res)=>{
        alert("로그인이 완료되었습니다.");
        const { accessToken } = res.data;  // 여기서 res.data가 서버로부터 발급받은 토큰
        commit(SET_ACCESS_TOKEN, accessToken);  // 여기서 토큰을 state에 저장 & api모듈 http헤더에 저장 & 쿠키에 저장

        // 토큰을 state에 저장하면 api 모듈의 headers에 토큰이 저장되므로 아래에서 바로 사용자 정보를 불러올 수 있다.
        return api.get("/users/me")
      })
      .then((res)=>{
        commit(SET_MY_INFO, res.data)  // 이러면 위에서 받은 사용자 정보를 res.data라는 이름으로 SET_MY_INFO 변이로 commit(state에 저장하는 과정)한다.
      })
      .catch((err)=>{
        alert(err.response.data.msg)
      });
  },

  // 위에 signin에선 토큰을 발급받는 과정이 있지만 여긴 없이 쿠키에 저장되어있는 토큰여부를 통해 자동로그인해주는 곳이다.
  // 그래서 이 액션함수를 쓰는 곳은 그래서 어플리케이션이 초기화되는 시점인 main.js 엔트리 파일이다.
  signinByToken({ commit }, token) {
    // 토큰을 스토어에 커밋한다.
    commit(SET_ACCESS_TOKEN, token);

    // 사용자의 정보를 받아온 후 스토어에 커밋한다.
    return api.get("/users/me")
      .then((res)=>{
        commit(SET_MY_INFO, res.data)
      })
  },

  signout({ commit }) {
    commit(DESTROY_MY_INFO);
    commit(DESTROY_ACCESS_TOKEN);
  }
}
