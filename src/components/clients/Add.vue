<template>
<div class="container-fluid">

    <!-- Page Heading -->
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 class="h3 mb-0 text-gray-800">Panel de Administración</h1>
        <router-link :to="ruta" class="btn btn-primary">Regresar</router-link>
    </div>

    <!-- Content Row -->
    <div class="row">
        <div class="col-lg-6 m-auto">
            <form action="" method="post" autocomplete="off">
                <div class="form-group">
                    <label for="dni">Dni</label>
                    <input type="number" placeholder="Ingrese dni" name="dni" id="dni" class="form-control">
                </div>
                <div class="form-group">
                    <label for="nombre">Nombre</label>
                    <input type="text" placeholder="Ingrese Nombre" name="nombre" id="nombre" class="form-control">
                </div>
                <div class="form-group">
                    <label for="telefono">Teléfono</label>
                    <input type="number" placeholder="Ingrese Teléfono" name="telefono" id="telefono" class="form-control">
                </div>
                <div class="form-group">
                    <label for="direccion">Dirección</label>
                    <input type="text" placeholder="Ingrese Direccion" name="direccion" id="direccion" class="form-control">
                </div>
                <input type="submit" value="Guardar Cliente" class="btn btn-primary">
            </form>
        </div>
    </div>


</div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import {useStore} from 'vuex'
export default {
    setup(){
        let store = useStore()


const ruta = computed (() => store.state.linkclientes )
return{
    ruta
}
}


}
</script>

<style>

</style>