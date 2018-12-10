<template>
  <q-page class="flex flex-center">
    <myGrid ref="record.grid" keysty="tiuserid"
      :columnsty="columns" :routesty="'loadIuran'"
      :paramsty="{date: date}"
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

import myGrid from '../components/myGrid'

const today = new Date()

export default {
  name: 'PageRecord',
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
      this.$refs['record.date'].hide()
    }
  },
  mounted: function () {
    this.$checkAuth(this)
  }
}
</script>
