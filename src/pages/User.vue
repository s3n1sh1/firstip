<template>
  <q-page class="flex flex-center">
    <myGrid :columnsty="columns" :routesty="'loadUser'" @addEvent="openModal" />

    <q-modal v-model="opened" maximized>
    </q-modal>
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
        { name: 'tuname', label: 'Name', field: 'tuname', align: 'left', sortable: true },
        { name: 'tuiran', label: 'Iuran', field: 'tuiran', align: 'right' }
      ],
      opened: false,
      tuuser: ''
    }
  },
  methods: {
    openModal () {
      this.opened = true
    }
  },
  mounted: function () {
    this.$checkAuth(this)
  }
}
</script>
