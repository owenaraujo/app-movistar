<template>
  
      <div class="container-fluid">

	<!-- Page Heading -->
	<div class="d-sm-flex align-items-center justify-content-between mb-4">
		<!-- <h1 class="h3 mb-0 text-gray-800">Panel de Administración</h1> -->
	</div>

	<!-- Content Row -->
	<div class="row">

		<!-- Earnings (Monthly) Card Example -->
		<router-link class="col-xl-3 col-md-6 mb-4" to="/usuarios">
			<div class="card border-left-primary shadow h-100 py-2">
				<div class="card-body">
					<div class="row no-gutters align-items-center">
						<div class="col mr-2">
							<div class="text-xs font-weight-bold text-primary text-uppercase mb-1">Usuarios</div>
							<div class="h5 mb-0 font-weight-bold text-gray-800"></div>
						</div>
						<div class="col-auto">
							<i class="fas fa-user fa-2x text-gray-300"></i>
						</div>
					</div>
				</div>
			</div>
		</router-link>

		<!-- Earnings (Monthly) Card Example -->
		<router-link class="col-xl-3 col-md-6 mb-4" to="/clientes">
			<div class="card border-left-success shadow h-100 py-2">
				<div class="card-body">
					<div class="row no-gutters align-items-center">
						<div class="col mr-2">
							<div class="text-xs font-weight-bold text-success text-uppercase mb-1">Clientes</div>
							<div class="h5 mb-0 font-weight-bold text-gray-800"></div>
						</div>
						<div class="col-auto">
							<i class="fas fa-users fa-2x text-gray-300"></i>
						</div>
					</div>
				</div>
			</div>
		</router-link>

		<!-- Earnings (Monthly) Card Example -->
		<router-link class="col-xl-3 col-md-6 mb-4" to="/productos">
			<div class="card border-left-info shadow h-100 py-2">
				<div class="card-body">
					<div class="row no-gutters align-items-center">
						<div class="col mr-2">
							<div class="text-xs font-weight-bold text-info text-uppercase mb-1">Productos</div>
							<div class="row no-gutters align-items-center">
								<div class="col-auto">
									<div class="h5 mb-0 mr-3 font-weight-bold text-gray-800"></div>
								</div>
								<!-- <div class="col">
									<div class="progress progress-sm mr-2">
										<div class="progress-bar bg-info" role="progressbar" style="width: 50%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
									</div>
								</div> -->
							</div>
						</div>
						<div class="col-auto">
							<i class="fas fa-clipboard-list fa-2x text-gray-300"></i>
						</div>
					</div>
				</div>
			</div>
		</router-link>

		<!-- Pending Requests Card Example -->
		<router-link class="col-xl-3 col-md-6 mb-4" to="/ventas">
			<div class="card border-left-warning shadow h-100 py-2">
				<div class="card-body">
					<div class="row no-gutters align-items-center">
						<div class="col mr-2">
							<div class="text-xs font-weight-bold text-warning text-uppercase mb-1">Ventas</div>
							<div class="h5 mb-0 font-weight-bold text-gray-800"></div>
						</div>
						<div class="col-auto">
							<i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
						</div>
					</div>
				</div>
			</div>
		</router-link>
	</div>
	<!-- Page Heading -->
	<div class="d-sm-flex align-items-center justify-content-between mb-4">
		<!-- <h1 class="h3 mb-0 text-gray-800">Configuración</h1> -->
	</div>
	<div class="row">
		<div class="col-lg-6">
			<div class="card">
				<div class="card-header bg-primary text-white">
					Información Personal
				</div>
				<div class="card-body">
					<div class="form-group">
						<label>Nombre: <strong></strong></label>
					</div>
					<div class="form-group">
						<label>Correo: <strong></strong></label>
					</div>
					<div class="form-group">
						<label>Rol: <strong></strong></label>
					</div>
					<div class="form-group">
						<label>Usuario: <strong></strong></label>
					</div>
					
				</div>
			</div>
		</div>
		
	
			<div class="col-lg-6">
				<div class="card">
					<div class="card-header bg-primary text-white">
						Datos de la Empresa
					</div>
					<div class="card-body">
						<div class="p-1">
							<div class="form-group">
								<strong>RIF:</strong>
								<h6></h6>
							</div>
							<div class="form-group">
								<strong>Nombre:</strong>
								<h6></h6>
							</div>
							
							<div class="form-group">
								<strong>Teléfono:</strong>
							
							</div>
							<div class="form-group">
								<strong>Correo Electrónico:</strong>
								<h6></h6>
							</div>
							<div class="form-group">
								<strong>Dirección:</strong>
								<h6></h6>
							</div>
							<div class="form-group">
								<strong>IVA (%):</strong>
								<h6></h6>
							</div>

						</div>
					</div>
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