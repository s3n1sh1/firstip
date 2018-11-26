<template>
  <div class="full-width">
    <q-window-resize-observable @resize="onResize"/>
    <q-table
      :data="tableData"
      :columns="columnsty"
      :row-key="tableKey"
      :table-style="tblheight"
    >
      <q-tr slot="body" slot-scope="props" :props="props">
        <q-td key="tuuser" :props="props">
          <span class="text-italic">{{ props.row.tuuser }}</span>
          <q-tooltip>I'd like to eat "{{ props.row.tuuser }}"</q-tooltip>
        </q-td>
        <q-td key="xxx" :props="props">
          <span class="text-italic">{{ props.row.xxx }}</span>
          <q-tooltip>I'd like to eat "{{ props.row.xxx }}"</q-tooltip>
        </q-td>
      </q-tr>
    </q-table>
  </div>
</template>

<style>
.q-table-container {
  -webkit-box-shadow: none !important;
  -moz-box-shadow: none !important;
  box-shadow: none !important;
}
</style>

<script>
export default {
  props: {
    columnsty: { type: Array },
    routesty: { type: String }
  },
  data () {
    return {
      tblheight: '',
      tableKey: '',
      tableData: []
    }
  },
  methods: {
    onResize (size) {
      this.tblheight = 'height: ' + (size.height - 100).toString() + 'px'
    }
  },
  mounted: function () {
    this.$axios.get(this.$axios.defaults.baseURL + 'loadUser').then((response) => {
      console.log(response)
      this.tableData = response.data.data
    })
  }
}
</script>
