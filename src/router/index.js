import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
      path: "/",
      name: "index",
      component: () => import("../components/template/Index.vue"),
    },
    {
      path: "/productos/",
      name: "productos",
      component: () => import("../components/products/List.vue"),
    },
    {
      path: "/productos/add/",
      name: "addProductos",
      component: () => import("../components/products/Add.vue"),
    },
    {
      path: "/clientes/",
      name: "addClientes",
      component: () => import("../components/clients/List.vue"),
    },
    {
      path: "/ventas",
      name: "ventas",
      component: () => import("../components/ventas/List.vue"),
    },
    {
      path: "/clientes/add/",
      name: "clientes",
      component: () => import("../components/clients/List.vue"),
    }, 
    {
      path: "/ventas/add",
      name: "addVentas",
      component: () => import("../components/ventas/List.vue"),
    }, 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  base: 'history',
  linkActiveClass: 'active'
})
router.beforeEach((to, from, next) => {
  if (to.matched.length) console.warn('no match')
  next()
})

export default router
