// /assess/getaccesslist

import { reqGetAccessNum,reqGetAccessList } from '@/api/access'

const state = {
  accessNum: 0,
  accessList: []
}

const mutations = {
  GETACCESSNUM (state, accessNum) {
    state.accessNum = accessNum
  },
  GETACCESSLIST (state, accessList) {
    state.accessList = accessList
  }
}

const actions = {
  // 获取访客总数接口
  async getAccessNum ({commit}) {
    let result = await reqGetAccessNum()
    if (result.code == 200) {
      commit('GETACCESSNUM', result.data)
      return result.message
    }else {
      return Promise.reject(result.message)
    }
  },
  // 获取访问列表
  async getAccessList ({commit},params) {
    let result = await reqGetAccessList(params)
    if (result.code == 200) {
      commit('GETACCESSLIST', result.data)
      return result.message
    }else {
      return Promise.reject(result.message)
    }
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

