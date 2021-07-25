<template>
  <div style=" 
     overflow-y: scroll;
    height: 100vh;" class="">
    <!-- Outer Row -->
    <div class=" container mx-auto row justify-content-center">
      <div class="col-xl-10 col-lg-12 col-md-9">
        <div class="card o-hidden border-0 shadow-lg my-5">
          <div class="card-body p-0">
            <!-- Nested Row within Card Body -->
            <div class="row">
              <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
              <div class="col-lg-6">
                <div class="p-5">
                  <div class="text-center">
                    <h1 class="h4 text-gray-900 mb-4">Iniciar Sesión</h1>
                  </div>
                  <form class="user" autocomplete="off">
                    <div class="form-group">
                      <label for="">Usuario</label>
                      <input
                        v-model="usuario.username"
                        type="text"
                        class="form-control"
                        placeholder="Usuario"
                        name="usuario"
                      />
                    </div>

                    <div class="form-group">
                      <label for="">Contraseña</label>
                      <input
                        v-model="usuario.password"
                        type="password"
                        class="form-control"
                        placeholder="Contraseña"
                        name="clave"
                      />
                    </div>
                    <input
                      @click="loger()"
                      value="Iniciar"
                      class="btn btn-primary"
                    />
                    <hr />
                  </form>
                  <hr />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import axios from 'axios'
import { useStore } from "vuex";
import { computed } from '@vue/runtime-core';
import { createToast } from 'mosha-vue-toastify';
export default {
  setup() {
    const store = useStore();
let api = computed(()=> store.state.api)
    let toast = computed(()=>store.state.toask)
    const usuario = ref({ password: "", username: "" });
    const usuarios = computed (()=> store.state.usuarios)
    const loger =async () => {
      try {
        
const {data} = await axios.post(`${api.value}/usuarios/login`, usuario.value)
if(data.status){ return store.dispatch("login", data)


}
if(data.status === null){
  createToast(data.value, toast.value.warning)
} if(data.status === false)createToast(data.value , toast.value.danger)

      } catch (error) {
        createToast('no hay acceso al servidor')
      }
    };
    return { loger, usuario, usuarios };
  },
};
</script>
