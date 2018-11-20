<template>
  <q-layout>
    <q-page-container>
      <q-page class="mebackground flex flex-center">
        <q-card class="mecard" color="white">
          <q-card-title class="text-center bg-red q-pa-xl">
            <div class="q-display-1 text-italic text-weight-bold">
              {{appName}}
            </div>
          </q-card-title>
          <q-card-separator />
          <q-list class="meinput">
            <q-item>
              <q-item-side>
                <q-item-tile color="primary" icon="face" />
              </q-item-side>
              <q-item-main>
                <q-input
                  v-model="login.tuuser"
                  placeholder="Username"
                  lower-case
                  @keyup.enter="onLogin"
                  :error="$v.login.tuuser.$error"
                />
              </q-item-main>
            </q-item>
            <q-item>
              <q-item-side>
                <q-item-tile color="red" icon="fingerprint" />
              </q-item-side>
              <q-item-main>
                <q-input
                  v-model="login.password"
                  placeholder="Password"
                  type="password"
                  @keyup.enter="onLogin"
                  :error="$v.login.password.$error"
                />
              </q-item-main>
            </q-item>
            <q-item>
              <q-item-main>
                <q-btn rounded label="login" color="primary" class="full-width" @click="onLogin" />
              </q-item-main>
            </q-item>
            <q-item>
              <q-item-main>
                <div class="text-center text-grey q-body-2">© 2018 - Edison TJ</div>
              </q-item-main>
            </q-item>
          </q-list>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>

import { required, alpha } from 'vuelidate/lib/validators'

export default {
  name: 'MyLogin',
  data () {
    return {
      login: {
        tuuser: '',
        password: ''
      },
      appName: 'MY IURAN'
    }
  },
  validations: {
    login: {
      tuuser: { required, alpha },
      password: { required }
    }
  },
  methods: {
    onLogin () {
      this.$v.login.$touch()

      if (this.$v.login.$error) {
        this.$q.notify('Please review fields again.')
        return
      }

      this.$auth.login({
        fetchUser: false,
        data: this.login
      })
        .then(response => {
        }, (error) => this.$q.notify(error))
    }
  }
}
</script>

<style>
</style>
