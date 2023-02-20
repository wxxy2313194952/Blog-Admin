import request from '@/utils/request'

// 获取文章分类
// export function reqAddMessage() {
//   return request({
//     url: '/admin/artcate/getarticleclass',
//     method: 'get'
//   })
// }

// 获取留言列表 分页
export function reqGetMessageList(params) {
  return request({
    url: '/admin/message/getmessagelist',
    method: 'get',
    params
  })
}
// 获取留言总数
export function reqGetMessageNum() {
  return request({
    url: '/admin/message/getmessagenum',
    method: 'get',
  })
}
// 删除留言
export function reqDelMessage(id) {
  return request({
    url: `/admin/message/delmessage/${id}`,
    method: 'get',
  })
}
// 编辑留言
export function reqEditMessage(params) {
  return request({
    url: `/admin/message/editmessage`,
    method: 'post',
    params
  })
}
