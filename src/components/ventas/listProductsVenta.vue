<template>
     <tr>
        
               <th>{{producto.codigo}}</th>
               <th>{{producto.marca }}-{{producto.modelo}}</th>
               <th class="">
                   <div class="form-row align-items-center" v-for="(item, index) of producto.imei" :key="index" >
                   <input  class="form-control col-md-9 my-1" placeholder="imei" v-model.number="Producto.imei[index].value" type="number">
               <button @click="deleteOneItem(index)" class="btn btn-danger ml-2 col-md-2 my-1"><i class="fas fa-trash"></i></button>
               </div>
               </th>
               <th>{{producto.cantidad}}</th>
               <th>{{producto.precio}}</th>
               
             
               <th>{{total}}</th>
               <th><button @click="deleteProduct(indice)" class="btn btn-danger"> <i class="svg-inline--fa fas fa-trash-alt fa-w-14"></i> Eliminar</button></th>
             </tr>
</template>
<script>
import { computed, ref } from '@vue/runtime-core'
import { useStore } from 'vuex'
export default {
    props:['producto', 'indice'],
    setup(props) {
        const store= useStore()
        let Producto = ref(props.producto)
         let total = computed(()=>{
let obj = Producto.value
let iva = (obj.precio  * obj.iva / 100)*obj.cantidad
let totalSinIva = obj.precio * obj.cantidad

if (!totalSinIva) totalSinIva = 0
if (!iva) iva = 0

return totalSinIva + iva
      
    })
    function deleteOneItem(indice) {
        
        store.dispatch('resProducto',{id : Producto.value.producto_id,indice: indice} )
        Producto.value.imei.splice(indice, 1)
       
    }
    function deleteProduct(indice) {
    store.dispatch('deleteStore',indice)
        
    }
    return{total, deleteProduct, Producto, deleteOneItem}
    }
}
</script>