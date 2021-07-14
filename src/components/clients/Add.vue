<template>
  <div class="container-fluid">
    <!-- Page Heading -->
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">Panel de Administración</h1>
      <router-link :to="ruta" class="btn btn-primary mt-2">Regresar</router-link>
    </div>

    <!-- Content Row -->
    <div class="row">
      <div class="col-lg-6 m-auto">
        <form autocomplete="off">
          <div class="form-group">
            <div v-for="item in form" :key="item" class="form-floating">
              <label :for="item.value">{{ item.value }}</label>
              <input
                v-if="item.number"
                v-model.number="newCliente[item.value]"
                :class="{ 'is-invalid': newCliente[item.value] === '' }"
                type="number"
                :placeholder="'Ingrese ' + item.value"
                :id="item.value"
                class="form-control"
              />
              <input
                v-else
                v-model="newCliente[item.value]"
                :class="{ 'is-invalid': newCliente[item.value] === '' }"
                type="text"
                :placeholder="'Ingrese ' + item.value"
                :id="item.value"
                class="form-control"
              />
            </div>
          </div>
          <button
            type="submit"
            v-if="!newCliente.boton"
            @click.prevent="save()"
            class="btn btn-primary"
          >
            Guardar Cliente
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
import axios from "axios";
import { createToast } from "mosha-vue-toastify";
import { useRouter } from 'vue-router';
export default {
  setup() {
    let form = [
      { value: "dni", number: true },
      { value: "nombre" },
      { value: "apellido" },
      { value: "telefono", number: true },
      { value: "direccion" },
    ];
    let store = useStore();
    let router = useRouter()
    let newCliente = ref({
      dni: null,
      nombre: null,
      telefono: null,
      direccion: null,
      boton: false,
    });
    let api = computed(() => store.state.api);
    let usuario = computed(() => store.state.usuario);
      let id =''
    const save = async () => {
      let value = newCliente.value;
      if (!value.dni) return (value.dni = "");
      if (!value.nombre) return (value.nombre = "");
      if (!value.telefono) return (value.telefono = "");
      if (!value.direccion) return (value.direccion = "");
      value.user_id = usuario.value._id;
      newCliente.value.boton = true;
      const { data } = await axios.post(`${api.value}/clientes/${id}`, value);
      createToast(data.value);
      newCliente.value.boton = false;
      if (data.status == false || data.status === null) return;
id= ''
router.push('/clientes')
      newCliente.value = {};
    };
    let uri = window.location.href.split('?')
    if(uri.length != 1){
      id = uri[1]
      let clientes = computed(()=> store.state.clientes)
const item = clientes.value.filter(item=> item._id === id ? item : 0)
item.length === 0 ? router.push('/clientes/add'): (newCliente.value = item[0], delete form.splice(0, 1)) 
}
   
    const ruta = computed(() => store.state.linkclientes);
    return {
      ruta,
      newCliente,
      form,
      save,
    };
  },
};
</script>

<style></style>
