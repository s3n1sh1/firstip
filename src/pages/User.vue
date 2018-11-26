<template>
  <q-page class="flex flex-center">
    <myGrid :columnsty="columns" :routesty="'loadUser'" />
  </q-page>
</template>

<style>
</style>

<script>
import myGrid from '../components/myGrid'

export default {
  name: 'PageUser',
  components: { myGrid },
  data () {
    return {
      columns: [
        {
          name: 'tuuser',
          required: true,
          label: 'Username',
          align: 'left',
          field: 'tuuser',
          sortable: true
        },
        {
          name: 'xxx',
          required: true,
          align: 'left',
          field: 'xxx'
        }
      ]
    }
  },
  mounted: function () {
    this.$checkAuth(this)
  }
}
</script>
