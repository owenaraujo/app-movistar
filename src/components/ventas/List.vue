<template>
  <div v-if="usuario.rol.grado <= 2" class="container-fluid">
    <!-- Page Heading -->
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800 text-center">Panel de Administración</h1>
    </div>
    <div class="text-right mb-2">
      mostrar
      <div class="btn-group ml-2">
        <button
          class="btn btn-secondary btn-sm dropdown-toggle"
          type="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {{ limit }}
        </button>
        <div class="dropdown-menu">
          <a
            class="dropdown-item"
            :class="{ active: limit == 5 }"
            @click="limitar(5)"
            >5</a
          >
          <a
            class="dropdown-item"
            :class="{ active: limit == 10 }"
            @click="limitar(10)"
            >10</a
          >
          <a
            class="dropdown-item"
            :class="{ active: limit == 20 }"
            @click="limitar(20)"
            >20</a
          >

          <div class="dropdown-divider"></div>
          <a
            class="dropdown-item"
            @click="limitar(undefined)"
            :class="{ active: limit == undefined }"
            >todos</a
          >
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <div class="table-responsive">
          <table class="table table-striped table-bordered" id="table">
            <thead class="thead-dark">
              <tr>
                <th># factura</th>
                <th>Fecha</th>
                <th>Total</th>
                <th>Acciones</th>
              </tr>
            </thead>
            {{
              param
            }}
            <tbody>
              <List
                v-show="venta.factura.toString().indexOf(param) != -1"
                :venta="venta"
                v-for="(venta, index) of ventas"
                :key="index"
              ></List>
            </tbody>
          </table>
          <nav aria-label="..." class="text-center">
            <ul class="pagination justify-content-center">
              <div
                class="page-item"
                :class="{ disabled: page == 1 }"
                @click="previous"
              >
                <a class="page-link" href="#" tabindex="-1" aria-disabled="true"
                  >Previous</a
                >
              </div>
              <div class="pagination scroll scrollbar-light-blue">
                <div
                  v-for="(item, index) in lista"
                  :key="index"
                  class="page-item"
                  :class="{ active: page == item }"
                  @click="getPage(item)"
                >
                  <a class="page-link">{{ item }}</a>
                </div>
              </div>

              <li
                class="page-item"
                @click="next"
                :class="{
                  disabled: lista.length === page || limit === undefined,
                }"
              >
                <a class="page-link" href="#">Next</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
  <NoAccess v-else/>
</template>

<script>
import { computed, ref } from "@vue/runtime-core";
import NoAccess from "../403.vue"
import { useStore } from "vuex";
import axios from "axios";
import List from "./ventasList.vue";
export default {
  props: ["param"],
  components: { List , NoAccess},
  setup() {
    let store = useStore();
    let api = computed(() => store.state.api);
    let usuario = computed(() => store.state.usuario);
    let ventas = ref([]);
    let limit = ref(10);
    let page = ref(1);
    let lista = ref([]);
    function limitar(num) {
      limit.value = num;
      page.value = 1;

      get();
    }
    function previous() {
      if (page.value === 1) return;
      if (limit.value === undefined) return;
      page.value--;
      get();
    }
    function next() {
      if (page.value === lista.value.length) return;
      if (limit.value === undefined) return;

      page.value++;
      get();
    }
    function getPage(num) {
      page.value = num;

      get();
    }
    async function get() {
      ventas.value = []
      const { data } = await axios.get(
        `${api.value}/ventas/${limit.value}/${page.value}`
      );
      ventas.value = data.ventas;
      lista.value = [];
      //data.count = 500;
      for (let index = 0; index < data.count / limit.value; index++) {
        const element = index + 1;
        lista.value.push(element);
      }
    }
    get();
    return { ventas, lista, limit, page, getPage, previous, next, limitar, usuario };
  },
};
</script>

<style scoped>
.scrollbar-light-blue::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: #f5f5f5;
  border-radius: 5px;
}

.scrollbar-light-blue::-webkit-scrollbar {
  width: 10px;
  height: 7px;
  background-color: #f5f5f5;
}

.scrollbar-light-blue::-webkit-scrollbar-thumb {
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: #4e73df;
}
.scroll {
  max-width: 70vw;

  overflow-y: auto;
}
</style>