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
          <q-list link no-border class="no-padding">
            <q-item dense v-close-overlay class="q-pa-xs" @click.native="passwordModal = true">
              <q-item-side left class="text-center" icon="settings" color="primary" />
              <q-item-main>
                <q-item-tile class="q-caption text-weight-bold text-primary text-no-wrap q-mr-md">CHANGE PASSWORD</q-item-tile>
              </q-item-main>
              <!-- <q-item-side right color="primary" icon="keyboard_arrow_right" /> -->
            </q-item>
            <q-item-separator class="no-margin" />
            <q-item dense v-close-overlay class="q-pa-xs" @click.native="logout()">
              <q-item-side left class="text-center" icon="power_off" color="red" />
              <q-item-main>
                <q-item-tile class="q-caption text-weight-bolder text-red text-no-wrap q-mr-md">LOGOUT</q-item-tile>
              </q-item-main>
              <!-- <q-item-side right color="primary" icon="keyboard_arrow_right" /> -->
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
          <q-item-main label="Home" class="q-body-1" />
          <q-item-side icon="chevron_right" style="min-width: 0" />
        </q-item>
        <q-item
          v-show="USER_DETAIL.username === 'sa' || USER_DETAIL.username === 'admin'"
          @click.native="$router.push('/user')"
        >
          <q-item-side icon="account_box" />
          <q-item-main label="User Settings" class="q-body-1" />
          <q-item-side icon="chevron_right" style="min-width: 0" />
        </q-item>
        <q-item
          v-show="USER_DETAIL.username === 'sa' || USER_DETAIL.username === 'admin'"
          @click.native="$router.push('/iuran')"
        >
          <q-item-side icon="assignment_turned_in" />
          <q-item-main label="Settlement Iuran" class="q-body-1" />
          <q-item-side icon="chevron_right" style="min-width: 0" />
        </q-item>
        <q-item
          v-show="USER_DETAIL.username === 'sa' || USER_DETAIL.username === 'admin'"
          @click.native="$router.push('/settle')"
        >
          <q-item-side icon="assignment_return" />
          <q-item-main label="Remove Settlement" class="q-body-1" />
          <q-item-side icon="chevron_right" style="min-width: 0" />
        </q-item>
        <q-item @click.native="$router.push('/record')">
          <q-item-side icon="event_note" />
          <q-item-main label="History Iuran" class="q-body-1" />
          <q-item-side icon="chevron_right" style="min-width: 0" />
        </q-item>
      </q-list>
    </q-layout-drawer>

    <q-modal
      v-model="passwordModal"
      minimized no-esc-dismiss no-backdrop-dismiss
      @show="$refs['layout.oldpass'].focus()"
    >
      <q-modal-layout>
        <q-toolbar slot="header">
          <q-btn
            flat
            round
            dense
            @click="passwordModal = false"
            icon="reply"
            wait-for-ripple
          />
          <q-toolbar-title class="text-italic text-weight-bold">
            <div>Change Password</div>
          </q-toolbar-title>
        </q-toolbar>
        <div class="q-pa-sm meinput">
          <q-input
            ref="layout.oldpass"
            v-model="layout.oldpass"
            float-label="Old Password"
            type="password"
            no-pass-toggle
            lower-case
            :error="$v.layout.oldpass.$error"
          />
          <q-input
            ref="layout.newpass"
            v-model="layout.newpass"
            float-label="New Password"
            type="password"
            no-pass-toggle
            lower-case
            :error="$v.layout.newpass.$error"
          />
          <div class="q-mt-sm text-right">
            <q-btn color="primary" label="change" @click="onChangePass" />
          </div>
        </div>
      </q-modal-layout>
    </q-modal>

    <q-page-container v-if="$auth.ready()">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

import axios from 'axios'
import { required, minLength } from 'vuelidate/lib/validators'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      positionModal: true,
      passwordModal: false,
      layout: {
        oldpass: '',
        newpass: ''
      }
    }
  },
  validations: {
    layout: {
      oldpass: { required },
      newpass: { required, minLength: minLength(8) }
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
    },
    onChangePass () {
      this.$v.layout.$touch()
      if (this.$v.layout.$error) {
        if (!this.$v.layout.oldpass.required) {
          this.$q.notify('Old Password is required.')
          this.$refs['layout.oldpass'].focus()
        } else if (!this.$v.layout.newpass.required) {
          this.$q.notify('New Password is required.')
          this.$refs['layout.newpass'].focus()
        } else if (!this.$v.layout.newpass.minLength) {
          this.$q.notify('Password must have at least 8 characters.')
          this.$refs['layout.newpass'].focus()
        }
        return
      }

      axios.post('changePass', {password: this.layout}).then((response) => {
        this.$traitSuccess(this, response)
        this.passwordModal = false
      }, (error) => { console.log(error); this.$traitError(this, error) })
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
.q-toolbar {
  min-height: 0;
  padding: 5px 8px;
}
</style>
