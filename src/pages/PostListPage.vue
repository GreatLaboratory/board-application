<template>
    <div class="post-list-page">
      <h1>포스트 게시글</h1>
      <post-list :posts="posts"/>
      <router-link :to="{ name: 'PostCreatePage' }">글쓰기</router-link>
    </div>
</template>

<script>
    import PostList from "@/components/PostList";
    import { mapActions, mapState } from "vuex"

    export default {
      name: "PostListPage",
      components: { PostList },
      computed: {
        ...mapState([
          "posts"   // 이건 mapActions로 매핑된 fetchPostList함수가 created훅에서 실행되서 서버로부터 받아온
                    // 데이터들이 state의 posts에 잘 들어가있는 '계산된' 데이터가 여기 온 것이다.
        ])
      },
      methods: {
        ...mapActions([
          "fetchPostList"  // 이건 store디렉토리에 actions.js에 있는 해당 함수를 불러오는 장소이다.
        ])
      },
      created() {
        this.fetchPostList();
        // vuex의 순서는 여기서 출발한다.
        // 1. 여기서 위에 있는 ...mapActions로 actions.js에 있는 fetchPostList함수를 불러온다.
        // 2. fetchPostList함수에서 서버로부터 url엔드포인트를 axios를 통해 데이터를 받고 그 데이터를 FETCH_POST_LIST 변이로 commit한다.
        // 3. mutations.js에서 서버로부터 받은 데이터를 인자로 넘겨서 state.js의 posts배열에 넣는다.
        // 4. 그렇게 서버로부터 받은 데이터가 들어간 state의 posts를 위에 ...mapState(["posts"])로 받아와서 컴포넌트 내에서 사용한다.
        // 5. 여기선 받아온 데이터를 여기 컴포넌트에서 쓰지않고 자식 컴포넌트에 바인딩시켜 사용한다. (자식 컴포넌트에선 props를 통해 내려받는다.)
      }
    }
</script>

<style scoped>

</style>
