<template>
  <div>
    <ul
      :class="{ oculto: sidebars }"
      class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      <!-- Sidebar - Brand -->
      <router-link
        style="height: 9vh"
        class="sidebar-brand d-flex align-items-center justify-content-center"
        to="/"
      >
        <div class="sidebar-brand-icon rotate-n-15">
          <svg
            x="0px"
            y="0px"
            width="70px"
            height="60px"
            viewBox="0 0 52 38"
            class="img-thumbnail"
          >
            <path
              id="logo-movistar"
              d="M9.835,4.473c-2.424,0.038-6.898,1.233-8.942,9.58c-0.891,3.638-1.235,7.429-0.473,11.94c0.703,4.162,1.948,7.754,2.787,9.733c0.29,0.683,0.738,1.394,1.084,1.832c0.996,1.259,2.654,1.179,3.35,0.835c0.76-0.374,1.633-1.276,1.317-3.337c-0.153-0.996-0.593-2.452-0.841-3.263c-0.761-2.484-1.773-5.482-1.861-7.617c-0.119-2.857,1.008-3.23,1.756-3.396c1.258-0.277,2.312,1.104,3.314,2.835c1.195,2.066,3.245,5.728,4.916,8.522c1.509,2.524,4.293,5.227,8.765,5.042c4.56-0.19,7.92-1.93,9.651-7.405c1.295-4.097,2.178-7.159,3.6-10.294c1.633-3.605,3.813-5.535,5.648-4.946c1.704,0.548,2.129,2.213,2.15,4.661c0.018,2.166-0.233,4.554-0.427,6.308c-0.071,0.637-0.199,1.916-0.147,2.628c0.103,1.397,0.708,2.794,2.282,3.017c1.676,0.238,3.021-1.102,3.558-2.721c0.212-0.64,0.393-1.615,0.49-2.309c0.493-3.5,0.621-5.852,0.398-9.433c-0.259-4.188-1.078-8.005-2.508-11.31c-1.368-3.159-3.565-5.186-6.381-5.364c-3.119-0.197-6.698,1.872-8.575,5.886c-1.73,3.7-3.115,7.499-3.955,9.437c-0.851,1.967-2.103,3.179-4.027,3.382c-2.353,0.246-4.381-1.462-5.866-3.897c-1.295-2.123-3.86-6.165-5.233-7.523C14.375,6.021,12.902,4.425,9.835,4.473"
              fill="#019DF4"
            ></path>
          </svg>
        </div>
        <div class="sidebar-brand-text mx-3">serious programming</div>
      </router-link>

      <!-- Divider -->
      <hr class="sidebar-divider my-0" />

      <!-- Divider -->
      <hr class="sidebar-divider" />

      <!-- Heading -->
      <div class="sidebar-heading">Interface</div>

      <!-- Nav Item - Pages Collapse Menu -->
      <li  v-if="user.rol.grado <=2" class="nav-item">
        <router-link
          class="nav-link collapsed"
          to="#"
          data-toggle="collapse"
          data-target="#collapseTwo"
          aria-expanded="true"
          aria-controls="collapseTwo"
        >
          <i class="fas fa-fw fa-store mr-3"></i>
          <span>Ventas</span>
        </router-link>
        <div
          id="collapseTwo"
          class="collapse"
          aria-labelledby="headingTwo"
          data-parent="#accordionSidebar"
        >
          <div class="bg-white py-2 collapse-inner rounded">
            <router-link class="collapse-item" to="/ventas/add"
              >Nueva venta</router-link
            >
            <router-link class="collapse-item" to="/ventas/"
              >Ventas</router-link
            >
          </div>
        </div>
      </li>

      <!-- Nav Item - Productos Collapse Menu -->
      <li class="nav-item">
        <router-link
          class="nav-link collapsed"
          to="#"
          data-toggle="collapse"
          data-target="#collapseUtilities"
          aria-expanded="true"
          aria-controls="collapseUtilities"
        >
          <i class="fas fa-fw fa-box mr-3"></i>
          <span>Productos</span>
        </router-link>
        <div
          id="collapseUtilities"
          class="collapse"
          aria-labelledby="headingUtilities"
          data-parent="#accordionSidebar"
        >
          <div class="bg-white py-2 collapse-inner rounded">
            <router-link  v-if="user.rol.grado <=1" class="collapse-item" to="/productos/add"
              >Nuevo Producto</router-link
            >
            <router-link class="collapse-item" to="/productos"
              >Productos</router-link
            >
          </div>
        </div>
      </li>

      <!-- Nav Item - Clientes Collapse Menu -->
      <li class="nav-item" v-if="user.rol.grado <=2">
        <router-link
          class="nav-link collapsed"
          to="#"
          data-toggle="collapse"
          data-target="#collapseClientes"
          aria-expanded="true"
          aria-controls="collapseUtilities"
        >
          <i class="fas fa-users mr-3"></i>
          <span>Clientes</span>
        </router-link>
        <div
          id="collapseClientes"
          class="collapse"
          aria-labelledby="headingUtilities"
          data-parent="#accordionSidebar"
        >
          <div class="bg-white py-2 collapse-inner rounded">
            <router-link class="collapse-item" to="/clientes/add"
              >Nuevo Clientes</router-link
            >
            <router-link class="collapse-item" to="/clientes"
              >Clientes</router-link
            >
          </div>
        </div>
      </li>
      <!-- Nav Item - proveedores Collapse Menu -->
      <li class="nav-item" v-if="user.rol.grado <=2">
        <router-link
          class="nav-link collapsed"
          to="#"
          data-toggle="collapse"
          data-target="#collapseProveedor"
          aria-expanded="true"
          aria-controls="collapseUtilities"
        >
          <i class="fas fa-hospital mr-3"></i>
          <span>Proveedor</span>
        </router-link>
        <div
          id="collapseProveedor"
          class="collapse"
          aria-labelledby="headingUtilities"
          data-parent="#accordionSidebar"
        >
          <div class="bg-white py-2 collapse-inner rounded">
            <router-link v-if="user.rol.grado <=1" class="collapse-item" to="/proveedores/add"
              >Nuevo Proveedor</router-link
            >
            <router-link class="collapse-item" to="/proveedores"
              >Proveedores</router-link
            >
          </div>
        </div>
      </li>

      <!-- Nav Item - Usuarios Collapse Menu -->
      <li class="nav-item" v-if="user.rol.grado <=1">
        <router-link
          class="nav-link collapsed"
          to="#"
          data-toggle="collapse"
          data-target="#collapseUsuarios"
          aria-expanded="true"
          aria-controls="collapseUtilities"
        >
          <i class="fas fa-user mr-3"></i>
          <span>Usuarios</span>
        </router-link>
       
        <div
          id="collapseUsuarios"
          class="collapse"
          aria-labelledby="headingUtilities"
          data-parent="#accordionSidebar"
        >
          <div class="bg-white py-2 collapse-inner rounded">
            <router-link class="collapse-item" to="/usuarios/add"
              >Nuevo Usuario</router-link
            >
            <router-link class="collapse-item" to="/usuarios"
              >Usuarios</router-link
            >
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const sidebars = computed(() => store.state.sidebars);
    let user = computed(()=>store.state.usuario)
    return { sidebars, user};
   
  },
};
</script>

<style>
.img-thumbnail {
  width: 90%;
}
.oculto {
  width: 0 !important;
  overflow: hidden;
}
</style>
