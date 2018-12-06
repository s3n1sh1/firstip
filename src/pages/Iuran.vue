<template>
  <q-page class="flex flex-center">
    <myGrid ref="iuran.grid"
      :columnsty="columns" :routesty="'loadUser'" :buttonty="'c'"
    >
      <q-datetime
        type="date"
        v-model="date"
        class="q-caption q-ml-sm"
        inverted
        format="MMM YYYY"
        :max="today"
      />
    </myGrid>
  </q-page>
</template>

<style>
</style>

<script>

// import axios from 'axios'
// import { required, sameAs, minLength } from 'vuelidate/lib/validators'
import myGrid from '../components/myGrid'

const today = new Date()

export default {
  name: 'PageIuran',
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
      date: today,
      today
    }
  },
  methods: {
  },
  mounted: function () {
    this.$checkAuth(this)
  }
}
</script>
