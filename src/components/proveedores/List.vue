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
							<th>RIF</th>
							<th>PROVEEDOR</th>
							<th>TELEFONO</th>
							<th>DIRECCION</th>
							<th>ACCIONES</th>
							
						</tr>
					</thead>
					<tbody>
						<List v-for="proveedor in proveedores" :proveedor="proveedor" :key="proveedor._id"/>
					</tbody>

				</table>
			</div>

		</div>
	</div>


</div>
</template>

<script>
import List from "./proveedoresList.vue"
import { useStore} from 'vuex'
import { computed } from '@vue/runtime-core'
export default {
components:{List},
setup(){
	const store = useStore()
	function get(){
		store.dispatch('getProveedores')
	}
	get()
	const proveedores = computed(()=> store.state.proveedores)
	return{proveedores}
}
}

</script>

<style>

</style>