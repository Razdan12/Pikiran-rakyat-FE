
const routes = [

  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/login.vue') }
    ]
  },
  {
    path: '/user',
    component: () => import('layouts/UserLayout.vue'),
    children: [
      { path: '/user', component: () => import('pages/dashboard.vue'),  meta: { requiresAuth: true } },
      { path: '/customer', component: () => import('pages/customer.vue') ,  meta: { requiresAuth: true } },
      { path: '/order', component: () => import('pages/order.vue') ,  meta: { requiresAuth: true } },
      { path: '/quotation', component: () => import('pages/quo.vue'),  meta: { requiresAuth: true } },
      { path: '/oti', component: () => import('pages/oti.vue'),  meta: { requiresAuth: true } },
      { path: '/mo', component: () => import('pages/mo.vue'),  meta: { requiresAuth: true } },
      { path: '/molist', component: () => import('pages/molist.vue') ,  meta: { requiresAuth: true }},
      // { path: '/quolist', component: () => import('pages/quolist.vue') },
      { path: '/report', component: () => import('pages/report.vue') ,  meta: { requiresAuth: true }},
      { path: '/otipic', component: () => import('pages/otipic.vue') ,  meta: { requiresAuth: true }},
      { path: '/test', component: () => import('pages/test.vue') ,  meta: { requiresAuth: true }},
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
