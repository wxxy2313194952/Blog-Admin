import request from '@/utils/request'

// export const reqLogin = data => request({
//   url: '/admin/user/login',
//   method: 'post',
//   data
// })


export function reqLogin(data) {
  return request({
    url: '/admin/user/login',
    method: 'post',
    data
  })
}

export function reqGetInfo(token) {
  return request({
    url: '/admin/user/getinfo',
    method: 'get',
    // params: { token }
  })
}

export function reqLogout() {
  return request({
    url: '/admin/user/logout',
    method: 'post'
  })
}
