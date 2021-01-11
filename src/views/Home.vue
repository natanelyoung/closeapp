<template>
    <div>
    <img alt="Vue logo" src="../assets/logo.png" />
    <h1>All Events</h1>
    <div v-if="events.length" >
    <div class="event" v-for="event in events" :key="event._id">
      <h2>{{event.title}}</h2>
      <p>{{event.date}}</p>
    </div>
    </div>
    <div v-else>
      No Events
    </div>    <form>
      <h3>Submit New Event</h3>
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
      try {
        let {data:events} = await this.db.collection("events").get()
              this.events = events;
      }catch(err){
        console.log(err.message)
      }
      

    }
  }

}
</script>