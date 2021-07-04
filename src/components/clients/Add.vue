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
        <form  autocomplete="off">
          <div class="form-group">
             <div v-for="item in form" :key="item" class="form-floating">
              <label :for="item.value">{{ item.value }}</label>
              <input v-if="item.number"
                v-model.number="newCliente[item.value]" 
                :class="{'is-invalid' : newCliente[item.value] === ''}"
                type="number"
                :placeholder="'Ingrese ' + item.value"
                :id="item.value"
                class="form-control"
              />
              <input v-else
                v-model="newCliente[item.value]" 
                :class="{'is-invalid' : newCliente[item.value] === ''}"
                type="text"
                :placeholder="'Ingrese ' + item.value"
                :id="item.value"
                class="form-control"
              />
            </div>
            </div>
          <button
            type="submit"
            v-if="!newCliente.boton"
           @click.prevent="save()" 
            class="btn btn-primary"
          >Guardar Cliente</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
  setup() {
   let form = [
     {value : 'dni',number: true},
     { value:'nombre'},
     { value:'apellido'},
      {value:'telefono', number: true},
       {value: 'direccion'}
       ] 
    let store = useStore();
let newCliente = ref({
  dni: null, nombre: null, telefono: null, direccion : null, boton: false
}) 
const save = ()=>{

  let value = newCliente.value
 if(!value.dni) return value.dni = '';
 if(!value.nombre) return value.nombre = '';
 if(!value.telefono) return value.telefono = '';
 if(!value.direccion) return value.direccion = '';
 newCliente.value.boton = true
 console.log(value);
 newCliente.value = {}
 newCliente.value.boton = false

}
    const ruta = computed(() => store.state.linkclientes);
    return {
      ruta, newCliente, form, save
    };
  },
};
</script>

<style></style>
