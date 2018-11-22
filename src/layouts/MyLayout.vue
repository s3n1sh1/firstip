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
          {{APP_DETAIL.Name}}
          <div slot="subtitle">Home</div>
        </q-toolbar-title>

        <q-btn-dropdown flat dense no-caps :label="USER_DETAIL.username">
          <q-list link no-border style="padding: 0">
            <q-item dense v-close-overlay @click.native="logout()">
              <q-item-side icon="power_settings_new" inverted color="red" />
              <q-item-main>
                <q-item-tile class="q-body-1" label>Log Out</q-item-tile>
                <!-- <q-item-tile sublabel>You can sigh</q-item-tile> -->
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
        <q-list-header>Essential Links</q-list-header>
        <q-item @click.native="openURL('http://quasar-framework.org')">
          <q-item-side icon="school" />
          <q-item-main label="Docs" sublabel="quasar-framework.org" />
        </q-item>
        <q-item @click.native="openURL('https://github.com/quasarframework/')">
          <q-item-side icon="code" />
          <q-item-main label="GitHub" sublabel="github.com/quasarframework" />
        </q-item>
        <q-item @click.native="openURL('https://discord.gg/5TDhbDg')">
          <q-item-side icon="chat" />
          <q-item-main label="Discord Chat Channel" sublabel="https://discord.gg/5TDhbDg" />
        </q-item>
        <q-item @click.native="openURL('http://forum.quasar-framework.org')">
          <q-item-side icon="record_voice_over" />
          <q-item-main label="Forum" sublabel="forum.quasar-framework.org" />
        </q-item>
        <q-item @click.native="openURL('https://twitter.com/quasarframework')">
          <q-item-side icon="rss feed" />
          <q-item-main label="Twitter" sublabel="@quasarframework" />
        </q-item>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    ...mapMutations('auth', [
      'LOGIN_OK', 'LOGOUT_OK'
    ]),
    openURL,
    logout () {
      this.$auth.logout({
        makeRequest: true,
        redirect: '/login',
        success () {
          this.LOGOUT_OK()
        },
        error () {
          console.log('error ')
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
