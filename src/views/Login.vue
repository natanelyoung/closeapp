<template>
<div>
    <form @submit.prevent="login">
     <h1> Login</h1>
      <input v-model="login.email" type="email" placeholder="Email"/>
      <input v-model="login.password" type="password" placeholder="Password" />
      <input type="submit" value="login"/>
    </form>
</div>
</template>


<script>
export default {
    name:"login",
    props:{db:Object},
    data(){
      return {
        userID:"",
        email:"",
        password:""
      }
    },
    methods:{
      async login(){
        await this.db.users().validate(this.email,this.password)
        this.$router.push("/")
      },
    }
}
</script>