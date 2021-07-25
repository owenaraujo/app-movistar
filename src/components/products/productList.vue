<template>
  <tr>
    <td>{{ producto.codigo }}</td>
    <td>{{ producto.nombre }}</td>
    <td>
     
  <Popper
    class="dark-popper"
    arrow
    hover
    placement='right'
    :content="numeralFormat((producto.precio*dolar)) +' Bs'"
  >
    <div>{{producto.precio}}</div>
  </Popper>

    </td>
    <td>{{ producto.cantidad }}</td>

    <td v-if="access <= 1">
      <router-link
        :to="'/productos/add/cantidad?' + producto._id"
        class="btn btn-primary ml-2"
        ><i class="fas fa-audio-description"></i
      ></router-link>

      <router-link
        :to="'/productos/add?' + producto._id"
        class="btn btn-warning ml-2"
        ><i class="fas fa-edit"></i
      ></router-link>

      <div class="confirmar d-inline">
        <button
          v-show="producto.status"
          @click="desactivarProducto(producto._id)"
          class="btn btn-danger ml-2"
        >
          <i class="fas fa-trash-alt"></i>
        </button>

        <button
          v-show="!producto.status"
          @click="activarProducto(producto._id)"
          class="btn btn-success ml-2"
        >
          <i class="fas fa-check"></i>
        </button>
      </div>
    </td>
  </tr>
</template>

<script>
import { createToast } from "mosha-vue-toastify";
import axios from "axios";
import { useStore } from "vuex";
import { computed, ref } from "@vue/runtime-core";
import Popper from "vue3-popper";

export default {
  props: ["producto", 'access'],
  components: { Popper },

  setup(props) {
    let producto = ref(props.producto);
    const store = useStore();
    let dolar = computed(()=> store.state.system.info.dolar)
    const toask = computed(() => store.state.toask);
    const token = computed(() => store.state.token);
    const api = computed(() => store.state.api);
    async function activarProducto(id) {
      const { data } = await axios.delete(
        `${api.value}/productos/activar/${id}`, {headers:{xtoken:token.value}}
      );
      producto.value.status = true;
      createToast(data.value, toask.value.warning);
    }
    async function desactivarProducto(id) {
      const { data } = await axios.delete(`${api.value}/productos/${id}`, {headers:{xtoken:token.value}});
      producto.value.status = false;
      createToast(data.value, toask.value.danger);
    }
    return { activarProducto, desactivarProducto , dolar};
  },
};
</script>

<style></style>
