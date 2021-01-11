<template>
    <div>
    <img alt="Vue logo" src="../assets/logo.png" />
    <h1>All Events</h1>
    <div class="event" v-for="event in events" :key="event._id">
      <h2>{{event.title}}</h2>
      <p>{{event.date}}</p>
    </div>
    <form>
        <input @submit.prevent="postNewEvent()" type="text" placeholder="Event Title" v-model="event.title">
        <input type="datetime-local" placeholder="event Date" v-model="event.date">
        <input type="submit">
    </form>
    </div>
</template>

<script>
export default {
    props:{db:Object},
    name:"home",
    data(){
        return {
            events:[],
            event:{
                title:"",
                date:""
            }
            }
    },
    mounted(){
    this.getEvents()
  },
  methods:{
      async postNewEvent(){
          await this.db.collection("events").post(this.event)
      },

    async getEvents(){
      let {data:events} = await this.db.collection("events").get()
      this.events = events;
    }
  }

}
</script>