
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
      { path: '/sales/user', component: () => import('pages/sales/dashboard.vue'),  meta: { requiresAuth: true } },
      { path: '/sales/customer', component: () => import('pages/sales/listCustomer.vue') ,  meta: { requiresAuth: true } },
      { path: '/sales/order', component: () => import('pages/sales/order.vue') ,  meta: { requiresAuth: true } },
      { path: '/sales/quotation', component: () => import('pages/sales/quo.vue'),  meta: { requiresAuth: true } },
      { path: '/sales/oti', component: () => import('pages/sales/oti.vue'),  meta: { requiresAuth: true } },
      { path: '/sales/mo', component: () => import('pages/sales/mo.vue'),  meta: { requiresAuth: true } },
      { path: '/sales/molist', component: () => import('pages/sales/molist.vue') ,  meta: { requiresAuth: true }},
      { path: '/sales/order-list', component: () => import('pages/sales/orderList.vue') ,  meta: { requiresAuth: true }},
      // { path: '/quolist', component: () => import('pages/quolist.vue') },
      { path: '/sales/report', component: () => import('pages/sales/report.vue') ,  meta: { requiresAuth: true }},
      { path: '/sales/otipic', component: () => import('pages/sales/otipic.vue') ,  meta: { requiresAuth: true }},
      { path: '/sales/test', component: () => import('pages/test.vue') ,  meta: { requiresAuth: true }},
    ]

  },
  
  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      // { path: '/admin/dashboard', component: () => import('pages/admin/dashboard.vue') },
      { path: '/admin/customer', component: () => import('pages/admin/listCoustumer.vue') },
      { path: '/admin/sosmed', component: () => import('pages/admin/listSosmed.vue') },
      { path: '/admin/mitra', component: () => import('pages/admin/listMitra.vue') },
      { path: '/admin/network', component: () => import('pages/admin/listNetwork.vue') },
      { path: '/admin/user', component: () => import('pages/admin/listUser.vue') },
      { path: '/admin/report', component: () => import('pages/admin/report.vue') },
      { path: '/admin/rate-card/artikel', component: () => import('pages/admin/rateArtikel.vue') },
      { path: '/admin/rate-card/sosmed', component: () => import('pages/admin/rateSosmed.vue') },
      { path: '/admin/rate-card/other-content', component: () => import('pages/admin/rateOtherContent.vue') },
      { path: '/admin/rate-card/ads-cpd', component: () => import('pages/admin/rateCPD.vue') },
      { path: '/admin/rate-card/ads-cpm', component: () => import('pages/admin/rateCPM.vue') },
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
