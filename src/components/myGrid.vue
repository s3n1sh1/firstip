<template>
  <div class="full-width">
    <q-window-resize-observable @resize="onResize"/>
    <q-table
      :data="tableData"
      :columns="columnsty"
      :row-key="tableKey"
      :table-style="tblheight"
      separator="horizontal"
    >
      <div slot="top-left" slot-scope="props" class="row bg-white q-ml-sm" style="padding: 0">
        <q-search
          hide-underline
          color="primary"
          v-model="filter"
          class="q-ma-xs q-caption"
        />
      </div>
      <div slot="top-right" slot-scope="props" class="row" style="padding: 0">
        <q-btn icon="add" dense color="primary" class="q-mr-xs" @click="$emit('addEvent', {mode: '1'})" />
      </div>

      <q-tr slot="body" slot-scope="props" :props="props" >
        <q-td auto-width v-for="col in props.cols" :key="col.name" :props="props">
          {{col.value}}
        </q-td>
        <q-td auto-width key="action">
          <div class="text-right">
            <q-btn icon="edit" dense color="primary" class="q-mr-xs" @click="$emit('addEvent', {mode: '2', row: props.row})" />
            <q-btn icon="delete" dense color="red" @click="$emit('deleteEvent', props.row)" />
          </div>
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
.q-table-top {
  min-height: 0;
  padding: 0;
  background-color: lightgrey;
}
.q-table th {
  font-weight: bolder;
  font-style: italic;
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
      tableData: [],
      filter: ''
    }
  },
  methods: {
    onResize (size) {
      let value = this.$q.platform.is.mobile ? 137 : 142
      this.tblheight = 'height: ' + (size.height - value).toString() + 'px'
    }
  },
  mounted: function () {
    this.$axios.get(this.$axios.defaults.baseURL + this.routesty).then((response) => {
      this.tableData = response.data.data
    })
  }
}
</script>
