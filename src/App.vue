<template>
  <div id="app">
    <router-link class="nav-item" to="/">Home</router-link>
    <router-link class="nav-item" to="/file-upload">File Upload</router-link>
    <router-link class="nav-item" to="/login">Login</router-link>
    <router-link class="nav-item" to="/signup">Signup</router-link>
    <button @click="logout">Logout</button>
    <router-view class="nav-item" v-if="db" :db="db"></router-view>
  </div>
</template>

<script>
import Bagel from "@bageldb/bagel-db";

export default {
  name: "App",

  data() {
    return {
      db: null,
    };
  },
  mounted() {
    this.db = new Bagel(process.env.VUE_APP_BAGEL_TOKEN);
  },
  methods: {
    logout() {
      this.db.users().logout();
    },
    async getEvents() {
      let { data: events } = await this.db.collection("events").get();
      this.events = events;
    },
  },
};
</script>


<style scoped>
#app {
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
}
.nav-item {
  padding: 20px;
}
</style>

