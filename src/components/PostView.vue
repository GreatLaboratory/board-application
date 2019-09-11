<template>
  <div class="post-view">
    <div v-if="post">
      <h1>{{ post.title }}</h1>
      <span>게시물 번호 {{ post.id }}</span>
      <strong>{{ post.user.name }} . {{ post.createdAt }}</strong>
      <p>{{ post.contents }}</p>
    </div>
    <div v-else>
      <p>게시물 로딩 중.....</p>
    </div>
  </div>
</template>

<script>
    export default {
      name: "PostView",

      // Invalid prop: type check failed for prop "post". Expected Object, got Null
      // Error in render: "TypeError: Cannot read property 'title' of null"
      // TypeError: Cannot read property 'title' of null
      // 컴포넌트가 렌더될 당시 post변수가 null값이라는게 문제다. 따라서 지금 이 컴포넌트가 post변수에 접근하려할 때 이 변수가 null이 아니도록 해줘야한다.
      // 해결은 위에 v-if로 해결
      props: {
        post: {
          type: Object,
          required: true,
          validator(post) {
            const isValidPostId = typeof post.id==='number';
            const isValidTitle = !!post.title && post.title.length;
            const isValidContents = post.contents && post.contents.length;
            return isValidPostId && isValidTitle && isValidContents
          }
        }
      }
    }
</script>

<style scoped>

</style>
