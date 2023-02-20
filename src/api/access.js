import request from '@/utils/request'
import Access from "@/utils/getAccessInfo";
// 添加访问记录
export function accessLeave ({message,city}) {
  return request({
    url: '/admin/access/setaccess',
    method: 'post',
    data: {
      platform_type: Access.getPlatformType(),
      os_name: Access.getOSName(),
      browser: Access.getBrowserName(),
      OSVersion: Access.getOSVersion(),
      BrowserVersion: Access.getBrowserVersion(),
      city,
      show_type: message
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






