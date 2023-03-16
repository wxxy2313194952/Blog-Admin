import request from '@/utils/request'

// 获取留言列表 分页
export function reqGetReviewList(params) {
  return request({
    url: '/admin/review/getreviewlist',
    method: 'get',
    params
  })
}
// 获取留言总数
export function reqGetReviewNum() {
  return request({
    url: '/admin/review/getreviewnum',
    method: 'get',
  })
}
// 删除留言
export function reqDelReview(params) {
  return request({
    url: `/admin/review/delreview`,
    method: 'get',
    params
  })
}
// 编辑留言
export function reqEditReview(params) {
  return request({
    url: `/admin/review/editreview`,
    method: 'post',
    params
  })
}
