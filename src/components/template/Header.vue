<template>
  <div class="body">
    <div id="wrapper">
      <Menu></Menu>
      <!-- menu  -->
      <!-- Content Wrapper -->
      <div id="content-wrapper" class="d-flex flex-column">
        <!-- Main Content -->
        <div id="content">
          <!-- Topbar -->
          <nav
            style="max-height: 10vh"
            class="
              navbar navbar-expand navbar-light
              bg-primary
              text-white
              topbar
              static-top
              shadow
            "
          >
            <!-- Sidebar Toggle (Topbar) -->
            <button
              @click="cambiarSidebar"
              id="sidebarToggleTop"
              class="btn btn-link text-white d-md-none mr-1"
            >
              <i class="fa fa-bars"></i>
            </button>
            <div class="input-group">
              <h6>Sistema de Venta</h6>

              <p class="ml-auto sm-d-none">
                <strong>Venezuela,{{ time }} </strong>
              </p>
            </div>

            <!-- Topbar Navbar -->
            <ul class="navbar-nav ml-auto">
              <div class="topbar-divider d-none d-sm-block"></div>

              <!-- Nav Item - User Information -->
              <li class="nav-item dropdown no-arrow">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="userDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span class="mr-2 d-none d-lg-inline small text-white">
                    <i class="fas fa-user"></i
                  ></span>
                </a>
                <!-- Dropdown - User Information -->
                <div
                  class="
                    dropdown-menu dropdown-menu-right
                    shadow
                    animated--grow-in
                  "
                  aria-labelledby="userDropdown"
                >
                  <div class="d-flex align-items-center ml-2">
                    <input
                      v-model="search"
                      type="search"
                      class="pr-1 pl-1 w-75 form-control form-control-sm"
                    />
                    <i class="ml-2 fas fa-search"></i>
                  </div>
                  <div class="dropdown-divider"></div>

                  <a class="dropdown-item" href="#">
                    <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-600"></i
                    >{{ usuario.username }}
                  </a>
                  <div class="dropdown-divider"></div>

                  <router-link v-if="usuario.rol.grado <=1" class="dropdown-item" to="/configuracion">
                    <i class="fas fa-cog fa-sm fa-fw mr-2 text-gray-600"></i
                    >configuracion
                  </router-link>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" @click="salir()">
                    <i
                      class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-600"
                    ></i>
                    Salir
                  </a>
                </div>
              </li>
            </ul>
          </nav>

          <!-- content  -->
          <div
            style="overflow-y: auto; height: 90vh"
            class="scrollbar-light-blue"
          >
            <router-view :param="search"></router-view>

            <footer class="sticky-footer bg-white">
              <div class="container my-auto">
               
                <div class="copyright text-center my-auto">
                <Popper  class="dark-popper"
                    arrow
                    hover
                    placement="left"
                    :content="numeralFormat(dolar.info.dolar,'0,0' )+ 'bs'">   <span>Copyright &copy; Serious Programming</span>
            </Popper>     </div>
               
              </div>
            </footer>
            <!-- End of Footer -->
          </div>
        </div>
        <!-- End of Content Wrapper -->
      </div>
    </div>
    <!-- End of Page Wrapper -->
{
    <!-- Scroll to Top Button-->

    <!-- Logout Modal-->
    <div
      class="modal fade"
      id="logoutModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
            <button
              class="close"
              type="button"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
            Select "Logout" below if you are ready to end your current session.
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-secondary"
              type="button"
              data-dismiss="modal"
            >
              Cancel
            </button>
            <a class="btn btn-primary" href="login.html">Logout</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

import Menu from "./Menu.vue";
import { useStore } from "vuex";
import Popper from 'vue3-popper'
import { computed, ref } from "@vue/runtime-core";
export default {
  components: { Menu , Popper},
  setup() {
    const store = useStore();

    let usuario = computed(() => store.state.usuario);
    let dolar = computed(() => store.state.system);
    const salir = () => {
      store.dispatch("logout");
    };
    let time = ref("");
    let timeAgo = () => {
      setInterval(() => {
        let times = new Date();
        let val = timeformat(times);
        time.value = val;
      }, 1000);
    };
    const timeformat = (value) => {
      if (value) {
        moment.locale("es");
        return moment(String(value)).format("LL h:mm:ss a");
      }
    };
    const search = ref("");
    const cambiarSidebar = () => {
      store.dispatch("activeMenu");
    };
    timeAgo();

    return { time, search, cambiarSidebar, salir, usuario , dolar};
  },
};
</script>

<style scoped>
.input-group {
  align-items: center;
}
.scrollbar-light-blue::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: #f5f5f5;
  border-radius: 5px;
}

.scrollbar-light-blue::-webkit-scrollbar {
  width: 10px;
  background-color: #f5f5f5;
}
@media screen and (max-width: 700px) {
  .sm-d-none{
    display: none;
  }
}
.scrollbar-light-blue::-webkit-scrollbar-thumb {
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: #4e73df;
}
</style>
