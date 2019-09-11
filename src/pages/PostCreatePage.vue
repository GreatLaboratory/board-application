<template>
  <div class="post-create-page">
    <h3>게시물 작성하기</h3>
    <post-create-form @submit="onSubmit"/>
  </div>
</template>

<script>
    import PostCreateForm from "@/components/PostCreateForm";
    export default {
      name: "PostCreatePage",
      components: { PostCreateForm },
      methods: {
        onSubmit(payload) {
          // api연동 전 // 여기서부터 다시 시작해야함
        }
      }
    }
</script>

<style scoped>

</style>
