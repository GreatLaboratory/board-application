<template>
    <div class="post-view-page">
      <post-view :post="post"/>
      <router-link :to="{name: 'PostEditPage', params: { postId } }">수정</router-link>
      <button @click="onDelete">삭제</button>
      <router-link :to="{name: 'PostListPage'}">목록</router-link>
      <comment-list v-if="post" :comments="post.comments"/>  <!-- 이걸 통해서 자식 컴포넌트한테 comments데이터를 넘겨준다. -->
      <comment-form @submit="onCommentSubmit"/>
    </div>
</template>

<script>
  import { mapActions, mapState, mapGetters } from "vuex"
  import PostView from "@/components/PostView";
  import api from "@/api"
  import CommentList from "@/components/CommentList";
  import CommentForm from "@/components/CommentForm";
  export default {
    name: "PostViewPage",
    components: {CommentForm, CommentList, PostView },
    props: {  // 여기서 props는 라우터 index.js에서 파라미터에 있는 postId를 내려받은 것이다.
      postId: {
        type: String,   // PostList에서 링크걸 때 params의 postId를 post.id.toString()으로 문자열로 변환시켜서 넣었기 때문에 String타입이다.
        required: true
      }
    },
    computed: {
      ...mapState([
        "post"
      ]),
      ...mapGetters([
        "isAuthorized"
      ])
    },
    methods: {
      ...mapActions([
        "fetchPost",
        "createComment"
      ]),
      onDelete() {
        const { id } = this.post;
        api.delete(`/posts/${id}`)
          .then((res)=>{
            alert("게시물이 성공적으로 삭제되었습니다.")
            this.$router.push({ name:"PostListPage" })
          })
          .catch((err)=>{
            if (err.response.status===401){
              alert("로그인이 필요합니다.")
              this.$router.push({name:"SigninPage"})
            } else {
              alert(err.response.data.msg)
            }
          });
      },
      onCommentSubmit(comment) {
        if (!this.isAuthorized) {
          alert("로그인이 필요합니다!")
          this.$router.push({name:"SigninPage"})
        } else {
          this.createComment(comment)
            .then(()=>{
              alert("댓글이 성공적으로 작성되었습니다.")
            })
            .catch((err)=>{
              alert(err.response.data.msg)
            })
        }
      }
    },
    created() {
      this.fetchPost(`/${this.postId}`)  // 인자의 형식이 왜 이렇게 들어가는지는 아직 모르겠음...
        .catch((err)=> {
          alert(err.response.data.msg);
          this.$router.back();
        });
    }
  }
</script>

<style scoped>

</style>
