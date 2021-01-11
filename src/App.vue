<template>
  <div id="app">
    <button @click="logout">Logout</button>
    <router-view v-if="db" :db="db"></router-view>

  </div>
</template>

<script>
import Bagel from '@bageldb/bagel-db';

export default {
  name: "App",
  
  data(){
    return{
      db:null,

    }
  },
  mounted(){
    this.db = new Bagel(process.env.VUE_APP_BAGEL_TOKEN)
  },
  methods:{
    logout(){
      this.db.users().logout()
    },
    async getEvents(){
      let {data:events} = await this.db.collection("events").get()
      this.events = events;
    }
  }
};
</script>


<style scoped>
#app{
  text-align: center;
}
</style>