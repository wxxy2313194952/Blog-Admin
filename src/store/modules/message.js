import { reqGetMessageList,reqGetMessageNum } from '@/api/message'

const state = {
  messageList: [],
  messageNum: 0
}

const mutations = {
  GETMESSAGELIST (state, messageList) {
    state.messageList = messageList
  },
  GETMESSAGENUM (state, messageNum) {
    state.messageNum = messageNum
  },
}

const actions = {
  // 获取留言列表  分页
  async getMessageList ({ commit }, params) {
    let result = await reqGetMessageList(params)
    if (result.code == 200) {
      commit('GETMESSAGELIST', result.data)
      return result.message
    }else {
      return Promise.reject(result.message)
    }
  },
  // 获取留言总数
  async getMessageNum ({ commit }) {
    let result = await reqGetMessageNum()
    if (result.code == 200) {
      commit('GETMESSAGENUM', result.data)
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

