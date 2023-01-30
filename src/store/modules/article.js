import { reqGetArticleClass, reqGetArticleTag, reqGetArticleList,reqGetArticleNum } from '@/api/article'

const state = {
  artClass: [],
  tags: [],
  articleList: [],
  articleNum: 0
}

const mutations = {
  GETARTCLASS (state, artClass) {
    state.artClass = artClass
  },
  GETARTTAG (state, tags) {
    state.tags = tags
  },
  GETARTICLELIST (state, { articleList, articleClass }) {
    articleList.forEach(el => {
      articleClass.forEach(item => {
        if (el.classification == item.id)
          el.classification = item.name
      })
    })
    state.articleList = articleList
  },
  GETARTICLENUM(state, articleNum) {
    state.articleNum = articleNum
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
  // 获取文章列表  分页
  async getArticleList ({ commit }, params) {
    let result1 = await reqGetArticleList(params)
    let result2 = await reqGetArticleClass()
    if (result1.code == 200 && result2.code == 200) {
      commit('GETARTICLELIST', {
        articleList: result1.data,
        articleClass: result2.data
      })
      return result1.message
    }else {
      return Promise.reject(result1.message || result2.message)
    }
  },
  // 获取文章总数
  async getArticleNum ({ commit }) {
    let result = await reqGetArticleNum()
    if (result.code == 200) {
      commit('GETARTICLENUM', result.data)
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

