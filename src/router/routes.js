
const routes = [

  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/login.vue') }
    ]
  },
  {
    path: '/sales',
    component: () => import('layouts/UserLayout.vue'),
    children: [
      { path: '/sales/user', component: () => import('pages/dashboard.vue'),  meta: { requiresAuth: true } },
      { path: '/sales/customer', component: () => import('pages/listCustomer.vue') ,  meta: { requiresAuth: true } },
      { path: '/sales/order', component: () => import('pages/order.vue') ,  meta: { requiresAuth: true } },
      { path: '/sales/quotation', component: () => import('pages/quo.vue'),  meta: { requiresAuth: true } },
      { path: '/sales/oti', component: () => import('pages/oti.vue'),  meta: { requiresAuth: true } },
      { path: '/sales/mo', component: () => import('pages/mo.vue'),  meta: { requiresAuth: true } },
      { path: '/sales/molist', component: () => import('pages/molist.vue') ,  meta: { requiresAuth: true }},
      // { path: '/quolist', component: () => import('pages/quolist.vue') },
      { path: '/sales/report', component: () => import('pages/report.vue') ,  meta: { requiresAuth: true }},
      { path: '/sales/otipic', component: () => import('pages/otipic.vue') ,  meta: { requiresAuth: true }},
      { path: '/sales/test', component: () => import('pages/test.vue') ,  meta: { requiresAuth: true }},
    ]

  },
  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { path: '/admin/dashboard', component: () => import('pages/dashboard.vue') },
      { path: '/admin/customer', component: () => import('pages/admin/listCoustumer.vue') },
      { path: '/admin/sosmed', component: () => import('pages/admin/listSosmed.vue') },
      { path: '/admin/mitra', component: () => import('pages/admin/listMitra.vue') },
      { path: '/admin/network', component: () => import('pages/admin/listNetwork.vue') },
      { path: '/admin/user', component: () => import('pages/admin/listUser.vue') },
    ]
  },
 

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
