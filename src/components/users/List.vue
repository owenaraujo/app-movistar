<template>
  <div class="container-fluid">

	<!-- Page Heading -->
	<div class="d-sm-flex align-items-center justify-content-between mb-4">
		<h1 class="h3 mb-0 text-gray-800">Usuarios</h1>
		<router-link to="/usuarios/add"  class="btn btn-primary">Nuevo</router-link>
	</div>

	<div class="row">
		<div class="col-lg-12">
			<div class="table-responsive">
				<table class="table table-striped table-bordered" id="table">
					<thead class="thead-dark">
						<tr>
							<th>ID</th>
							<th>NOMBRE</th>
							<th>CORREO</th>
							<th>USUARIO</th>
							<th>DIRECCIÓN</th>
							<th>ACCIONES</th>
						</tr>
					</thead>
					<tbody>
					
						<List v-for="cliente in clientes" :key="cliente.id" :cliente="cliente"/>
					</tbody>

				</table>
			</div>

		</div>
	</div>


</div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { useStore} from 'vuex'
import List from "./userList.vue"
export default {
	components:{List},
	setup(){
		const store = useStore()
		const clientes = computed (()=> store.state.clientes)
		return{clientes}
	}
 
}
</script>

<style>

</style>