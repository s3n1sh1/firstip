<template>
  <div class="full-width">
    <q-window-resize-observable @resize="onResize"/>
    <q-table
      :data="tableData"
      :columns="columnsty"
      :row-key="tableKey"
      :table-style="tblheight"
      :filter="filter"
      :pagination.sync="paginationControl"
      :loading="loading"
      separator="horizontal"
    >
      <div slot="top-left" slot-scope="props" class="row q-ml-sm" style="padding: 0">
        <q-search
          hide-underline
          v-model="filter"
          class="q-caption"
          color="white"
          inverted-light
        />
        <slot />
      </div>
      <div slot="top-right" slot-scope="props" class="row" style="padding: 0">
        <q-btn v-show="buttonty.includes('a')" icon="add" dense color="primary" class="q-mr-xs"
          @click="$emit('addEvent', {mode: '1'})"
        />
        <q-btn v-show="buttonty.includes('c')" icon="check" dense color="primary" class="q-mr-xs"
          @click="$emit('addEvent', {mode: '4'})"
        />
      </div>

      <q-tr slot="body" slot-scope="props" :props="props" >
        <q-td auto-width v-for="col in props.cols" :key="col.name" :props="props">
          {{col.value}}
        </q-td>
        <q-td v-show="buttonty.includes('e') || buttonty.includes('d')" auto-width key="action">
          <div class="text-right">
            <q-btn v-show="buttonty.includes('e')" icon="edit" dense color="primary" class="q-mr-xs"
              @click="$emit('addEvent', {mode: '2', row: props.row})"
            />
            <q-btn v-show="buttonty.includes('d')" icon="delete" dense color="red"
              @click="$emit('deleteEvent', props.row)"
            />
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
    routesty: { type: String },
    paramsty: { type: Object },
    buttonty: { type: String }
  },
  data () {
    return {
      tblheight: '',
      tableKey: '',
      tableData: [],
      filter: '',
      paginationControl: { rowsPerPage: 10, page: 1 },
      loading: false
    }
  },
  methods: {
    onResize (size) {
      let value = this.$q.platform.is.mobile ? 143 : 148
      this.tblheight = 'height: ' + (size.height - value).toString() + 'px'
    }
  },
  mounted: function () {
    this.loading = true
    this.$axios.get(this.$axios.defaults.baseURL + this.routesty, this.paramsty).then((response) => {
      this.tableData = response.data.data
      this.loading = false
    })
  }
}
</script>
