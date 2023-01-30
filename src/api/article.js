import request from '@/utils/request'

// 获取文章分类
export function reqGetArticleClass() {
  return request({
    url: '/admin/artcate/getarticleclass',
    method: 'get'
  })
}
// 获取标签
export function reqGetArticleTag() {
  return request({
    url: '/admin/artcate/getarticletag',
    method: 'get'
  })
}

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




