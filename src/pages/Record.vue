<template>
  <q-page class="flex flex-center">
    <myGrid ref="record.grid" keysty="bln"
      :columnsty="columns" :routesty="'loadRecord'"
      :paramsty="{date: date}" :statusty="{field: 'tiiranid', messageno: 'BELUM LUNAS', messageyes: 'SUDAH LUNAS'}"
    >
      <q-datetime
        ref="record.date"
        v-model="date"
        class="q-caption q-ml-sm"
        inverted
        popover
        default-view="year"
        format="YYYY"
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
  name: 'PageRecord',
  components: { myGrid },
  data () {
    return {
      columns: [
        { name: 'bln', required: true, label: 'Month', field: 'bln', align: 'left' },
        { name: 'iuran', label: 'Iuran', field: 'iuran', align: 'right' }
      ],
      date: today,
      today
    }
  },
  methods: {
    onDateChange () {
      this.$refs['record.date'].hide()
      this.$refs['record.grid'].loading = true
      axios.get('loadRecord', {params: {date: this.date}}).then((response) => {
        this.$refs['record.grid'].tableData = response.data.data
        this.$refs['record.grid'].loading = false
        this.$refs['record.grid'].$children[1].$children[0].focus()
      })
    }
  },
  mounted: function () {
    this.$checkAuth(this)
  }
}
</script>
