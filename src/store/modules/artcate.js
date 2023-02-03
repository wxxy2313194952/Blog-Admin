import { reqGetArticleClass, reqGetArticleTag } from '@/api/artcate'

const state = {
  artClass: [],
  tags: [],
}

const mutations = {
  GETARTCLASS (state, artClass) {
    state.artClass = artClass
  },
  GETARTTAG (state, tags) {
    state.tags = tags
  },
}

const actions = {
  // 获取文章分类
  async getArtClass ({commit}) {
    let result = await reqGetArticleClass()
    if (result.code == 200) {
      commit('GETARTCLASS', result.data)
      return result.message
    }else {
      return Promise.reject(result.message)
    }
  },
  // 获取标签
  async getArtTag ({ commit }) {
    let result = await reqGetArticleTag()
    if (result.code == 200) {
      commit('GETARTTAG', result.data)
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

