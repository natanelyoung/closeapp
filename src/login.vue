<template>
    <form>
      <input type="email" placeholder="Email"/>
      <input type="password" placeholder="Password" />
      <input type="submit" value="login"/>
    </form>
</template>


<script>
export default {
    name:"login",
    props:{db:Object},
    methods:{
      signUp(email,password){
        let userID = await this.db.users().create(email,password)
        console.log(userID)
      },
      login(){},
      logout(){}
    }
}
</script>