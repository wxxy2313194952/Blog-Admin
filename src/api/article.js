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