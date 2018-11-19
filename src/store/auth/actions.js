export const login = ({ commit, dispatch }, form) => {
  commit('LOGIN_OK', form)
}
export const logout = ({ commit, dispatch }, form) => {
  commit('LOGOUT_OK', form)
}
