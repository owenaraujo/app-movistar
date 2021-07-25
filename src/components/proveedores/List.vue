<template>
  <div v-if="usuario.rol.grado <=2" class="container-fluid">

	<!-- Page Heading -->
	<div class="d-sm-flex align-items-center justify-content-between mb-4">
		<h1 class="h3 mb-0 text-gray-800">Proveedores</h1>
		<router-link to="/proveedores/add" class="btn btn-primary mt-2">Nuevo</router-link>
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
							<th v-if="usuario.rol.grado <=1">ACCIONES</th>
							
						</tr>
					</thead>
					<tbody>
						<List :access ="usuario.rol.grado" v-show="proveedor.nombre.toLowerCase().indexOf(param.toLowerCase()) !== -1||
  proveedor.rif.toLowerCase().indexOf(param.toLowerCase()) !== -1" v-for="proveedor in proveedores" :proveedor="proveedor" :key="proveedor._id"/>
					</tbody>

				</table>
			</div>

		</div>
	</div>


</div>
<NoAccess v-else/>
</template>

<script>
import List from "./proveedoresList.vue"
import { useStore} from 'vuex'
import NoAccess from '../403.vue'
import { computed } from '@vue/runtime-core'
export default {
	components:{List, NoAccess},
	props:['param'],
setup(){
	const store = useStore()
	let usuario = computed(()=> store.state.usuario)
		store.dispatch('getProveedores')
	
	const proveedores = computed(()=> store.state.proveedores)
	return{proveedores, usuario}
}
}

</script>

<style>

</style>