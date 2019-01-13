<template>
  <q-page class="flex flex-center">
    <myGrid ref="settle.grid" keysty="tiiranid"
      :columnsty="columns" :routesty="'loadSettle'"
      :buttonty="USER_DETAIL.username !== 'admin2' ? 'd' : ''"
      :paramsty="{date: date}" @deleteEvent="onDelete"
    >
      <template slot="toolleft">
        <q-datetime
          ref="settle.date"
          v-model="date"
          class="q-caption q-ml-sm"
          inverted
          popover
          default-view="month"
          format="MMM YYYY"
          @input="onDateChange"
          :max="maxdate"
        />
      </template>
    </myGrid>
  </q-page>
</template>

<style>
</style>

<script>

import axios from 'axios'
import myGrid from '../components/myGrid'
import { mapGetters } from 'vuex'
import { date } from 'quasar'

const today = new Date()
const maxdate = date.adjustDate(date.addToDate(today, { year: 2 }), { month: 12 })

export default {
  name: 'PageSettle',
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
      today,
      maxdate
    }
  },
  methods: {
    onDateChange () {
      this.$refs['settle.date'].hide()
      this.$refs['settle.date'].focused = false
      this.$refs['settle.grid'].loading = true
      axios.get('loadSettle', {params: {date: this.date}}).then((response) => {
        this.$refs['settle.grid'].tableData = response.data.data
        this.$refs['settle.grid'].loading = false
      })
    },
    onDelete (row) {
      this.$q.dialog({
        title: 'Delete',
        message: 'Are you sure you want to remove these data?',
        ok: 'Agree',
        cancel: 'Disagree'
      }).then(() => {
        this.$displayLoading(this)
        axios.post('saveIuran', {iuran: row.tiiranid, mode: '3', month: this.date}).then((response) => {
          this.$traitSuccess(this, response)
          this.$refs['settle.grid'].loading = true
          axios.get('loadSettle', {params: {date: this.date}}).then((response) => {
            this.$refs['settle.grid'].tableData = response.data.data
            this.$refs['settle.grid'].loading = false
          })
        }, (error) => { this.$traitError(this, error) })
      }).catch(() => {})
    }
  },
  computed: {
    ...mapGetters('auth', [
      'USER_DETAIL'
    ])
  },
  mounted: function () {
    this.$checkAuth(this)
  }
}
</script>
