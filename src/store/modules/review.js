import { reqGetReviewList,reqGetReviewNum } from '@/api/review'

const state = {
  reviewList: [],
  reviewNum: 0
}

const mutations = {
  GETREVIEWLIST (state, reviewList) {
    state.reviewList = reviewList
  },
  GETREVIEWNUM (state, reviewNum) {
    state.reviewNum = reviewNum
  },
}

const actions = {
  // 获取留言列表  分页
  async getReviewList ({ commit }, params) {
    let result = await reqGetReviewList(params)
    if (result.code == 200) {
      commit('GETREVIEWLIST', result.data)
      return result.message
    }else {
      return Promise.reject(result.message)
    }
  },
  // 获取留言总数
  async getReviewNum ({ commit }) {
    let result = await reqGetReviewNum()
    if (result.code == 200) {
      commit('GETREVIEWNUM', result.data)
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

