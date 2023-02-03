import request from '@/utils/request'

// 发布文章
export function reqAddArticle(data) {
  return request({
    url: '/admin/article/add',
    method: 'post',
    data
  })
}

// 获取文章列表  分页
export function reqGetArticleList(params) {
  return request({
    url: '/admin/article/getarticlelist',
    method: 'get',
    params
  })
}

// 获取文章总数
export function reqGetArticleNum() {
  return request({
    url: '/admin/article/getarticlenum',
    method: 'get',
  })
}
// 删除文章
export function reqDelArticle(id) {
  return request({
    url: `/admin/article/delarticle/${id}`,
    method: 'get',
  })
}
// 获取文章详情
export function reqGetArticle(id) {
  return request({
    url: `/admin/article/getarticle/${id}`,
    method: 'get',
  })
}
// 编辑文章
export function reqEditArticle(data) {
  return request({
    url: `/admin/article/editarticle`,
    method: 'post',
    params:data
  })
}





