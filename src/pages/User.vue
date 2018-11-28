<template>
  <q-page class="flex flex-center">
    <myGrid ref="user.grid" :columnsty="columns" :routesty="'loadUser'" @addEvent="openModal" />

    <q-modal v-model="opened" minimized no-esc-dismiss no-backdrop-dismiss>
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
            <div>Add User</div>
          </q-toolbar-title>
        </q-toolbar>
        <div class="q-pa-md meinput">
          <q-input
            ref="user.tuuser"
            v-model="user.tuuser"
            float-label="Username"
            lower-case
            :error="$v.user.tuuser.$error"
          />
          <q-input
            ref="user.tuname"
            v-model="user.tuname"
            float-label="Name"
            :error="$v.user.tuname.$error"
          />
          <q-input
            ref="user.tupass"
            v-model="user.tupass"
            float-label="Password"
            type="password"
            lower-case
            :error="$v.user.tupass.$error"
          />
          <q-input
            ref="user.tuiran"
            type="number"
            :decimals="2"
            prefix="$"
            numeric-keyboard-toggle
            min="0"
            v-model="user.tuiran"
            float-label="Iuran"
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
        tuuser: '',
        tuname: '',
        tupass: '',
        tuiran: 0
      }
    }
  },
  validations: {
    user: {
      tuuser: { required },
      tuname: { required },
      tupass: { required }
    }
  },
  methods: {
    openModal () {
      this.opened = true
    },
    onSave () {
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
        }
        return
      }

      console.log(this.user)

      this.$displayLoading(this)
      axios.post('saveUser', this.user).then((response) => {
        this.$q.loading.hide()
        this.opened = false
        console.log('masuk sini donk')
      }, (error) => { this.$traitError(this, error) })
    }
  },
  mounted: function () {
    this.$checkAuth(this)
  }
}
</script>
