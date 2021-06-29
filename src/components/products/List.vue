<template>
  <div class="container-fluid">
    <!-- Page Heading -->
    
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">Productos</h1>
      <router-link to="/productos/add" class="btn btn-primary">Nuevo</router-link>
    </div>

    <div class="row">
      <div class="col-lg-12">
        <div class="table-responsive">
          <table class="table table-striped table-bordered" id="table">
            <thead class="thead-dark">
              <tr>
                <th>ID</th>
                <th>PRODUCTO</th>
                <th>PRECIO</th>
                <th>STOCK</th>

                <th>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              <Lista v-for="producto in productos" :key="producto" :producto="producto" />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core';
import {useStore} from 'vuex'
import Lista from './productList.vue'
export default {
  components:{Lista},
  setup(){
    let store = useStore()
    const productos = computed (()=> store.state.productos)
  return{productos}
  }
};
</script>

<style></style>
