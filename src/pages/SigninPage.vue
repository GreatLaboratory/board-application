<template>
  <div class="sign-in-page">
    <h3>로그인</h3>
    <signin-form @submit="onSubmit"/>
    <p>회원이 아니신가요?<router-link :to="{ name:'SignupPage' }">회원가입하러 가기</router-link></p>
  </div>
</template>

<script>
    import SigninForm from "@/components/SigninForm";
    import { mapActions } from "vuex"

    export default {
      name: "SigninPage",
      components: { SigninForm },
      methods: {
        ...mapActions([
          "signin"
        ]),
        onSubmit(payload) {
          this.signin(payload)
            .then((res)=>{
              this.$router.push({ name: 'PostListPage' })
            })
            .catch((err)=>{
              alert(err.response.data.msg)
            })
        }
      }
    }
</script>

<style scoped>

</style>
