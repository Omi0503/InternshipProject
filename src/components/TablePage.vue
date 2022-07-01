<template>
  <div>
    <div>
      <h1>Hi, {{ userInfo.firstName }} {{ userInfo.lastName }}</h1>
      <button @click="logOutFunction()">Log Out</button>
    </div>
    <h2>Information table</h2>
    <router-link :to="{ name: 'createForm' }"
      >Create new Information?</router-link
    >
    <hr />
    <table style="width: 100%">
      <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Gender</th>
        <th>Email Id</th>
        <th>Operations</th>
      </tr>
      <tr v-for="value in formValuesList" :key="value.id">
        <td>{{ value.firstName }}</td>
        <td>{{ value.lastName }}</td>
        <td>{{ value.gender }}</td>
        <td>{{ value.emailId }}</td>
        <td>
          <button @click="getFormValuesById(value.id)">Edit</button>
          <button @click="deleteFormValue(value.id)">Delete</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState(["formValuesList", "userInfo"]),
  },
  methods: {
    ...mapActions([
      "deleteFormValue",
      "getFormValues",
      "getFormValuesById",
      "logOutFunction",
    ]),
  },
  beforeMount() {
    this.getFormValues();
  },
};
</script>

<style>
</style>