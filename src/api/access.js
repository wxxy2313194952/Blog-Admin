import request from '@/utils/request'
import Access from "@/utils/getAccessInfo"
import { getCity } from "@/utils/city.js"
// 添加访问记录
export function accessLeave (data) {
  return request({
    url: '/admin/access/setaccess',
    method: 'post',
    data: {
      platform_type: Access.getPlatformType(),
      os_name: Access.getOSName(),
      browser: Access.getBrowserName(),
      OSVersion: Access.getOSVersion(),
      BrowserVersion: Access.getBrowserVersion(),
      city: getCity(),
      show_type: data.message,
      user_behavior: data.user_behavior,
      user_menu: data.user_menu
    }
  })
}

/************************************************/

// 获取访客记录列表 分页
export function reqGetAccessList(params) {
  return request({
    url: '/admin/access/getaccesslist',
    method: 'get',
    params
  })
}
// 获取访客记录总数
export function reqGetAccessNum() {
  return request({
    url: '/admin/access/getaccessnum',
    method: 'get'
  })
}
// 删除访问记录
export function reqDelAccess(id) {
  return request({
    url: `/admin/access/delaccess/${id}`,
    method: 'get'
  })
}

// 获取前七天访问量 折线图
export function reqGetLineCharts(day) {
  return request({
    url: '/admin/echarts/getlinecharts',
    method: 'get',
    params: {day}
  })
}

// 获取前七天日期
export function reqGetLastweek(day) {
  return request({
    url: '/admin/echarts/getlastweek',
    method: 'get',
    params: {day}
  })
}

// 饼图统计 用户行为
export function reqGetPieBehavior(day) {
  return request({
    url: '/admin/echarts/getpiebehavior',
    method: 'get',
    params: {day}
  })
}

// 饼图统计 用户菜单点击
export function reqGetPieMenu(day) {
  return request({
    url: '/admin/echarts/getpiemenu',
    method: 'get',
    params: {day}
  })
}

// 饼图统计 访问浏览器占比
export function reqGetPieBowser(day) {
  return request({
    url: '/admin/echarts/getpiebowser',
    method: 'get',
    params: {day}
  })
}

// 饼图统计 访问操作系统占比
export function reqGetPieOS(day) {
  return request({
    url: '/admin/echarts/getpieos',
    method: 'get',
    params: {day}
  })
}

// 文章浏览量排名
export function reqGetArtLookRanking() {
  return request({
    url: '/admin/echarts/getartlookranking',
    method: 'get'
  })
}

// 文章评论排名
export function reqGetArtMessRanking() {
  return request({
    url: '/admin/echarts/getartmessranking',
    method: 'get'
  })
}


