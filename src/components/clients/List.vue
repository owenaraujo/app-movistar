<template>
  <div class="container-fluid">

	<!-- Page Heading -->
	<div class="d-sm-flex align-items-center justify-content-between mb-4">
		<h1 class="h3 mb-0 text-gray-800">Clientes</h1>
		<router-link to="/clientes/add" @click="sendUrl()" class="btn btn-primary">Nuevo</router-link>
	</div>

	<div class="row">
		<div class="col-lg-12">

			<div class="table-responsive">
				<table class="table table-striped table-bordered" id="table">
					<thead class="thead-dark">
						<tr>
							<th>ID</th>
							<th>DNI</th>
							<th>NOMBRE</th>
							<th>TELEFONO</th>
							<th>DIRECCIÓN</th>
							<th>ACCIONES</th>
						</tr>
					</thead>
					<tbody>
						
								<tr>
									<td>
                                        </td>
									<td>
                                        </td>
									<td>
                                        </td>
									<td>
                                        </td>
									<td>
                                        
                                    </td>
									
									<td>
										<a href="editar_cliente.php?id=<?php echo $data['idcliente']; ?>" class="btn btn-success"><i class='fas fa-edit'></i></a>
										<form action="eliminar_cliente.php?id=<?php echo $data['idcliente']; ?>" method="post" class="confirmar d-inline">
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
import {useStore} from 'vuex'
export default {
setup(){
	let store = useStore()

	const sendUrl = ()=>{
        const ruta = {ruta :"/clientes"}
        store.dispatch('sendUrl', ruta)

    }
	return{sendUrl}
}
}
</script>

<style>

</style>