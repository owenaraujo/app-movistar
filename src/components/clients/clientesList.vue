<template>
  <tr>
    <td>{{ index + 1 }}</td>
    <td>{{ cliente.dni }}</td>
    <td>{{ cliente.nombre }} {{ cliente.apellido }}</td>
    <td>{{ cliente.telefono }}</td>
    <td>{{ cliente.direccion }}</td>

    <td class="">
      <router-link :to="'/clientes/add?' + cliente._id">
        <button class="btn btn-success mr-2 mt-2">
          <i class="fas fa-edit"></i>
        </button>
      </router-link>

      <button
        @click="desactivar()"
        v-show="cliente.status"
        class="btn btn-danger mt-2"
        type="submit"
      >
        <i class="fas fa-trash-alt"></i>
      </button>
      <button
        @click="activar()"
        v-show="!cliente.status"
        class="btn btn-success mt-2"
        type="submit"
      >
        <i class="fas fa-check"></i>
      </button>
    </td>
  </tr>
</template>

<script>
import { createToast } from "mosha-vue-toastify";
import { useStore } from "vuex";
import axios from "axios";
import { computed, ref } from "@vue/runtime-core";
export default {
  props: ["cliente", "index"],
  setup(props) {
    let store = useStore();
    let toast = computed(() => store.state.toask);
    let token = computed(() => store.state.token);
    let cliente = ref(props.cliente);
    let api = computed(() => store.state.api);
    async function activar() {
      try {
        const { data } = await axios.delete(
          `${api.value}/clientes/activar/${props.cliente._id}`, {headers:{xtoken:token.value}}
        );
        data.status
          ? (cliente.value.status = true,
            createToast(data.value, toast.value.warning))
          : createToast(data.value);
      } catch (error) {
        createToast("no hay conexion con el servidor");
      }
    }
    async function desactivar() {
      try {
        const { data } = await axios.delete(
          `${api.value}/clientes/${props.cliente._id}`, {headers:{xtoken:token.value}}
        );
        data.status
          ? (cliente.value.status = false,
            createToast(data.value, toast.value.danger))
          : createToast(data.value);
      } catch (error) {
        createToast("no hay conexion con el servidor");
      }
    }
    return { activar, desactivar };
  },
};
</script>

<style></style>
