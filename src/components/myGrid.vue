<template>
  <div class="full-width">
    <q-window-resize-observable @resize="onResize"/>
    <q-table
      :data="tableData"
      :columns="columnsty"
      :row-key="keysty"
      :table-style="tblheight"
      :filter="filter"
      :pagination.sync="paginationControl"
      :loading="loading"
      separator="horizontal"
      :selection="selectionty"
      :selected.sync="multiSelected"
    >
      <div slot="top-left" slot-scope="props" class="row q-ml-sm" style="padding: 0">
        <q-search
          v-show="showsearch"
          hide-underline
          v-model="filter"
          class="q-caption"
          color="white"
          inverted-light
        />
        <slot name="toolleft" />
      </div>
      <div slot="top-right" slot-scope="props" class="row" style="padding: 0">
        <q-btn v-show="buttonty.includes('a')" icon="add" dense color="primary" class="q-mr-sm"
          @click="$emit('addEvent', {mode: '1'})"
        />
        <q-btn v-show="buttonty.includes('c')" icon="done_outline" dense color="primary" class="q-mr-sm"
          @click="$emit('confirmEvent', multiSelected)"
        />
        <slot name="toolright" class="q-mr-sm" />
      </div>

      <q-tr slot="header" slot-scope="props">
        <q-th auto-width v-show="selectionty != 'none'">
          <q-checkbox
            v-if="props.multipleSelect"
            v-model="props.selected"
            indeterminate-value="some"
          />
        </q-th>
        <q-th v-for="col in props.cols" :key="col.name" :props="props">
          {{ col.label }}
        </q-th>
      </q-tr>

      <q-tr slot="body" slot-scope="props" :props="props" >
        <q-td v-show="selectionty != 'none'">
          <q-checkbox v-model="props.selected" />
        </q-td>
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
        <q-td v-show="statusty.field" auto-width key="status" :class="getColor(props.row[statusty.field])">
          <div class="text-weight-bold text-center text-white q-caption">
            {{props.row[statusty.field] === null ? statusty.messageno : statusty.messageyes}}
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
    keysty: { type: String },
    columnsty: { type: Array },
    routesty: { type: String },
    paramsty: { type: Object },
    buttonty: { default: '', type: String },
    selectionty: { default: 'none', type: String },
    statusty: {
      type: Object,
      default: () => ({
        field: '',
        message: ''
      })
    },
    showsearch: { default: true, type: Boolean }
  },
  data () {
    return {
      tblheight: '',
      tableData: [],
      filter: '',
      paginationControl: { rowsPerPage: 15, page: 1 },
      loading: false,
      multiSelected: []
    }
  },
  methods: {
    onResize (size) {
      let value = this.$q.platform.is.mobile ? 143 : 148
      this.tblheight = 'height: ' + (size.height - value).toString() + 'px'
    },
    getColor (field) {
      let color = field === null ? 'red' : 'positive'
      return `bg-${color}`
    }
  },
  mounted: function () {
    this.loading = true
    this.$axios.get(this.$axios.defaults.baseURL + this.routesty, {params: this.paramsty}).then((response) => {
      this.tableData = response.data.data
      this.loading = false
    })
  }
}
</script>
