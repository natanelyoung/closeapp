<template>

<div>
  {{userID}}
      <form v-if="!userID" @submit.prevent="signUp">
        SIGNUP
      <input type="email" v-model="email" placeholder="Email"/>
      <input type="password" v-model="password" placeholder="Password" />
      <input type="submit" value="login"/>
    </form>
    <form @submit.prevent="login">
      Login
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
      async signUp(){
        let userID = await this.db.users().create(this.email,this.password)
        console.log(userID)
      },
      async login(){
        await this.db.users().validate(this.email,this.password)
        this.$router.push("/")
      },
      logout(){}
    }
}
</script>