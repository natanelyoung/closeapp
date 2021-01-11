<template>

<div>
      <form v-if="!userID" @submit.prevent="signUp">
        <h1>SIGNUP</h1>
      <input type="email" v-model="email" placeholder="Email"/>
      <input type="password" v-model="password" placeholder="Password" />
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
        this.userID = await this.db.users().create(this.email,this.password)
        this.$router.push("/")
      },
    }
}
</script>