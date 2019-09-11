<template>
    <div class="post-view-page">
      <post-view :post="post"/>
      <router-link :to="{name: 'PostListPage'}">목록</router-link>
    </div>
</template>

<script>
  import { mapActions, mapState } from "vuex"
  import PostView from "@/components/PostView";

  export default {
    name: "PostViewPage",
    components: { PostView },
    props: {  // 여기서 props는 라우터 index.js에서 파라미터에 있는 postId를 내려받은 것이다.
      postId: {
        type: String,   // PostList에서 링크걸 때 params의 postId를 post.id.toString()으로 문자열로 변환시켜서 넣었기 때문에 String타입이다.
        required: true
      }
    },
    computed: {
      ...mapState([
        "post"
      ])
    },
    methods: {
      ...mapActions([
        "fetchPost"
      ])
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
