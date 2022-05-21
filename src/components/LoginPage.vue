<template>
  <div class="home">
    <h2>Assignment</h2>
    <form @submit.prevent="logInFunction()">
      <div>
        <input type="text" placeholder="Email" v-model="logInValues.emailId"/>
        <input type="password" placeholder="Password" v-model="logInValues.password"/>
      </div>
      <button>Login</button>
    </form>
    <router-link :to="{name: 'signUp'}">
      <button>SignUp</button>
    </router-link>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "LoginPage",
  computed: {
    ...mapState(['logInValues'])
  },
  methods: {
    ...mapActions(['logInFunction'])
  }
};
</script>
