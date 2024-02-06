import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./routes";
import Swal from "sweetalert2";
import { api } from "../boot/axios";

export default route(function () {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach(async (to, from, next) => {
    const role = sessionStorage.getItem("role"); // Retrieve role from sessionStorage

    if (to.matched.some((record) => record.meta.requiresAuth)) {
      if (await isAuthenticated()) {
        const paths = {
          admin: "/admin",
          sales: "/sales",
          mitra: "/sales",
          finance: "/finance",
          pic_artikel: "/prod",
          pic_sosmed: "/prod",
          pic_cpd: "/prod",
          pic_cpm: "/prod",
          pic_other_content: "/prod",
          manager: "/manager",
          VP: "/vp",
        };

        if (paths[role] && to.path.startsWith(paths[role])) {
          next(); // If role and path match, proceed
        } else {
          showErrorMessage("Anda tidak memiliki akses ke halaman ini!");
          next("/"); // If role and path don't match, redirect to home page
        }
      } else {
        showErrorMessage("Sesi anda telah habis!");
        next("/"); // If not authenticated, redirect to home page
      }
    } else {
      next(); // If no authentication is required, proceed
    }
  });

  function showErrorMessage(message) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: message,
    });
  }

  const isAuthenticated = async () => {
    const token = sessionStorage.getItem("token");
    try {
      const response = await api.get(`/user/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return Router;
});
