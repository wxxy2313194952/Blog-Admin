import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import article from './modules/article'
import access from './modules/access'
import artcate from './modules/artcate'
import message from './modules/message'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    article,
    access,
    artcate,
    message
  },
  getters
})

export default store
