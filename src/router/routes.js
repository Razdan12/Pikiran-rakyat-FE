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
        path: "/manager/user",
        component: () => import("pages/manager/dashboard.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/manager/customer",
        component: () => import("pages/manager/listCustomer.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/manager/order",
        component: () => import("pages/manager/order.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/manager/quotation",
        component: () => import("pages/manager/quo.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/manager/oti",
        component: () => import("pages/manager/oti.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/manager/mo",
        component: () => import("pages/manager/mo.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/manager/molist",
        component: () => import("pages/manager/molist.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/manager/order-list",
        component: () => import("pages/manager/orderList.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/manager/report",
        component: () => import("pages/manager/report.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/manager/otipic",
        component: () => import("pages/manager/otipic.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/manager/test",
        component: () => import("pages/test.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "/vp",
    component: () => import("layouts/VpLayout.vue"),
    children: [
      {
        path: "/vp/quotation",
        component: () => import("pages/vp/quo.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/vp/order-list",
        component: () => import("pages/vp/orderList.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/vp/oti",
        component: () => import("pages/vp/oti.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/vp/mo",
        component: () => import("pages/vp/mo.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/vp/report",
        component: () => import("pages/vp/report.vue"),
        meta: { requiresAuth: true },
      },
     
    ],
  },
  {
    path: "/prod",
    component: () => import("layouts/ProdLayout.vue"),
    children: [
      {
        path: "/prod/quotation",
        component: () => import("pages/production/quo.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/prod/order-list",
        component: () => import("pages/production/orderList.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/prod/oti",
        component: () => import("pages/production/oti.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/prod/mo",
        component: () => import("pages/production/mo.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/prod/report",
        component: () => import("pages/production/report.vue"),
        meta: { requiresAuth: true },
      },
     
    ],
  },
  {
    path: "/finance",
    component: () => import("layouts/FinanceLayout.vue"),
    children: [
     
      {
        path: "/finance/mo",
        component: () => import("pages/finance/mo.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/finance/molist",
        component: () => import("pages/finance/molist.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/finance/order-list",
        component: () => import("pages/finance/orderList.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/finance/report",
        component: () => import("pages/finance/report.vue"),
        meta: { requiresAuth: true },
      }
     
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

