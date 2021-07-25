<template>
  
  <div v-if="user.rol.grado <= 1" class="container-fluid mt-2 mb-2">
    <!-- Content Row -->
    <div class="row">
      <div class="col-lg-6 m-auto">
        <div class="card-header bg-primary text-white">
          Registro de Proveedor
        </div>
        <div class="card">
          <form autocomplete="off" class="card-body p-2">
            <div v-for="item in form" :key="item" class="form-floating">
              <label :for="item.value">{{ item.value }}</label>
              <input
                v-model.number="NewProveedor[item.value]"
                :class="{ 'is-invalid': NewProveedor[item.value] === '' }"
                v-if="item.type == Number"
                type="number"
                :placeholder="'Ingrese ' + item.value"
                :id="item.value"
                class="form-control"
              />
              <input
                v-model="NewProveedor[item.value]"
                :class="{ 'is-invalid': NewProveedor[item.value] === '' }"
                v-else
                type="text"
                :placeholder="'Ingrese ' + item.value"
                :id="item.value"
                class="form-control"
              />
            </div>
            <div class="text-center mt-2">
              <button @click.prevent="save()" class="btn btn-primary mr-2">
                Guardar Proveedor
              </button>
              <router-link to="/proveedores" class="btn btn-danger"
                >Regresar</router-link
              >
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <NoAccess v-else/>
</template>

<script>
import axios from "axios";
import { useStore } from "vuex";
import NoAccess from '../403.vue'
import { ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import {useRouter} from "vue-router"
import { createToast } from 'mosha-vue-toastify';
export default {
  props:['param'],
  components:{NoAccess},
  setup() {
    const store = useStore();
    let router = useRouter()
    const api = computed(() => store.state.api);
    let toast = computed(()=> store.state.toask)
    let token = computed(()=> store.state.token)
    const form = [
      { value: "nombre", type: String },
      { value: "rif", type: Number },
      { value: "telefono", type: Number },
      { value: "direccion", type: String },
    ];
    let NewProveedor = ref({
      nombre: null,
      rif: null,
      telefono: null,
      direccion: null,
    });
    let uri = window.location.href.split("?");
    let id = "";
    if (uri.length > 1) {
      id = "/" + uri[1];
      const buscarProveedor = async () => {
        const { data } = await axios.get(`${api.value}/proveedores${id}`);

        NewProveedor.value = data;
      };
      buscarProveedor();
    } else {
      id = "";
    }
    const save = async () => {
      let value = NewProveedor.value;
      if (!value.nombre) return (value.nombre = "");
      if (!value.rif) return (value.rif = "");
      if (!value.telefono) return (value.telefono = "");
      if (!value.direccion) return (value.direccion = "");
      const { data } = await axios.post(
        `${api.value}/proveedores${id}`,
        NewProveedor.value, {headers:{xtoken:token.value}}
      );
      if (data.status) {
        
        NewProveedor.value = {};
       router.push('/proveedores')
        
        createToast(data.data,toast.value.success )
      }
      else{
        createToast(data.data,toast.value.danger )

      }
      
    };
    let user = computed(()=>store.state.usuario)

    return {
      user,
      api,
      save,
      form,
      NewProveedor,
      id,
    };
  },
};
</script>
