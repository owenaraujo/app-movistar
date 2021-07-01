<template>
  <tr>
    <td>{{cliente}}</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
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
export default {
    props:['cliente'],
};
</script>

<style></style>
