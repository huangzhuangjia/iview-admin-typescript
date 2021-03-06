import Vuex, { ActionTree, MutationTree } from 'vuex'
import API from '@/api/server'
import { success, error } from '../../config/response'

interface IState {
  login: boolean,
  token: string,
  userInfo: StoreState.User
}

const state: IState = {
  login: false,
  token: '',
  userInfo: {
    _id: '',
    username: '',
    gravatar: ''
  }
}

const actions: ActionTree<IState, any>  = {
  async handleLogin (
    {commit},
    data: StoreState.Login
  ): Promise<Ajax.AjaxResponse> {
    const res: Ajax.AjaxResponse = await API.User.handleLogin(data)
    if (res && res.code === 1) {
      commit('USRE_LOGIN', res.result.token)
      window.localStorage.setItem('TOKEN', JSON.stringify(res.result))
      success('登录成功')
    } else {
      error(res.message)
    }
    return res
  },

  async getUserInfo (
    {commit}
  ): Promise<Ajax.AjaxResponse> {
    const res: Ajax.AjaxResponse = await API.User.getUserInfo()
    if (res && res.code === 1) {
      commit('GET_USER_INFO', res.result)
    }
    return res
  },

  async handleLogOut (
    {commit}
  ): Promise<Ajax.AjaxResponse> {
    const res: Ajax.AjaxResponse = await API.User.handleLogout()
    if (res && res.code === 1) {
      commit('USRE_LOGOUT')
      window.localStorage.removeItem('TOKEN')
      success('退出成功')
    }
    return res
  }
}

const mutations: MutationTree<IState>  = {
  'GET_USER_INFO' (state: IState, user): void {
    state.login = true
    state.userInfo = user
  },
  'USRE_LOGOUT' (state: IState, user) {
    state.login = false
  },
  'USRE_LOGIN' (state: IState, token) {
    state.token = token
  }
}
export default {
  state,
  mutations,
  actions
}
