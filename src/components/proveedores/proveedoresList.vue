<template>
  <tr >
    <td>{{ proveedor.rif }}</td>
    <td>{{ proveedor.nombre }}</td>
    <td>{{ proveedor.telefono }}</td>
    <td>{{ proveedor.direccion }}</td>
    <td v-if="access <=1">
     
      <router-link
        :to="'/proveedores/add?' + proveedor._id"
        class="btn btn-success"
        ><i class="fas fa-edit"></i
      ></router-link>
      <div class="confirmar d-inline">
        <button
          :class="{ 'd-none': proveedor.status }"
          @click="activarProveedor(proveedor._id)"
          class="ml-2 btn btn-success"
        >
          <i class="fas fa-check"></i>
        </button>

        <button
          :class="{ 'd-none': !proveedor.status }"
          @click="desactivarProveedor(proveedor._id)"
          class="ml-2 btn btn-danger"
        >
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
    </td>
  </tr>
</template>

<script>
import axios from "axios";
import {createToast  } from 'mosha-vue-toastify'
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";
export default {
  props: ["param", "proveedor", 'access'],
   
 
  setup() {
    const store = useStore();
     const toast = computed(()=> store.state.toask)
     const token = computed(()=> store.state.token)
    const api = computed(() => store.state.api);
    const desactivarProveedor = async (id) => {
     const {data}= await axios.delete(`${api.value}/proveedores/${id}`, {headers:{xtoken:token.value}});
      store.dispatch("proveedorStatus", id);
    createToast(data.data,toast.value.danger)

    };
    const activarProveedor = async (id) => {
     const {data}= await axios.delete(`${api.value}/proveedores/activate/${id}`, {headers:{xtoken:token.value}});
      store.dispatch("proveedorStatus", id);
    createToast(data.data,toast.value.warning)
    };
   
    return {
      
      desactivarProveedor,
      activarProveedor,
    };
  },
 
};
</script>

<style></style>
