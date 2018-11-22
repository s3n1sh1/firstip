// import something here

// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
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
    if (!ops.response) return
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
}