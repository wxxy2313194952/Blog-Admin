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

// 新增文章分类
export function addArticleClass(data) {
  return request({
    url: '/admin/artcate/addarticleclass',
    method: 'post',
    data
  })
}
// 编辑文章分类
export function editArticleClass(data) {
  return request({
    url: '/admin/artcate/editarticleclass',
    method: 'post',
    data
  })
}
// 删除文章分类
export function delArticleClass(data) {
  return request({
    url: '/admin/artcate/delarticleclass',
    method: 'post',
    data
  })
}
// 新增文章标签
export function addArticleTag(data) {
  return request({
    url: '/admin/artcate/addarticletag',
    method: 'post',
    data
  })
}
// 编辑文章标签
export function editArticleTag(data) {
  return request({
    url: '/admin/artcate/editarticletag',
    method: 'post',
    data
  })
}
// 删除文章标签
export function delArticleTag(data) {
  return request({
    url: '/admin/artcate/delarticletag',
    method: 'post',
    data
  })
}
