const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/login.vue") }],
  },
  {
    path: "/sales",
    component: () => import("layouts/UserLayout.vue"),
    children: [
      {
        path: "/sales/user",
        component: () => import("pages/sales/dashboard.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/sales/customer",
        component: () => import("pages/sales/listCustomer.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/sales/order",
        component: () => import("pages/sales/order.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/sales/quotation",
        component: () => import("pages/sales/quo.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/sales/oti",
        component: () => import("pages/sales/oti.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/sales/mo",
        component: () => import("pages/sales/mo.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/sales/molist",
        component: () => import("pages/sales/molist.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/sales/order-list",
        component: () => import("pages/sales/orderList.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/sales/report",
        component: () => import("pages/sales/report.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/sales/otipic",
        component: () => import("pages/sales/otipic.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/sales/test",
        component: () => import("pages/test.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "/admin",
    component: () => import("layouts/AdminLayout.vue"),
    children: [
      // { path: '/admin/dashboard', component: () => import('pages/admin/dashboard.vue') },
      {
        path: "/admin/customer",
        component: () => import("pages/admin/listCoustumer.vue"),
         meta: { requiresAuth: true },
      },
      {
        path: "/admin/mitra",
        component: () => import("pages/admin/listMitra.vue"),
         meta: { requiresAuth: true },
      },
      {
        path: "/admin/user",
        component: () => import("pages/admin/listUser.vue"),
         meta: { requiresAuth: true },
      },
      {
        path: "/admin/report",
        component: () => import("pages/admin/report.vue"),
         meta: { requiresAuth: true },
      },
      {
        path: "/admin/rate-card/artikel",
        component: () => import("pages/admin/rateArtikel.vue"),
         meta: { requiresAuth: true },
      },
      {
        path: "/admin/rate-card/sosmed",
        component: () => import("pages/admin/rateSosmed.vue"),
         meta: { requiresAuth: true },
      },
      {
        path: "/admin/rate-card/other-content",
        component: () => import("pages/admin/rateOtherContent.vue"),
         meta: { requiresAuth: true },
      },
      {
        path: "/admin/rate-card/ads-cpd",
        component: () => import("pages/admin/rateCPD.vue"),
         meta: { requiresAuth: true },
      },
      {
        path: "/admin/rate-card/ads-cpm",
        component: () => import("pages/admin/rateCPM.vue"),
         meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "/manager",
    component: () => import("layouts/ManagerLayout.vue"),
    children: [
    
      {
        path: "/manager/customer",
        component: () => import("pages/admin/listCoustumer.vue"),
         meta: { requiresAuth: true },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;

