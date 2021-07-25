<template>
  <div v-if="usuario.rol.grado <= 2" class="container-fluid">

	<!-- Page Heading -->
	<div class="d-sm-flex align-items-center justify-content-between mb-4">
		<h1 class="h3 mb-0 text-gray-800">Clientes</h1>
		<router-link to="/clientes/add" @click="sendUrl()" class=" mt-2 btn btn-primary">Nuevo</router-link>
	</div>

	<div class="row">
		<div class="col-lg-12">

			<div class="table-responsive" >
				<table class="table table-striped table-bordered " id="table" >
					<thead class="thead-dark">
						<tr>
							<th>#</th>
							<th>DNI</th>
							<th>NOMBRE</th>
							<th>TELEFONO</th>
							<th>DIRECCIÓN</th>
							<th>ACCIONES</th>
						</tr>
					</thead>
					<tbody>
						
							<Lista  v-show="
                  cliente.dni.toLowerCase().indexOf(param.toLowerCase()) !=
                    -1 ||
                    cliente.nombre
                      .toLowerCase()
                      .indexOf(param.toLowerCase()) != -1
                " :index="index" :cliente="cliente" v-for="(cliente, index ) of clientes" :key="cliente._id"/>
					</tbody>
			<tfoot class="thead-dark">
						<tr>
							<th>ID</th>
							<th>DNI</th>
							<th>NOMBRE</th>
							<th>TELEFONO</th>
							<th>DIRECCIÓN</th>
							<th>ACCIONES</th>
						</tr>
					</tfoot>
				</table>
			</div>

		</div>
	</div>


</div>
<NoAccess v-else/> 
</template>

<script>
import NoAccess from '../403.vue'
import Lista from './clientesList.vue'
import {useStore} from 'vuex'
import { computed } from '@vue/runtime-core'
export default {
	props:['param'], 
	components:{
 NoAccess,
Lista
	},
setup(){
	let store = useStore()

	store.dispatch('getClientes')
const clientes = computed (()=>store.state.clientes)
let usuario = computed (()=>store.state.usuario)
	const sendUrl = ()=>{
        const ruta = {ruta :"/clientes"}
        store.dispatch('sendUrl', ruta)

    }
	return{sendUrl, clientes, usuario}
}
}
</script>

<style>
.list-scroll{
	max-height:70vh;
	overflow-y: scroll;
}
</style>