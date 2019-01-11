<template>
  <q-page class="flex flex-center">
    <myGrid ref="news.grid"
      :columnsty="columns" :routesty="'loadNews'" :buttonty="'aed'"
      @addEvent="openModal" @deleteEvent="onDelete"
    />

    <q-modal v-model="opened" minimized no-esc-dismiss no-backdrop-dismiss @show="modalOpened">
      <q-modal-layout>
        <q-toolbar slot="header">
          <q-btn
            flat
            round
            dense
            @click="opened = false"
            icon="reply"
            wait-for-ripple
          />
          <q-toolbar-title class="text-italic text-weight-bold">
            <div>{{this.mode === '1' ? 'Add' : 'Update'}} News</div>
          </q-toolbar-title>
        </q-toolbar>
        <div class="q-pa-sm meinput">
          <q-input
            ref="news.tnname"
            v-model="news.tnname"
            float-label="Title"
            :readonly="readonly"
            :error="$v.news.tnname.$error"
          />
          <q-input
            ref="news.tndesc"
            v-model="news.tndesc"
            float-label="Description"
            type="textarea"
            :max-height="200"
            :error="$v.news.tndesc.$error"
          />
          <div class="q-mt-sm text-right">
            <q-btn color="primary" label="save" @click="onSave" />
          </div>
        </div>
      </q-modal-layout>
    </q-modal>
  </q-page>
</template>

<style>
</style>

<script>

import axios from 'axios'
import { required } from 'vuelidate/lib/validators'
import myGrid from '../components/myGrid'

export default {
  name: 'PageNews',
  components: { myGrid },
  data () {
    return {
      columns: [
        {
          name: 'tnname',
          required: true,
          label: 'Title',
          align: 'left',
          field: 'tnname',
          sortable: true
        },
        { name: 'tndesc', label: 'Description', field: 'tndesc', align: 'left' },
        { name: 'tnrgdt', label: 'Date', field: 'tnrgdt', align: 'right', sortable: true }
      ],
      opened: false,
      news: {
        tnnewsid: '',
        tnname: '',
        tndesc: ''
      },
      readonly: false,
      mode: ''
    }
  },
  validations: {
    news: {
      tnname: { required },
      tndesc: { required }
    }
  },
  methods: {
    openModal (data) {
      this.mode = data.mode
      if (this.mode === '1') {
        this.readonly = false
        for (let child in this.news) {
          this.news[child] = ''
        }
      } else {
        this.readonly = true
        for (let child in this.news) {
          this.news[child] = data.row[child]
        }
      }
      this.$v.news.$reset()
      this.opened = true
    },
    modalOpened () {
      if (this.mode === '1') {
        this.$refs['news.tnname'].focus()
      } else {
        this.$refs['news.tndesc'].focus()
      }
    },
    onSave () {
      if (this.mode !== '3') {
        this.$v.news.$touch()
        if (this.$v.news.$error) {
          if (!this.$v.news.tnname.required) {
            this.$q.notify('Title is required.')
            this.$refs['news.tnname'].focus()
          } else if (!this.$v.news.tndesc.required) {
            this.$q.notify('Description is required.')
            this.$refs['news.tndesc'].focus()
          }
          return
        }
      }

      axios.post('saveNews', {news: this.news, mode: this.mode}).then((response) => {
        this.$traitSuccess(this, response)
        this.opened = false
        this.$refs['news.grid'].loading = true
        axios.get('loadNews').then((response) => {
          this.$refs['news.grid'].tableData = response.data.data
          this.$refs['news.grid'].loading = false
        })
      }, (error) => { this.$traitError(this, error) })
    },
    onDelete (row) {
      this.mode = '3'
      this.news.tnnewsid = row.tnnewsid
      this.$q.dialog({
        title: 'Delete',
        message: 'Are you sure you want to delete these data?',
        ok: 'Agree',
        cancel: 'Disagree'
      }).then(() => {
        this.$displayLoading(this)
        this.onSave()
      }).catch(() => {})
    }
  },
  mounted: function () {
    this.$checkAuth(this)
  }
}
</script>
