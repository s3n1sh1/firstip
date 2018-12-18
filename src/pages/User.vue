<template>
  <q-page class="flex flex-center">
    <myGrid ref="user.grid"
      :columnsty="columns" :routesty="'loadUser'" :buttonty="'aed'"
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
            <div>{{this.mode === '1' ? 'Add' : 'Update'}} User</div>
          </q-toolbar-title>
        </q-toolbar>
        <div class="q-pa-md meinput">
          <q-input
            ref="user.tuuser"
            v-model="user.tuuser"
            float-label="Username"
            lower-case
            :readonly="readonly"
            :error="$v.user.tuuser.$error"
          />
          <q-input
            ref="user.tuname"
            v-model="user.tuname"
            float-label="Name"
            :error="$v.user.tuname.$error"
          />
          <q-datetime
            ref="user.tumont"
            class="q-caption q-mt-sm"
            inverted
            format="MMM YYYY"
            v-model="user.tumont"
            float-label="Periode Masuk"
            :readonly="readonly"
            :error="$v.user.tumont.$error"
          />
          <q-input
            ref="user.tupass"
            v-model="user.tupass"
            float-label="Password"
            type="password"
            no-pass-toggle
            lower-case
            :readonly="readonly"
            :error="$v.user.tupass.$error"
          />
          <q-input
            ref="user.tupass_confirmation"
            v-model="user.tupass_confirmation"
            float-label="Confirm Password"
            type="password"
            no-pass-toggle
            lower-case
            :readonly="readonly"
            :error="$v.user.tupass_confirmation.$error"
          />
          <q-input
            ref="user.tuiran"
            type="number"
            align="right"
            :decimals="2"
            prefix="Rp."
            numeric-keyboard-toggle
            min="0"
            v-model="user.tuiran"
            float-label="Iuran"
            :error="$v.user.tuiran.$error"
          />
          <div class="q-mt-sm text-right">
            <q-btn color="amber" label="reset pass" class="q-mr-xs" @click="onReset" />
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
import { required, sameAs, minLength } from 'vuelidate/lib/validators'
import myGrid from '../components/myGrid'

export default {
  name: 'PageUser',
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
        { name: 'tuiran', label: 'Iuran', field: 'tuiran', align: 'right' }
      ],
      opened: false,
      user: {
        tuuserid: '',
        tuuser: '',
        tuname: '',
        tupass: '',
        tupass_confirmation: '',
        tumont: '',
        tuiran: 0
      },
      readonly: false,
      mode: ''
    }
  },
  validations: {
    user: {
      tuuser: { required },
      tuname: { required },
      tupass: { required, minLength: minLength(8) },
      tupass_confirmation: { required, sameAsPassword: sameAs('tupass') },
      tumont: { required },
      tuiran: { required }
    }
  },
  methods: {
    openModal (data) {
      this.mode = data.mode
      if (this.mode === '1') {
        this.readonly = false
        for (let child in this.user) {
          this.user[child] = child === 'tuiran' ? 0 : ''
          this.$v.user.$reset()
        }
      } else {
        this.readonly = true
        for (let child in this.user) {
          if (child === 'tupass' || child === 'tupass_confirmation') {
            this.user[child] = 'xxxxxxxx'
          } else if (child === 'tumont') {
            this.user[child] = this.$monthToDate(data.row[child])
          } else {
            this.user[child] = data.row[child]
          }
          this.$v.user.$reset()
        }
      }
      this.opened = true
    },
    modalOpened () {
      if (this.mode === '1') {
        this.$refs['user.tuuser'].focus()
      } else {
        this.$refs['user.tuname'].focus()
      }
    },
    onSave () {
      if (this.mode !== '3') {
        this.$v.user.$touch()
        if (this.$v.user.$error) {
          if (!this.$v.user.tuuser.required) {
            this.$q.notify('Username is required.')
            this.$refs['user.tuuser'].focus()
          } else if (!this.$v.user.tuname.required) {
            this.$q.notify('Name is required.')
            this.$refs['user.tuname'].focus()
          } else if (!this.$v.user.tupass.required) {
            this.$q.notify('Password is required.')
            this.$refs['user.tupass'].focus()
          } else if (!this.$v.user.tupass.minLength) {
            this.$q.notify('Password must have at least 8 characters.')
            this.$refs['user.tupass'].focus()
          } else if (!this.$v.user.tupass_confirmation.required) {
            this.$q.notify('Confirm Password is required.')
            this.$refs['user.tupass_confirmation'].focus()
          } else if (!this.$v.user.tupass_confirmation.sameAsPassword) {
            this.$q.notify('Password must be Identical.')
            this.$refs['user.tupass_confirmation'].focus()
          } else if (!this.$v.user.tumont.required) {
            this.$q.notify('Periode Masuk is required.')
          } else if (!this.$v.user.tuiran.required) {
            this.$q.notify('Iuran is required.')
            this.$refs['user.tuiran'].focus()
          }
          return
        }
      }

      axios.post('saveUser', {user: this.user, mode: this.mode}).then((response) => {
        this.$traitSuccess(this, response)
        this.opened = false
        this.$refs['user.grid'].loading = true
        axios.get('loadUser').then((response) => {
          this.$refs['user.grid'].tableData = response.data.data
          this.$refs['user.grid'].loading = false
        })
      }, (error) => { this.$traitError(this, error) })
    },
    onDelete (row) {
      this.mode = '3'
      this.user.tuuserid = row.tuuserid
      this.$q.dialog({
        title: 'Delete',
        message: 'Are you sure you want to delete these data?',
        ok: 'Agree',
        cancel: 'Disagree'
      }).then(() => {
        this.$displayLoading(this)
        this.onSave()
      }).catch(() => {})
    },
    onReset () {
      this.$q.dialog({
        title: 'Reset',
        message: 'Are you sure you want to reset this user password?',
        ok: 'Agree',
        cancel: 'Disagree'
      }).then(() => {
        this.$displayLoading(this)
        axios.post('resetPass', {user: this.user}).then((response) => {
          this.$traitSuccess(this, response)
        }, (error) => { this.$traitError(this, error) })
      }).catch(() => {})
    }
  },
  mounted: function () {
    this.$checkAuth(this)
  }
}
</script>
