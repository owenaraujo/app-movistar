<template>
  <div class="container-fluid">
    <!-- Content Row -->
    <div class="row">
        <div class="col-lg-6 m-auto">
            <div class="card-header bg-primary text-white">
                Registro de Proveedor
            </div>
            <div class="card">
                <form action="" autocomplete="off" method="post" class="card-body p-2">
                    <div class="form-group">
                        <label for="nombre">NOMBRE</label>
                        <input type="text" placeholder="Ingrese nombre" name="proveedor" id="nombre" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="contacto">RUC</label>
                        <input type="text" placeholder="Ingrese nombre del contacto" name="contacto" id="contacto" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="telefono">TELÉFONO</label>
                        <input type="number" placeholder="Ingrese teléfono" name="telefono" id="telefono" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="direccion">DIRECIÓN</label>
                        <input type="text" placeholder="Ingrese Direccion" name="direccion" id="direcion" class="form-control">
                    </div>
                    <input type="submit" value="Guardar Proveedor" class="btn btn-primary">
                    <router-link to="/proveedores" class="btn btn-danger">Regresar</router-link>
                </form>
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