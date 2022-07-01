import { createStore } from 'vuex'
import type { User } from '@/types'
import { get } from '@/api'

export default createStore({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    user: {} as User,
    token: ''
  },
  getters: {
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    },
    setToken (state, token) {
      console.log('setToken', token)
      state.token = token
    }
  },
  actions: {
    async getCurrentUser ({ state, commit }) {
      if (state.token) {
        const user = await get('rest-auth/user/')
        commit('setUser', user)
        console.log(state.user)
      }
    },
    logout ({ commit }) {
      commit('setUser', {})
      commit('setToken', '')
      // localStorage.setItem('mm.token', '')
    }
  },
  modules: {
  }
})
