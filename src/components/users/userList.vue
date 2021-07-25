<template>
  <tr>
    <td>{{indice + 1}}</td>
    <td>{{usuario.email}}</td>
    <td>{{usuario.username}}</td>
    
    <td>
      <router-link
        :to="'/usuarios/add?'+ usuario._id"
        class="btn btn-success"
        ><i class="fas fa-edit"></i> Editar</router-link
      >
      <div
      
        class="confirmar d-inline"
      >
        <button v-show="usuario.status"  class="btn btn-danger ml-2" @click="desactivar(usuario._id)">
          <i class="fas fa-trash-alt"></i>
        </button>
        <button v-show="!usuario.status" class="btn btn-success  ml-2" @click="activar(usuario._id)" >
          <i class="fas fa-check"></i>
        </button>
      </div>
    </td>
  </tr>
</template>

<script>
import { computed, ref } from '@vue/runtime-core';
import { useStore } from 'vuex';
import axios from 'axios';
import { createToast } from 'mosha-vue-toastify';
export default {
    props:['usuario', 'indice'],
    setup(props)
    {
      let usuario= ref(props.usuario)
      let store = useStore()
    let toast = computed(()=> store.state.toask)
    let token = computed(()=> store.state.token)
    let api = computed(()=> store.state.api)
      async function desactivar (id){
const {data} = await axios.delete(`${api.value}/usuarios/${id}`, {headers:{xtoken:token.value}})
data.status ===true ? (usuario.value.status = false, createToast(data.value,  toast.value.danger)): createToast(data.value,  toast.value.warning)

      }
      async function activar (id){
const {data} = await axios.delete(`${api.value}/usuarios/activar/${id}` , {headers:{xtoken:token.value}})
usuario.value.status = true
createToast(data.value, toast.value.success)
      }
     
      let usuarios = computed(()=> store.state.usuarios)
      return{usuarios, desactivar, activar}
    }
};
</script>

<style></style>
