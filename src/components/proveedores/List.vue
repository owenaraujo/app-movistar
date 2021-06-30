<template>
  <div class="container-fluid">

	<!-- Page Heading -->
	<div class="d-sm-flex align-items-center justify-content-between mb-4">
		<h1 class="h3 mb-0 text-gray-800">Proveedores</h1>
		<router-link to="/proveedores/add" class="btn btn-primary">Nuevo</router-link>
	</div>

	<div class="row">
		<div class="col-lg-12">
			<div class="table-responsive">
				<table class="table table-striped table-bordered" id="table">
					<thead class="thead-dark">
						<tr>
							<th>ID</th>
							<th>RUC</th>
							<th>PROVEEDOR</th>
							<th>TELEFONO</th>
							<th>DIRECCION</th>
							<th>ACCIONES</th>
							
						</tr>
					</thead>
					<tbody>
						
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
					</tbody>

				</table>
			</div>

		</div>
	</div>


</div>
</template>

<script>
export default {

}
</script>

<style>

</style>