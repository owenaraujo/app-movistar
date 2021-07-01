<template>
  <tr>
    <td>{{ cliente.id }}</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>

    <td class="">
      <router-link to="">
        <button class="btn btn-success mr-2 mt-2" type="submit">
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
  props: ["cliente"],
};
</script>

<style></style>
