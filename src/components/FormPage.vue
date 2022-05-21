<template>
  <div>
    <form @submit.prevent="operation()">
      <div>
        <input
          type="text"
          placeholder="First Name"
          v-model="formValues.firstName"
        />
        <input
          type="text"
          placeholder="Last Name"
          v-model="formValues.lastName"
        />
        <div>
          <label>Gender</label>
          <input
            type="radio"
            id="Male"
            value="Male"
            v-model="formValues.gender"
          />
          <label for="Male">Male</label>
          <input
            type="radio"
            id="Female"
            value="Female"
            v-model="formValues.gender"
          />
          <label for="Female">Female</label>
        </div>
        <input
          type="text"
          placeholder="Email Id"
          v-model="formValues.emailId"
        />
      </div>
      <button>{{ buttonName }}</button>
    </form>
    <button @click="resetFormValues()">Reset</button>
    <router-link :to="{name: 'user'}">
      <button @click="resetFormValues()">Cancel</button>
    </router-link>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  computed: {
    ...mapState(["formValues", "buttonName"]),
  },

  methods: {
    ...mapMutations(["resetFormValues"]),
    ...mapActions(["operation"]),
  },
};
</script>

<style>
</style>