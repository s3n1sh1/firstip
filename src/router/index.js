import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './../store/index'
import { sync } from 'vuex-router-sync'
import routes from './routes'

Vue.use(VueRouter)

Vue.router = new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes,

  // Leave these as is and change from quasar.conf.js instead!
  // quasar.conf.js -> build -> vueRouterMode
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.VUE_ROUTER_BASE
})

// Sync Vuex and vue-router
sync(store, Vue.router)

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
Vue.axios.defaults.baseURL = 'http://localhost:8099/firstdb/api/'
// Vue.axios.defaults.baseURL = 'http://localhost:8033/api/'

import auth from '@websanova/vue-auth'

Vue.use(auth, {
  auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
  http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
  rolesVar: 'role'
})

// Vue.axios.interceptors.request.use(function (config) {
//   config.headers['Authorization'] = 'Bearer no_token'
//   var token = localStorage.getItem('default_auth_token')
//   if (token) {
//     config.headers['Authorization'] = 'Bearer ' + token
//   }
//   return config
// }, function (error) {
//   return Promise.reject(error)
// })

// Vue.axios.interceptors.response.use(
//   (response) => {
//     console.log('intercept success')
//     return response
//   }, (error) => {
//     if (error.response.status === 401) {
//       console.log(error.response.status)
//     }
//     return Promise.reject(error)
//   }
// )

// export default Router
export default Vue.router
