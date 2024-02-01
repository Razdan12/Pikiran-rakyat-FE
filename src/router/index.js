import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import Swal from 'sweetalert2'
import { api } from '../boot/axios'

export default route(function () {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  Router.beforeEach(async (to, from, next) => {
    const role = sessionStorage.getItem('role'); // Ambil role dari sessionStorage
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (await isAuthenticated()) {
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
  

  const isAuthenticated = async () =>{
    const token = sessionStorage.getItem("token")
    try {
      const response = await api.get(`/user/auth/me`, { 
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response

    } catch (error) {
      console.log(error);
    }
  }
 

  return Router
})
