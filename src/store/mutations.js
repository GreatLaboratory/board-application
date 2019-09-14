import {
  DESTROY_ACCESS_TOKEN,
  DESTROY_MY_INFO,
  FETCH_POST,
  FETCH_POST_LIST,
  SET_ACCESS_TOKEN,
  SET_MY_INFO,
  UPDATE_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT
} from "./mutations-types"
import api from "@/api"
import Cookies from "js-cookie"

export default {
  [FETCH_POST_LIST] (state, posts) {
    state.posts = posts
  },
  [FETCH_POST] (state, post) {
    state.post = post
  },
  [SET_ACCESS_TOKEN] (state, accessToken) {
    // 스토어 상태(state)의 토큰을 업데이트하고 api모듈을 사용하여 HTTP 헤더에 토큰을 심어준다.
    if (accessToken) {
      state.accessToken = accessToken;
      api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      Cookies.set("accessToken", accessToken);
    }
  },
  [SET_MY_INFO] (state, me) {
    if (me) {
      state.me = me;
    }
  },
  [DESTROY_ACCESS_TOKEN] (state) {
    state.accessToken = "";
    delete api.defaults.headers.common.Authorization;
    Cookies.remove("accessToken")
  },
  [DESTROY_MY_INFO] (state) {
    state.me = null;
  },
  [UPDATE_COMMENT] (state, payload) {
    state.post.comments.push(payload)
  },
  [EDIT_COMMENT] (state, payload) {
    const { id: commentId, contents, updatedAt } = payload;
    const targetComment = state.post.comments.find(comment => comment.id === commentId);  // Array자료형의 find메소드 사용
    targetComment.contents = contents;
    targetComment.updatedAt = updatedAt;
  },
  [DELETE_COMMENT] (state, commentId) {
    const targetIndex = state.post.comments.findIndex(comment => comment.id === commentId);
    state.post.comments.splice(targetIndex, 1);
  }
}
