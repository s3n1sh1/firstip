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
                <q-input v-model="username" placeholder="Username" lower-case />
              </q-item-main>
            </q-item>
            <q-item>
              <q-item-side>
                <q-item-tile color="red" icon="fingerprint" />
              </q-item-side>
              <q-item-main>
                <q-input v-model="password" placeholder="Password" type="password" />
              </q-item-main>
            </q-item>
            <q-item>
              <q-item-main>
                <q-btn rounded label="login" color="primary" class="full-width" />
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
import { openURL } from 'quasar'

export default {
  name: 'MyLogin',
  data () {
    return {
      username: '',
      password: '',
      appName: 'MY IURAN'
    }
  },
  methods: {
    openURL
  }
}
</script>

<style>
</style>
