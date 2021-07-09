<template>
  <tr>
    <td>{{ index  +1}}</td>
    <td>{{cliente.dni}}</td>
    <td>{{cliente.nombre}}</td>
    <td>{{cliente.telefono}}</td>
    <td>{{cliente.direccion}}</td>
    

    <td class="">
      <router-link :to="'/clientes/add?'+cliente._id">
        <button class="btn btn-success mr-2 mt-2">
          <i class="fas fa-edit"></i>
        </button>
      </router-link>

      <button class="  btn btn-danger mt-2" type="submit">
        <i class="fas fa-trash-alt"></i>
      </button>
    </td>
  </tr>
</template>

<script>
export default {
  props: ["cliente", 'index'],
};
</script>

<style></style>
