<template>
  <q-page class="flex flex-center">

    <blockquote>
      <p>Welcome to Record page.</p>
      <small>Please use the burger on top left corner to show the Menu.</small>
    </blockquote>

    <q-btn label="test" @click="onTest" />

  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'PageRecord',
  methods: {
    onTest () {
      this.$auth.fetch({})
        .then(response => {
          console.log('hi!')
          this.$auth.refresh()
        }, (error) => { console.log('bye!'); console.log(error) })
    }
  },
  mounted: function () {
    this.$checkAuth(this)
  }
}
</script>
