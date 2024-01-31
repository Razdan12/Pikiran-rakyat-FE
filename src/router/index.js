import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import Swal from 'sweetalert2'


export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  Router.beforeEach((to, from, next) => {
    const role = sessionStorage.getItem('role'); // Ambil role dari sessionStorage
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (isAuthenticated()) {
        if ((role === 'admin' && to.path.startsWith('/admin')) || 
            (role === 'sales' && to.path.startsWith('/sales')) ||
            (role === 'manager' && to.path.startsWith('/manager'))
            ){
          next(); // Jika role dan path sesuai, lanjutkan
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Anda tidak memiliki akses ke halaman ini!",
          });
          next('/'); // Jika role dan path tidak sesuai, kembali ke halaman awal
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Sesi anda telah habis!",
        });
        next('/');
      }
    } else {
      next();
    }
  })
  

  function isAuthenticated() {
    const token = sessionStorage.getItem('token')
    return !!token
  }
  

  return Router
})