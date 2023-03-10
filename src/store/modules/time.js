import { reqGetTimeList,reqGetTimeNum } from '@/api/time'

const state = {
  timeList: [],
  timeNum: 0
}

const mutations = {
  GETTIMELIST (state, timeList) {
    state.timeList = timeList
  },
  GETTIMENUM (state, timeNum) {
    state.timeNum = timeNum
  },
}

const actions = {
  // 获取留言列表  分页
  async getTimeList ({ commit }, params) {
    let result = await reqGetTimeList(params)
    if (result.code == 200) {
      commit('GETTIMELIST', result.data)
      return result.message
    }else {
      return Promise.reject(result.message)
    }
  },
  // 获取留言总数
  async getTimeNum ({ commit }) {
    let result = await reqGetTimeNum()
    if (result.code == 200) {
      commit('GETTIMENUM', result.data)
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

