<template>
  <div>
    <div class="container-fluid mt-2">
      <!-- Page Heading -->
      <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 text-gray-800">Panel de Administración</h1>
        <router-link to="/productos" class="btn btn-primary"
          >Regresar</router-link
        >
      </div>

      <!-- Content Row -->
      <div class="row">
        <div class="col-lg-6 m-auto">
          <div  autocomplete="off">
            <div class="form-group form-floating mb-3">

              <label>Proveedor</label>
              <select   
              :class="{'is-invalid' : producto.proveedor_id=== ''}" 
              
              id="proveedor" v-model="producto.proveedor_id" name="proveedor" class="form-control">
                <option v-for="proveedor in proveedores" :key="proveedor.id"
                  :value="proveedor.id"
                >{{proveedor.nombre}}</option>
              </select>
            </div>
            <div class=" mb-2" v-for="(item, index) of form" :key="index">
              <label :for="item.valor">{{ item.valor }}</label>
              <input 
              :class="{'is-invalid' : producto[item.valor]=== ''}" 
              v-if="!item.number"
                v-model="producto[item.valor]"
                type="text"
                :placeholder="item.valor"
                :id="item.valor"
                class="form-control"
              />
              <input v-if="item.number"
              :class="{'is-invalid' : producto[item.valor]=== ''}" 
              
                v-model.number="producto[item.valor]"
                type="Number"
                :placeholder="item.valor"
                :id="item.valor"
                class="form-control"
              />
            </div>

            <button
              @click="sendProduct()"
              value=""
              class="btn btn-primary"
            > Guardar Producto </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import {  useStore } from 'vuex';
import { computed } from '@vue/runtime-core';
//import '../../../public/css/bootstrap5.css'
export default {
  setup() {
    const store = useStore()
    const proveedores = computed(()=> store.state.productos)
    const form = [
      { valor :"nombre"},
      { valor :"marca"},
      { valor :"modelo"},
      { valor :"descripcion"},
      { valor :"cantidad", number : true},
      { valor :"precio", number: true},
      { valor :"codigo"},
      { valor :"iva", number: true},
    ];
    const nombre = ref("");
    let producto = ref({ 
      proveedor_id : null,
      nombre: null
      });
    
    const sendProduct = function() {
     // if(!producto.value.proveedor_id){ producto.value.proveedor_id = "" ;return} 
      if(!producto.value.nombre){ producto.value.nombre = "" ;return} 
      if(!producto.value.marca){ producto.value.marca = "" ;return} 
      if(!producto.value.modelo){ producto.value.modelo = "" ;return} 
      if(!producto.value.descripcion){ producto.value.descripcion = "" ;return} 
      if(!producto.value.cantidad){ producto.value.cantidad = "" ;return} 
      if(!producto.value.precio){ producto.value.precio = "" ;return} 
      if(!producto.value.codigo){ producto.value.codigo = "" ;return} 
console.log(producto.value);

     store.dispatch('saveProduct',  producto.value) 
      producto.value = {proveedor_id: null}
    }
    return { producto, form, nombre, sendProduct, proveedores };
  },
};
</script>

