<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <h1>All Events</h1>
    <div class="event" v-for="event in events" :key="event._id">
      <h2>{{event.title}}</h2>
      <p>{{event.date}}</p>
    </div>
  <login :db="db"/>
  </div>
</template>

<script>
import Bagel from '@bageldb/bagel-db';
import Login from './login';
export default {
  name: "App",
  components:{Login},
  data(){
    return{
      db:null,
      events:[]
    }
  },
  mounted(){
    this.db = new Bagel(process.env.VUE_APP_BAGEL_TOKEN)
    this.getEvents()
  },
  methods:{
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