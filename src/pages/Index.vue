<template>
  <q-page class="q-pa-md">

    <!-- <blockquote>
      <p>Welcome to Home page.</p>
      <small>Please use the burger on top left corner to show the Menu.</small>
    </blockquote> -->

    <p v-for="(item, index) in itemsReverse" :key="index" class="caption">
      <q-jumbotron class="q-pa-md pre-formatted">
        <div class="q-title">{{itemsReverse[index]['tnname']}}</div>
        <hr class="q-hr q-my-md">
        <div class="q-subheading q-mb-sm">{{itemsReverse[index]['tndesc']}}</div>
        <div class="q-body-2 text-right text-italic">{{itemsReverse[index]['tnrgdt']}}</div>
      </q-jumbotron>
    </p>

    <p class="caption">
      <q-jumbotron class="q-pa-md pre-formatted">
        <div class="q-title">Welcome to Home page.</div>
        <hr class="q-hr q-my-md">
        <div class="q-subheading">Please use the burger on top left corner to show the Menu.</div>
      </q-jumbotron>
    </p>

  </q-page>
</template>

<style>
.pre-formatted {
  white-space: pre-wrap;
}
</style>

<script>

import axios from 'axios'

export default {
  name: 'PageIndex',
  data () {
    return {
      items: []
    }
  },
  computed: {
    itemsReverse () {
      return [...this.items].reverse()
    }
  },
  mounted: function () {
    this.$checkAuth(this)
    axios.get('loadNews').then((response) => {
      this.items = response.data.data
    })
  }
}
</script>
