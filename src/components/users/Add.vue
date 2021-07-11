<template>
  <div class="container-fluid">
    <!-- Page Heading -->
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">Panel de Administración</h1>
      <router-link to="/usuarios" class="btn btn-primary">Regresar</router-link>
    </div>

    <!-- Content Row -->
    <div class="row">
      <div class="col-lg-6 m-auto">
          {{newUser}}
        <form  autocomplete="off">
           <div class="form-group">
            <label for="usuario">Usuario</label>
            <input
              type="text"
              class="form-control"
              placeholder="Ingrese Usuario"
              name="usuario"
              v-model="newUser.username"
            />
          </div>
          <div class="form-group">
            <label for="correo">Correo</label>
            <input
              type="email"
              class="form-control"
              placeholder="Ingrese Correo Electrónico"
              id="correo"
             v-model="newUser.email"
            />
          </div>
         
          <div class="form-group">
            <label for="clave">Contraseña</label>
            <input
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
            :class="{'is-invalid': newUser.password != newUser.verifyPassword}"
              type="password"
              id="verificarClave"
              class="form-control"
              placeholder="Ingrese Contraseña"
              v-model="newUser.verifyPassword"
            />
          </div>
          <div class="form-group">
            <label>Rol</label>
            <select v-model="newUser.rol" name="rol" id="rol" class="form-control">
                <option  value="" disabled selected>seleccione un rol</option>
              <option v-for="(item, index) in roles" :key="index" :value="item._id">{{item.nombre}}</option>
            </select>
          </div>
          <input
            type="submit"
            value="Guardar Usuario"
            class="btn btn-primary"
          />
        </form>
      </div>
    </div>
  </div>
  {{roles}}
</template>

<script>
import { computed, ref } from '@vue/runtime-core'
import { useStore } from 'vuex'
import axios from 'axios'
import { createToast } from 'mosha-vue-toastify'
export default {
    props:['param'],
    setup(){
        let store = useStore()
       
        let api = computed(()=> store.state.api)
async function save (){
    try {
        const {data}= await axios.post(`${api.value}/usuarios`)
        if (data.statu) {
            createToast(data.value)
            return
        } else{
            console.log(data)
        }
    } catch (error) {
        createToast('no hay conexion con el servidor')
    }
}        let roles = ref([])
 async function getRoles (){
            try {
                const {data}= await axios.get(`${api.value}/usuarios/roles`) 
                console.log(data)
                roles.value = data
            } catch (error) {
                console.log(error)
            }
        }
        getRoles()
        let newUser =ref( {
username: "admin",
email: "default@gmail.com",
password: null,
rol:null })
return {newUser, save, roles}
    }


}
</script>

<style>
</style>