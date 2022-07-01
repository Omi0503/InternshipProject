<template>
  <div>
    <div class="home">
      <h2>Login Page</h2>
      <form @submit.prevent="logInFunction()">
        <div>
          <input
            style="margin-right: 20px"
            type="text"
            placeholder="Email"
            v-model="logInValues.emailId"
          />
          <input
            type="password"
            placeholder="Password"
            v-model="logInValues.password"
          />
        </div>
        <br />
        <button>Login</button>
      </form>
      <br />
      <router-link :to="{ name: 'signUp' }">
        <button>SignUp</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "LoginPage",
  computed: {
    ...mapState(["logInValues"]),
  },
  methods: {
    ...mapActions(["logInFunction"]),
  },
};
</script>
