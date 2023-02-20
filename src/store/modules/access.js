// /assess/getaccesslist
// import Axios from 'axios'
import { reqGetAccessNum,reqGetAccessList } from '@/api/access'

const state = {
  city: '',
  accessNum: 0,
  accessList: []
}

const mutations = {
  GETCITY (state, city) {
    state.city = city
  },
  GETACCESSNUM (state, accessNum) {
    state.accessNum = accessNum
  },
  GETACCESSLIST (state, accessList) {
    state.accessList = accessList
  }
}

const actions = {
  //
  // async getCity ({commit}) {
  //   let result = await Axios.get('https://restapi.amap.com/v3/ip?key=3451452303fb16375647a3ca4b147578')
  //   // console.log(result)
  //   if (result.status == 200) {
  //     commit('GETCITY', result.data.city)
  //     return result.data.info
  //   }else {
  //     return Promise.reject(result.data.info)
  //   }
  // },
  async getCity ({commit},city) {
    commit('GETCITY', city) 
    },
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

