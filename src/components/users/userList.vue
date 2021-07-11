<template>
  <tr>
    <td>{{indice + 1}}</td>
    <td>{{usuario.email}}</td>
    <td>{{usuario.username}}</td>
    
    <td>
      <a
        href="editar_usuario.php?id=<?php echo $data['idusuario']; ?>"
        class="btn btn-success"
        ><i class="fas fa-edit"></i> Editar</a
      >
      <form
        action="eliminar_usuario.php?id=<?php echo $data['idusuario']; ?>"
        method="post"
        class="confirmar d-inline"
      >
        <button class="btn btn-danger" type="submit">
          <i class="fas fa-trash-alt"></i>
        </button>
      </form>
    </td>
  </tr>
</template>

<script>
import { computed } from '@vue/runtime-core';
import { useStore } from 'vuex';
export default {
    props:['usuario', 'indice'],
    setup(){
      let store = useStore()
      let usuarios = computed(()=> store.state.usuarios)
      return{usuarios}
    }
};
</script>

<style></style>
