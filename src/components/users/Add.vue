<template>
  <div class="container-fluid">
    <!-- Page Heading -->
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 text-gray-800">Panel de Administración</h1>
        <router-link to="/usuarios" class="btn btn-primary">Regresar</router-link>
    </div>

    <!-- Content Row -->
    <div class="row">
        <div class="col-lg-6 m-auto">
            <form action="" method="post" autocomplete="off">
             
                <div class="form-group">
                    <label for="nombre">Nombre</label>
                    <input type="text" class="form-control" placeholder="Ingrese Nombre" name="nombre" id="nombre">
                </div>
                <div class="form-group">
                    <label for="correo">Correo</label>
                    <input type="email" class="form-control" placeholder="Ingrese Correo Electrónico" name="correo" id="correo">
                </div>
                <div class="form-group">
                    <label for="usuario">Usuario</label>
                    <input type="text" class="form-control" placeholder="Ingrese Usuario" name="usuario" id="usuario">
                </div>
                <div class="form-group">
                    <label for="clave">Contraseña</label>
                    <input type="password" class="form-control" placeholder="Ingrese Contraseña" name="clave" id="clave">
                </div>
                <div class="form-group">
                    <label>Rol</label>
                    <select name="rol" id="rol" class="form-control">
                       
                                <option value=""></option>
                       

                    </select></div>
                <input type="submit" value="Guardar Usuario" class="btn btn-primary">
            </form>
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