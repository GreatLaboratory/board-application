<template>
  <div class="sign-up-page">
    <h3>회원가입</h3>
    <signup-form @submit="onSubmit"/>
    <p>이미 가입하셨나요??<router-link :to="{ name : 'SigninPage'}">로그인 하러가기</router-link></p>
  </div>
</template>

<script>
    import SignupForm from "@/components/SignupForm";
    import api from "@/api"

    export default {
      name: "SignupPage",
      components: { SignupForm },
      methods: {
        onSubmit(payload) {
          const { name, email, password } = payload;
          api.post("/auth/signup", { name, email, password })
            .then((res)=>{
              alert("회원가입에 성공하였습니다.");
              this.$router.push({ name: "SigninPage" });
            })
            .catch((err)=>{
              alert(err.response.data.msg);
          });
        }
      }
    }
</script>

<style scoped>

</style>
