import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
      path: "/",
      name: "index",
      meta: { title: 'index' },

      component: () => import("../components/template/Index.vue"),
    },
    {
      path: "/proveedores/add",
      name: "proveedoresAdd",
      meta: { title: 'formulario de proveedores' },

      component: () => import("../components/proveedores/Add.vue"),
    },
    {
      path: "/proveedores",
      name: "proveedores",
      meta: { title: 'proveedores' },
      component: () => import("../components/proveedores/List.vue"),
    },
    {
      path: "/productos",
      name: "productos",
      meta: { title: 'productos' },

      component: () => import("../components/products/List.vue"),
    },
    {
      path: "/productos/add",
      name: "addProductos",
      meta: { title: 'formulario de productos' },

      component: () => import("../components/products/Add.vue"),
    },{
      path: "/productos/add/cantidad",
      name: "addProductosCantidad",
      meta: { title: 'edicion de stock' },

      component: () => import("../components/products/addCantidad.vue"),
    },
    {
      path: "/clientes",
      name: "Clientes",
      meta: { title: 'clientes' },

      component: () => import("../components/clients/List.vue"),
    },
    {
      path: "/ventas",
      name: "ventas",
      meta: { title: 'ventas' },

      component: () => import("../components/ventas/List.vue"),
    },
    {
      path: "/clientes/add",
      name: "clientesAdd",
      meta: { title: 'formulario de clientes' },

      component: () => import("../components/clients/Add.vue"),
    }, 
    {
      path: "/ventas/add",
      name: "addVentas",
      meta: { title: 'registro de ventas' },

      component: () => import("../components/ventas/Add.vue"),
    }, 
    {
      path: "/usuarios",
      name: "usuarios",
      meta: { title: 'usuarios' },

      component: () => import("../components/users/List.vue"),
    }, 
    {
      path: "/usuarios/add",
      name: "usuarioAdd",
      meta: { title: 'formulario de usuarios' },

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
  if (!to.matched.length) router.push('/')
  next()
})
const DEFAULT_TITLE = 'sistema de ventas';
router.afterEach((to) => {
    document.title = to.meta.title || DEFAULT_TITLE;
});

export default router
