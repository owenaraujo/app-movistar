<template>
    <tr>
								<td>{{numeralFormat(venta.factura, "000000")}}</td>
								<td>{{venta.createdAt}}</td>
								<td>{{total}}</td>
									<td>
										<button @click="pdf" type="button" class="btn btn-primary view_factura" cl="<?php echo $dato['codcliente'];  ?>" f="<?php echo $dato['nofactura']; ?>">Ver</button>
									</td>
								</tr>
</template>
<script>
import { ref } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
import { useStore } from 'vuex'
export default {
    props:['venta',],
	setup(props){
		let store = useStore()
		let venta = ref(props.venta)
		let productos = venta.value
function pdf() {
	store.dispatch('guardarVenta', venta.value)
	store.dispatch('generarPdf')
}
		let total = computed(()=> productos.productos.reduce(
			
        (sum, item) => sum + (( item.precio * item.iva) / 100 +item.precio)* item.cantidad ,0
		))
	return{total, pdf}
	}


}
</script>