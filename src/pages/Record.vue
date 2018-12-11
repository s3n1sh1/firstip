<template>
  <q-page class="flex flex-center">
    <myGrid ref="record.grid" keysty="mnth"
      :columnsty="columns" :routesty="'loadRecord'"
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
          name: 'mnth',
          required: true,
          label: 'Month',
          align: 'left',
          field: 'mnth',
          sortable: true
        }
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
