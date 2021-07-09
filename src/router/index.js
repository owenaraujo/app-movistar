import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
      path: "/",
      name: "index",
      component: () => import("../components/template/Index.vue"),
    },
    {
      path: "/proveedores/add",
      name: "proveedoresAdd",
      component: () => import("../components/proveedores/Add.vue"),
    },
    {
      path: "/proveedores",
      name: "proveedores",
      component: () => import("../components/proveedores/List.vue"),
    },
    {
      path: "/productos",
      name: "productos",
      component: () => import("../components/products/List.vue"),
    },
    {
      path: "/productos/add",
      name: "addProductos",
      component: () => import("../components/products/Add.vue"),
    },{
      path: "/productos/add/cantidad",
      name: "addProductosCantidad",
      component: () => import("../components/products/addCantidad.vue"),
    },
    {
      path: "/clientes",
      name: "addClientes",
      component: () => import("../components/clients/List.vue"),
    },
    {
      path: "/ventas",
      name: "ventas",
      component: () => import("../components/ventas/List.vue"),
    },
    {
      path: "/clientes/add",
      name: "clientesAdd",
      component: () => import("../components/clients/Add.vue"),
    }, 
    {
      path: "/ventas/add",
      name: "addVentas",
      component: () => import("../components/ventas/Add.vue"),
    }, 
    {
      path: "/usuarios",
      name: "usuarios",
      component: () => import("../components/users/List.vue"),
    }, 
    {
      path: "/usuarios/add",
      name: "usuarioAdd",
      component: () => import("../components/users/Add.vue"),
    }, 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  base: 'history',
  linkActiveClass: 'active'
})
router.beforeEach((to, from, next) => {
  if (!to.matched.length) console.warn('no match')
  next()
})

export default router
