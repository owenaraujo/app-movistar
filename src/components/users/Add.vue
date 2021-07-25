<template>
  <div v-if="user.rol.grado <=1" class="container-fluid">
    <!-- Page Heading -->
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">Panel de Administración</h1>
      <router-link to="/usuarios" class="btn btn-primary mt-2"
        >Regresar</router-link
      >
    </div>

    <!-- Content Row -->
    <div class="row">
      <div class="col-lg-6 m-auto">
        <form autocomplete="off">
          <div class="form-group">
            <label>Rol</label>
            <select
              :class="{ 'is-invalid': newUser.rol === '' }"
              v-model="newUser.rol"
              name="rol"
              id="rol"
              class="form-control"
            >
              <option
                v-for="(item, index) in roles"
                :key="index"
                :value="item._id"
              >
                {{ item.nombre }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label for="usuario">Usuario</label>
            <input
              type="text"
              class="form-control"
              placeholder="Ingrese Usuario"
              :class="{ 'is-invalid': newUser.username === '' }"
              name="usuario"
              v-model="newUser.username"
            />
          </div>
          <div class="form-group">
            <label for="correo">Correo</label>
            <input
              type="email"
              :class="{ 'is-invalid': newUser.email === '' }"
              class="form-control"
              placeholder="Ingrese Correo Electrónico"
              id="correo"
              v-model="newUser.email"
            />
          </div>

          <div class="form-group">
            <label for="clave">Contraseña</label>
            <input
              :class="{ 'is-invalid': newUser.password === '' }"
              type="password"
              id="clave"
              class="form-control"
              placeholder="Ingrese Contraseña"
              v-model="newUser.password"
            />
          </div>
          <div class="form-group">
            <label for="verificarClave">Contraseña</label>
            <input
              :class="{
                'is-invalid': newUser.password != newUser.verifyPassword,
              }"
              type="password"
              id="verificarClave"
              class="form-control"
              placeholder="Ingrese Contraseña"
              v-model="newUser.verifyPassword"
            />
          </div>

          <button
            @click.prevent="save()"
            type="submit"
            value="Guardar Usuario"
            class="btn btn-primary"
          >
            Guardar Usuario
          </button>
        </form>
       
      </div>
    </div>
  </div>
<NoAccess v-else/>
</template>
<script>
import { computed, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import axios from "axios";
import NoAccess from '../403.vue'
import { createToast } from "mosha-vue-toastify";
export default {
  props: ["param"],
  components:{NoAccess},
  setup() {
    let store = useStore();
    let toast = computed(()=> store.state.toask)

    let newUser = ref({
      username: null,
      email: null,
      password: null,
      rol: null,
    });
    let router = useRouter();
    let id = "";
   function buscarUser() {
      try {
        let uri = window.location.href.split("?");
        if (uri.length === 2) {
          const { value } = computed(() => store.state.usuarios);

          if (value.length === 0) {
            router.push("/usuarios/add");
            return;
          }
          id = uri[1];
          const res = value.filter((item) => (item._id === id ? item : false));

          !res ? (newUser.value = {}) : (res[0].password = null,newUser.value = res[0], id = uri[1]);
        }
      } catch (error) {
        0;
      }
    }
    buscarUser()
    let api = computed(() => store.state.api);
    let token = computed(() => store.state.token
    );
    async function save() {

      try { 
        let usuario = newUser.value;
        if (!usuario.username) return (usuario.username = "");
        if (!usuario.email) return (usuario.email = "");
        if (!usuario.password) return (usuario.password = "");
        if (usuario.password != usuario.verifyPassword)
          return (usuario.password = "");
        if (!usuario.rol) return (usuario.rol = "");
        const { data } = await axios.post(`${api.value}/usuarios/${id}`, usuario, {headers:{xtoken:token.value}});
        if (data.status) {
          createToast(data.value, toast.value.success);
          router.push("/usuarios");
          newUser.value = {};
        } else {
          createToast(data.value, toast.value.danger);
        }
      } catch (error) {
        createToast("no hay conexion con el servidor");
      }
    }
    let roles = ref([]);
    async function getRoles() {
      try {
        const { data } = await axios.get(`${api.value}/usuarios/roles`);

        roles.value = data;
      } catch (error) {
       createToast('no hay acceso al servidor')
      }
    }
    getRoles();
    let user = computed(()=> store.state.usuario)
    
    return { newUser, save, roles , user};
  },
};
</script>

<style>
</style>