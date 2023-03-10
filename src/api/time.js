import request from '@/utils/request'

// 获取时间轴列表 分页
export function reqGetTimeList(params) {
  return request({
    url: '/admin/time/gettimelist',
    method: 'get',
    params
  })
}
// 获取时间轴总数
export function reqGetTimeNum() {
  return request({
    url: '/admin/time/gettimenum',
    method: 'get',
  })
}
// 删除时间轴
export function reqDelTime(id) {
  return request({
    url: `/admin/time/deltime/${id}`,
    method: 'get',
  })
}
// 编辑时间轴
export function reqEditTime(params) {
  return request({
    url: `/admin/time/edittime`,
    method: 'post',
    params
  })
}
// 添加时间轴
export function reqaddTime(data) {
  return request({
    url: `/admin/time/addtime`,
    method: 'post',
    data
  })
}