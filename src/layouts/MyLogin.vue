<template>
  <q-layout>
    <q-page-container>
      <q-page class="mebackground flex flex-center">
        <q-card class="mecard" color="white">
          <q-card-title class="text-center bg-red q-pa-xl">
            <div class="q-display-1 text-italic text-weight-bold">
              {{APP_DETAIL.Name}}
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
                  ref="login.tuuser"
                  v-model="login.tuuser"
                  placeholder="Username"
                  lower-case
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
                  ref="login.password"
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
                <div class="text-center text-grey q-body-2">{{'© '+ currentYear +' - '+ APP_DETAIL.Author}}</div>
              </q-item-main>
            </q-item>
          </q-list>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>

import { required } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'
import { date } from 'quasar'

export default {
  name: 'MyLogin',
  data () {
    return {
      login: {
        tuuser: '',
        password: ''
      }
    }
  },
  validations: {
    login: {
      tuuser: { required },
      password: { required }
    }
  },
  methods: {
    onLogin () {
      this.$v.login.$touch()

      if (this.$v.login.$error) {
        if (!this.$v.login.tuuser.required) {
          this.$q.notify('Username is required.')
          this.$refs['login.tuuser'].focus()
        } else if (!this.$v.login.password.required) {
          this.$q.notify('Password is required.')
          this.$refs['login.password'].focus()
        }
        return
      }

      this.$displayLoading(this)
      this.$auth.login({
        fetchUser: false,
        data: this.login,
        success () {
          this.$q.loading.hide()
        },
        error (res) {
          this.$traitError(this, res)
        }
      })
    }
  },
  computed: {
    ...mapGetters('auth', [
      'APP_DETAIL'
    ]),
    currentYear () {
      let timeStamp = Date.now()
      let year = date.formatDate(timeStamp, 'YYYY')
      return year
    }
  }
}
</script>

<style>
</style>
