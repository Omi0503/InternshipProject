<template>
  <div>
    <form @submit.prevent="postSignUpValues()">
      <div>
        <input
          type="text"
          placeholder="First Name"
          v-model="signUpValues.firstName"
        />
        <input
          type="text"
          placeholder="Last Name"
          v-model="signUpValues.lastName"
        />
        <div>
          <label>Gender</label>
          <input
            type="radio"
            id="Male"
            value="Male"
            v-model="signUpValues.gender"
          />
          <label for="Male">Male</label>
          <input
            type="radio"
            id="Female"
            value="Female"
            v-model="signUpValues.gender"
          />
          <label for="Female">Female</label>
        </div>
        <input type="text" placeholder="Email" v-model="signUpValues.emailId" />
        <input
          type="password"
          placeholder="Password"
          v-model="signUpValues.password"
        />
        <input
          type="text"
          placeholder="Confirm password"
          v-model="signUpValues.cPassword"
        />
      </div>
      <button>SignUp</button>
    </form>
    <button @click="resetSignUpValues()">Reset</button>
    <router-link :to="{name: 'home'}">
      <button @click="resetSignUpValues()">Cancel</button>
    </router-link>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "SignUpPage",
  computed: {
    ...mapState(["signUpValues"]),
  },
  methods: {
    ...mapMutations(["resetSignUpValues"]),
    ...mapActions(["postSignUpValues"]),
  },
};
</script>