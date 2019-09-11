<template>
  <form @submit.prevent="onSubmit">
    <fieldset>
      <label>제목</label>
      <input v-model="title" type="text" placeholder="게시물 제목을 입력해주세요."/>
      <label>내용</label>
      <textarea v-model="contents" rows="5" placeholder="게시물 내용을 입력해주세요."></textarea>
      <button type="submit">게시하기</button>
    </fieldset>
  </form>
</template>

<script>
    export default {
      name: "PostCreateForm",   // 이걸로 부모 컴포넌트의 커스텀태그가 결정되므로 잘 설정해야한다.
      data() {
        return {
          title: "",
          contents: ""
        }
      },
      methods: {
        onSubmit() {
          const { title, contents } = this;
          this.$emit("submit", { title, contents });
        }
      }
    }
</script>

<style scoped>

</style>
