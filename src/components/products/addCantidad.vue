<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-6 m-auto">
        <form autocomplete="off">
          <div class="form-group">
            <label for="precio">Precio Actual</label>
            <input
              type="number"
              class="form-control"
              v-model="info.precio"
              disabled
            />
          </div>
          <div class="form-group">
            <label for="precio">Cantidad de productos Disponibles</label>
            <input
              type="number"
              class="form-control"
              v-model="info.cantidad"
              disabled
            />
          </div>
          <div class="form-group">
            <label for="precio">Nuevo Precio</label>
            <input
              type="number"
              placeholder="Ingrese nuevo precio"
              class="form-control"
              v-model.number="newDate.precio"
            />
          </div>
          <div class="form-group">
            <label for="cantidad">Agregar Cantidad</label>
            <input
              type="number"
              placeholder="Ingrese cantidad"
              v-model.number="newDate.cantidad"
              class="form-control"
            />
          </div>

          <div class="text-center">
            <button @click.prevent="update()" class="mr-2 btn btn-primary">
              actualizar
            </button>
            <router-link to="/productos" class="btn btn-danger"
              >Regresar</router-link
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { computed, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import axios from "axios";
import { createToast } from "mosha-vue-toastify";
export default {
  props: ["param"],
  setup() {
    let router = useRouter();
    let newDate = ref({ cantidad: null, precio: null });
    const store = useStore();
    const uri = window.location.href.split("?");
    let info = { cantidad: null, precio: null };
    async function create() {
      if (uri.lengt != 1) {
        let id = uri[1];
        const productos = computed(() => store.state.productos);
        if (productos.length == 0) {
          router.push("/productos");
          return;
        }
        const res = productos.value.filter((item) =>
          item._id === id ? item : 0
        );
        console.log(res.length);
        if (res.length === 0) {
           router.push("/productos");
          return
          }
        info = ref(res[0]);
      }
    }
    let api = computed(() => store.state.api);
    create();
    let toast = computed(() => store.state.toask);
    async function update() {
      try {
        if (!newDate.value.precio) return (newDate.precio = "");
      if (!newDate.value.cantidad) return (newDate.cantidad = "");

      const New = {
        cantidad: info.value.cantidad + newDate.value.cantidad,
        precio: newDate.value.precio,
      };
      const { data } = await axios.put(
        `${api.value}/productos/cantidad/${info.value._id}`,
        New
      );
      if (data.status) {
        createToast(data.value, toast.value.success);
        info.value = {};
        newDate.value = {};
        router.push("/productos");
      } else {
        createToast(data.value, toast.value.warning);
      }
      } catch (error) {
        createToast('no se pudo conectar al servidor');
        
      }
    }
    return { uri, info, newDate, update };
  },
};
</script>
