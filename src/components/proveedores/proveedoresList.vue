<template>
  
								<tr>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
                                <td>
										<a href="editar_proveedor.php?id=<?php echo $data['codproveedor']; ?>" class="btn btn-success"><i class='fas fa-edit'></i> Editar</a>
										<form action="eliminar_proveedor.php?id=<?php echo $data['codproveedor']; ?>" method="post" class="confirmar d-inline">
											<button class="btn btn-danger" type="submit"><i class='fas fa-trash-alt'></i> </button>
										</form>
									</td>
								</tr>
</template>

<script>
export default {
props:['proveedor']
}
</script>

<style>

</style>