<template>
  <div>
      <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

	<!-- Sidebar - Brand -->
	<router-link style="height:9vh" class="sidebar-brand d-flex align-items-center justify-content-center" to="/">
		<div class="sidebar-brand-icon rotate-n-15">
			<img src="/img/logo.png" class="img-thumbnail">
		</div>
		<div class="sidebar-brand-text mx-3">Vida Informático</div>
	</router-link>

	<!-- Divider -->
	<hr class="sidebar-divider my-0">

	<!-- Divider -->
	<hr class="sidebar-divider">

	<!-- Heading -->
	<div class="sidebar-heading">
		Interface
	</div>

	<!-- Nav Item - Pages Collapse Menu -->
	<li class="nav-item">
		<router-link class="nav-link collapsed" to="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
			<i class="fas fa-fw fa-cog mr-3"></i>
			<span>Ventas</span>
		</router-link>
		<div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
			<div class="bg-white py-2 collapse-inner rounded">
				<router-link class="collapse-item" to="/ventas/add">Nueva venta</router-link>
				<router-link class="collapse-item" to="/ventas/">Ventas</router-link>
			</div>
		</div>
	</li>

	<!-- Nav Item - Productos Collapse Menu -->
	<li class="nav-item">
		<router-link class="nav-link collapsed" to="#" data-toggle="collapse" data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
			<i class="fas fa-fw fa-wrench  mr-3"></i>
			<span>Productos</span>
		</router-link>
		<div id="collapseUtilities" class="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
			<div class="bg-white py-2 collapse-inner rounded">
				<router-link class="collapse-item" to="/productos/add">Nuevo Producto</router-link>
				<router-link class="collapse-item" to="/productos">Productos</router-link>
			</div>
		</div>
	</li>

	<!-- Nav Item - Clientes Collapse Menu -->
	<li class="nav-item">
		<router-link class="nav-link collapsed" to="#" data-toggle="collapse" data-target="#collapseClientes" aria-expanded="true" aria-controls="collapseUtilities">
			<i class="fas fa-users  mr-3"></i>
			<span>Clientes</span>
		</router-link>
		<div id="collapseClientes" class="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
			<div class="bg-white py-2 collapse-inner rounded">
				<router-link class="collapse-item" to="/clientes/add">Nuevo Clientes</router-link>
				<router-link class="collapse-item" to="/clientes">Clientes</router-link>
			</div>
		</div>
	</li>
	<!-- Nav Item - Utilities Collapse Menu -->
	<li class="nav-item">
		<router-link class="nav-link collapsed" to="#" data-toggle="collapse" data-target="#collapseProveedor" aria-expanded="true" aria-controls="collapseUtilities">
			<i class="fas fa-hospital  mr-3"></i>
			<span>Proveedor</span>
		</router-link>
		<div id="collapseProveedor" class="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
			<div class="bg-white py-2 collapse-inner rounded">
				<router-link class="collapse-item" to="/proveedores/add">Nuevo Proveedor</router-link>
				<router-link class="collapse-item" to="/proveedores">Proveedores</router-link>
			</div>
		</div>
	</li>
	
		<!-- Nav Item - Usuarios Collapse Menu -->
		<li class="nav-item">
			<router-link class="nav-link collapsed" to="#" data-toggle="collapse" data-target="#collapseUsuarios" aria-expanded="true" aria-controls="collapseUtilities">
				<i class="fas fa-user  mr-3"></i>
				<span>Usuarios</span>
			</router-link>
			<div id="collapseUsuarios" class="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
				<div class="bg-white py-2 collapse-inner rounded">
					<router-link class="collapse-item" to="/usuarios/add">Nuevo Usuario</router-link>
					<router-link class="collapse-item" to="/usuarios">Usuarios</router-link>
				</div>
			</div>
		</li>
	

</ul>
  </div>
</template>

<script>
export default {

}
</script>

<style>




</style>