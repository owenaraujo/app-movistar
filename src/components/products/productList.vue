<template>
<tr >
                <td>{{producto.nombre}}</td>
                <td></td>
                <td></td>
                <td></td>

                <td>
                  <a
                    href=""
                    class="btn btn-primary"
                    ><i class="fas fa-audio-description"></i
                  ></a>

                  <a
                    href="
                    "
                    class="btn btn-success"
                    ><i class="fas fa-edit"></i
                  ></a>

                  <form
                    action=""
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
props:['producto']
}
</script>

<style>

</style>