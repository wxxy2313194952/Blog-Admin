import {
  reqGetAccessNum,
  reqGetAccessList,
  reqGetLineCharts,
  reqGetLastweek,
  reqGetPieBehavior,
  reqGetPieMenu,
  reqGetPieBowser,
  reqGetPieOS,
  reqGetArtLookRanking,
  reqGetArtMessRanking
} from '@/api/access'

const state = {
  accessNum: 0,
  accessList: [],
  lineCharts: [],
  lastWeek: [],
  behavior: [],
  menu: [],
  bowser: [],
  os: [],
  lookRanking: {},
  messRanking: {}
}

const mutations = {
  GETACCESSNUM (state, accessNum) {
    state.accessNum = accessNum
  },
  GETACCESSLIST (state, accessList) {
    state.accessList = accessList
  },
  GETLINECHARTS (state, lineCharts) {
    state.lineCharts = lineCharts
  },
  GETLASTWEEK (state, lastWeek) {
    state.lastWeek = lastWeek
  },
  GETPIEBEHAVIOR (state, behavior) {
    state.behavior = behavior
  },
  GETPIEMENU (state, menu) {
    state.menu = menu
  },
  GETPIEBOWSER (state, bowser) {
    state.bowser = bowser
  },
  GETPIEOS (state, os) {
    state.os = os
  },
  GETBARLOOKRANKING (state, lookRanking) {
    state.lookRanking = lookRanking
  },
  GETBARMESSRANKING (state, messRanking) {
    state.messRanking = messRanking
  },
}

const actions = {
  // 获取访客总数接口
  async getAccessNum ({ commit }) {
    let result = await reqGetAccessNum()
    if (result.code == 200) {
      commit('GETACCESSNUM', result.data)
      return result.message
    } else {
      return Promise.reject(result.message)
    }
  },
  // 获取访问列表
  async getAccessList ({ commit }, params) {
    let result = await reqGetAccessList(params)
    if (result.code == 200) {
      commit('GETACCESSLIST', result.data)
      return result.message
    } else {
      return Promise.reject(result.message)
    }
  },
  // 折线图
  async getLineCharts ({ commit }, day) {
    let result = await reqGetLineCharts(day)
    if (result.code == 200) {
      commit('GETLINECHARTS', result.data)
      return result.message
    } else {
      return Promise.reject(result.message)
    }
  },
  // 前n天日期
  async getLastweek ({ commit }, day) {
    let result = await reqGetLastweek(day)
    if (result.code == 200) {
      commit('GETLASTWEEK', result.data)
      return result.message
    } else {
      return Promise.reject(result.message)
    }
  },
  // 饼图统计 用户行为
  async getPieBehavior ({ commit }, day) {
    let result = await reqGetPieBehavior(day)
    if (result.code == 200) {
      commit('GETPIEBEHAVIOR', result.data)
      return result.message
    } else {
      return Promise.reject(result.message)
    }
  },
  // 饼图统计 用户菜单点击
  async getPieMenu ({ commit }, day) {
    let result = await reqGetPieMenu(day)
    if (result.code == 200) {
      commit('GETPIEMENU', result.data)
      return result.message
    } else {
      return Promise.reject(result.message)
    }
  },
  // 饼图统计 访问浏览器占比
  async getPieBowser ({ commit }, day) {
    let result = await reqGetPieBowser(day)
    if (result.code == 200) {
      commit('GETPIEBOWSER', result.data)
      return result.message
    } else {
      return Promise.reject(result.message)
    }
  },
  // 饼图统计 访问操作系统占比
  async getPieOS ({ commit }, day) {
    let result = await reqGetPieOS(day)
    if (result.code == 200) {
      commit('GETPIEOS', result.data)
      return result.message
    } else {
      return Promise.reject(result.message)
    }
  },
  // 文章浏览量排名
  async getBarLookRanking ({ commit }) {
    let result = await reqGetArtLookRanking()
    if (result.code == 200) {
      commit('GETBARLOOKRANKING', result.data)
      return result.message
    } else {
      return Promise.reject(result.message)
    }
  },
  // 文章评论排名
  async getBarMessRanking ({ commit }) {
    let result = await reqGetArtMessRanking()
    if (result.code == 200) {
      commit('GETBARMESSRANKING', result.data)
      return result.message
    } else {
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

