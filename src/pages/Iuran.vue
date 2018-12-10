<template>
  <q-page class="flex flex-center">
    <myGrid ref="iuran.grid" keysty="tiuserid"
      :columnsty="columns" :routesty="'loadIuran'"
      :buttonty="'c'" selectionty="multiple"
      :paramsty="{date: date}" @confirmEvent="onConfirm"
    >
      <q-datetime
        v-model="date"
        class="q-caption q-ml-sm"
        inverted
        format="MMM YYYY"
        :max="today"
        @input="onDateChange"
      />
    </myGrid>
  </q-page>
</template>

<style>
</style>

<script>

import axios from 'axios'
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
        { name: 'tiiran', label: 'Iuran', field: 'tiiran', align: 'right' }
      ],
      date: today,
      today
    }
  },
  methods: {
    onDateChange () {
      this.$refs['iuran.grid'].loading = true
      axios.get('loadIuran', {params: {date: this.date}}).then((response) => {
        this.$refs['iuran.grid'].tableData = response.data.data
        this.$refs['iuran.grid'].loading = false
      })
    },
    onConfirm (selection) {
      if (selection.length === 0) {
        this.$q.notify('No rows selected.')
        return
      }

      this.$q.dialog({
        title: 'Confirm',
        message: 'Are you sure you want to confirm these data?',
        ok: 'Agree',
        cancel: 'Disagree'
      }).then(() => {
        this.$displayLoading(this)
        axios.post('saveIuran', {iuran: selection, mode: '1', month: this.date}).then((response) => {
          this.$traitSuccess(this, response)
          this.$refs['iuran.grid'].loading = true
          axios.get('loadIuran', {params: {date: this.date}}).then((response) => {
            this.$refs['iuran.grid'].tableData = response.data.data
            this.$refs['iuran.grid'].loading = false
          })
        }, (error) => { this.$traitError(this, error) })
      }).catch(() => {})
    }
  },
  mounted: function () {
    this.$checkAuth(this)
  }
}
</script>
