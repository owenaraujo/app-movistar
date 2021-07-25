<template>
  <div v-if="usuario.rol.grado <=1" class="container-fluid">

	<!-- Page Heading -->
	<div class="d-sm-flex align-items-center justify-content-between mb-4">
		<h1 class="h3 mb-0 text-gray-800">Usuarios</h1>
		<router-link to="/usuarios/add"  class="btn btn-primary mt-2">Nuevo</router-link>
	</div>

	<div class="row">
		<div class="col-lg-12">
			<div class="table-responsive">
				<table class="table table-striped table-bordered" id="table">
					<thead class="thead-dark">
						<tr>
							<th>#</th>
							<th>CORREO</th>
							<th>USUARIO</th>
							<th>ACCIONES</th>
						</tr>
					</thead>
					<tbody>
					
						<List  v-show="
                usuario.username.toLowerCase().indexOf(param.toLowerCase()) !=
                    -1 ||
                    usuario.email.toLowerCase().indexOf(param.toLowerCase()) != -1
                " v-for="(usuario, index) of usuarios" :key="index" :indice="index" :usuario="usuario"/>
					</tbody>

				</table>
			</div>

		</div>
	</div>


</div>
<NoAccess v-else/>
</template>

<script>
import NoAccess from '../403.vue'
import { computed } from '@vue/runtime-core'
import { useStore} from 'vuex'
import List from "./userList.vue"
export default {
	props: ['param'],
	components:{List, NoAccess},
	setup(){
		const store = useStore()
		let usuario = computed(()=> store.state.usuario)
		store.dispatch('getUsuarios')
		const usuarios = computed (()=> store.state.usuarios)
		return{usuarios, usuario}
	}
 
}
</script>

<style>

</style>