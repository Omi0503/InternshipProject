<template>
  <div>
      <h2>You have successfully logged out</h2>
      <div>
          <router-link :to="{name: 'home'}">Wanna log in again?</router-link>
          <br />
          <router-link :to="{name: 'signUp'}">Sign up?</router-link>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>