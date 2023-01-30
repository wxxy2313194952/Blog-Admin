import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  // 登录路由
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  // 404
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  // 跟路由 首页
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '数据展示', icon: 'dashboard' }
    }]
  },
  // 文章编辑
  {
    path: '/article',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Article',
        component: () => import("@/views/article"),
        meta: {
          title: '文章編輯',
          icon: 'el-icon-edit-outline'
        }
      }
    ]
  },
  // 文章管理
  {
    path: '/list',
    component: Layout,
    redirect: '/list/index',
    meta: {
      title: '文章管理',
      icon: 'el-icon-document'
    },
    children: [
      {
        path: 'index',
        name: 'List',
        component: () => import("@/views/list"),
        meta: {
          title: '文章列表', icon: 'el-icon-menu'},
      },
      {
        path: 'articleEdit',
        component: () => import('@/views/list/articleEdit'),
        name: 'ArticleEdit',
        meta: { title: '文章修改', icon: 'el-icon-edit-outline'}
      },
      {
        path: 'articleShow',
        component: () => import('@/views/list/articleShow'),
        name: 'ArticleShow',
        hidden: true
      },
      {
        path: 'articleImage',
        component: () => import('@/views/list/articleImage'),
        name: 'ArticleImage',
        meta: { title: '封面编辑', icon: 'el-icon-picture'}
      },
    ]
  },
  // 留言管理
  {
    path: '/message',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Message',
        component: () => import("@/views/message"),
        meta: {
          title: '留言管理',
          icon: 'el-icon-edit'
        }
      }
    ]
  },
  // 评论管理
  {
    path: '/discuss',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Discuss',
        component: () => import("@/views/discuss"),
        meta: {
          title: '评论管理',
          icon: 'el-icon-chat-dot-round'
        }
      }
    ]
  },
  // 分类管理
  {
    path: '/classification',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Classification',
        component: () => import("@/views/classification"),
        meta: {
          title: '分类管理',
          icon: 'el-icon-discount'
        }
      }
    ]
  },
  // 时间轴管理
  {
    path: '/time',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Time',
        component: () => import("@/views/time"),
        meta: {
          title: '时间轴管理',
          icon: 'el-icon-collection-tag'
        }
      }
    ]
  },
/** {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: { title: 'menu2' }
      }
    ]
  },*/

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
