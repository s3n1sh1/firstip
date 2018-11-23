<template>
  <q-layout view="lHh Lpr lFf" v-if="this.$store.state.auth.loggedIn">
    <q-layout-header>
      <q-toolbar
        color="primary"
      >
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title class="text-italic text-weight-bold">
          <div>{{APP_DETAIL.Name}}</div>
          <div slot="subtitle">{{$router.currentRoute.name}}</div>
        </q-toolbar-title>

        <q-btn-dropdown flat dense no-caps :label="USER_DETAIL.username">
          <q-list link no-border class="no-padding" >
            <q-item dense v-close-overlay class="q-pa-sm" @click.native="logout()">
              <q-item-side icon="power_off" inverted color="red" />
              <q-item-main>
                <q-item-tile class="q-caption text-weight-bolder text-red text-no-wrap" label>LOGOUT</q-item-tile>
              </q-item-main>
            </q-item>
          </q-list>
        </q-btn-dropdown>

      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >
      <q-list
        no-border
        link
        inset-delimiter
      >
        <q-list-header>Menu List</q-list-header>
        <q-item @click.native="$router.push('/')">
          <q-item-side icon="home" />
          <q-item-main label="Home" sublabel="Welcome Page" />
        </q-item>
        <q-item @click.native="$router.push('/record')">
          <q-item-side icon="event_note" />
          <q-item-main label="Iuran" sublabel="History Iuran" />
        </q-item>
      </q-list>
    </q-layout-drawer>

    <q-page-container v-if="$auth.ready()">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      positionModal: true
    }
  },
  methods: {
    ...mapMutations('auth', [
      'LOGIN_OK', 'LOGOUT_OK'
    ]),
    logout () {
      this.$auth.logout({
        makeRequest: true,
        redirect: '/login',
        success () {
          this.LOGOUT_OK()
        },
        error () {
          console.log('error')
        }
      })
    }
  },
  computed: {
    ...mapGetters('auth', [
      'APP_DETAIL', 'USER_DETAIL'
    ])
  },
  mounted: function () {
    this.$auth.fetch({})
      .then(response => {
        this.LOGIN_OK(response)
      })
  }
}
</script>

<style>
</style>
