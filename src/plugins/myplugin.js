// import something here

// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
  Vue.prototype.$encryptParam = function (obj) {
    var CryptoJS = require('crypto-js')

    var plaintext = JSON.stringify(obj)
    var iv = CryptoJS.lib.WordArray.random(16)
    var key = CryptoJS.SHA256(process.env.SECRET)
    var encrypted = CryptoJS.AES.encrypt(plaintext, key, {
      iv: iv
    })
    var data = {
      ciphertext: CryptoJS.enc.Base64.stringify(encrypted.ciphertext),
      iv: CryptoJS.enc.Hex.stringify(iv)
    }

    return data
  }

  Vue.prototype.$displayLoading = function (
    form
    , loadingMessage = ''
    , spinnerType = 'gears'
    , loadingColor = 'white'
  ) {
    form.$q.loading.show({
      spinner: `q-spinner-${spinnerType}`,
      spinnerColor: loadingColor,
      spinnerSize: 80,
      messageColor: loadingColor,
      message: loadingMessage
    })

    // spinners: [
    //   'audio', 'ball', 'bars', 'circles', 'comment',
    //   'cube', 'dots', 'facebook', 'gears', 'grid', 'hearts',
    //   'hourglass', 'infinity', 'ios', 'mat', 'oval',
    //   'pie', 'puff', 'radio', 'rings', 'tail'
    // ]
  }

  Vue.prototype.$traitError = function (
    form, ops
  ) {
    form.$q.loading.hide()

    if (!ops.response) {
      form.$q.notify('Error: Network Error')
      return
    }

    let reason = ''
    switch (ops.response.status) {
      case 401:
        reason = 'Invalid credentials.'
        break
      default:
        reason = ops.response.data.message
    }

    form.$q.notify({
      color: 'negative',
      icon: 'report_problem',
      message: reason,
      position: 'bottom',
      timeout: 3000
    })
  }

  Vue.prototype.$checkAuth = function (
    form
  ) {
    form.$auth.fetch({})
      .then(() => {
        // form.$auth.refresh()
      }, (error) => {
        form.$traitError(form, error)
        form.$store.commit('auth/LOGOUT_OK')
      })
  }
}
