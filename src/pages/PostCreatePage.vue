<template>
  <div class="post-create-page">
    <h3>게시물 작성하기</h3>
    <post-create-form @submit="onSubmit"/>
  </div>
</template>

<script>
    import PostCreateForm from "@/components/PostCreateForm";
    import api from "@/api"

    export default {
      name: "PostCreatePage",
      components: { PostCreateForm },
      methods: {
        // 여기 메소드는 액션함수로 끌어오지않는데 이유는 컴포넌트들이 공통으로 관리하는 store관리가 필요없기 때문이다.
        onSubmit(payload) {
          const { title, contents } = payload;
          api.post("/posts", { title, contents })
            .then((res)=>{
              alert("게시물이 성공적으로 작성되었습니다.");
              this.$router.push({
                name: "PostViewPage",
                params: { postId: res.data.id.toString() }
              })
            })
            .catch((err)=>{
              if (err.response.status === 401) {
                alert("로그인이 필요합니다.");
                this.$router.push({ name : "SigninPage" });
              } else {
                alert(err.response.data.msg);  // 서버에서 응답하는 에러메세지 노출
              }
            });
        }
      }
    }
</script>

<style scoped>

</style>
