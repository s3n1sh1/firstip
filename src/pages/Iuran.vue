<template>
  <q-page class="flex flex-center">
    <myGrid ref="iuran.grid" keysty="tiuserid"
      :columnsty="columns" :routesty="'loadIuran'"
      :buttonty="USER_DETAIL.username !== 'admin2' ? 'c' : ''"
      :selectionty="USER_DETAIL.username !== 'admin2' ? 'multiple' : 'none'"
      :paramsty="{date: date}" @confirmEvent="onConfirm"
    >
      <template slot="toolleft">
        <q-datetime
          ref="iuran.date"
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
      today,
      maxdate
    }
  },
  methods: {
    onDateChange () {
      this.$refs['iuran.date'].hide()
      this.$refs['iuran.date'].focused = false
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
