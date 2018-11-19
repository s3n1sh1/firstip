export const LOGIN_OK = (state, data) => {
  state.User.username = data.data.user.tuuser
  state.User.name = data.data.user.tuname
  state.loggedIn = true
}
export const LOGOUT_OK = (state, data) => {
  state.User.username = ''
  state.User.name = ''
  state.loggedIn = false
}
