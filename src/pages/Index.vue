<template>
  <q-page class="flex flex-center">

    <blockquote>
      <p>Welcome to Home page.</p>
      <small>Please use the burger on top left corner to show the Menu.</small>
    </blockquote>

  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex',
  mounted: function () {
    this.$checkAuth(this)
  }
}
</script>
