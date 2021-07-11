<template>
  <div class="container-fluid">
    <!-- Page Heading -->
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">Productos</h1>
      <router-link to="/productos/add" class="btn btn-primary mt-2"
        >Nuevo</router-link
      >
    </div>

    <div class="row">
      <div class="col-lg-12">
        <div class="table-responsive scrollbar-light-blue" >
          <table class="table table-striped table-bordered text-center" id="table">
            <thead class="thead-dark">
              <tr>
                <th>CODIGO</th>
                <th>PRODUCTO</th>
                <th>PRECIO</th>
                <th>STOCK</th>

                <th>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              <Lista
                v-show="
                  producto.codigo.toLowerCase().indexOf(param.toLowerCase()) !=
                    -1 ||
                    producto.nombre
                      .toLowerCase()
                      .indexOf(param.toLowerCase()) != -1
                "
                v-for="producto in productos"
                :key="producto"
                :producto="producto"
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
import Lista from "./productList.vue";
export default {
  props: ["param"],
  components: { Lista },
  setup() {
    let store = useStore();
    store.dispatch("getProductos");

    const productos = computed(() => store.state.productos);
    return { productos };
  },
};
</script>

<style>
.scrollbar-light-blue::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: #f5f5f5;
  border-radius: 5px;
}

.scrollbar-light-blue::-webkit-scrollbar {
  width: 10px;
  background-color: #f5f5f5;
}

.scrollbar-light-blue::-webkit-scrollbar-thumb {
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: #4e73df;
}
</style>
