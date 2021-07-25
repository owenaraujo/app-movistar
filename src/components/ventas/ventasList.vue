<template>
  <tr>
    <td>{{ numeralFormat(venta.factura, "000000") }}</td>
    <td>{{ formatTime(venta.createdAt) }}</td>
    <td>{{ total }}</td>
    <td>
      <button @click="pdf" type="button" class="btn btn-primary view_factura">
        Ver
      </button>
      <button
        @click="detalles"
        type="button"
        class="btn btn-secondary view_factura ml-2"
      >
        detalles
      </button>
    </td>
  </tr>

  <div v-if="modalInfo">
    <div
      class="modal fade show"
      id="staticBackdrop"
      data-backdrop="static"
      data-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      style="display: block"
      aria-modal="true"
    >
      <div class="modal-dialog modal-center">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
            <button
              type="button"
              class="close"
              @click="modalInfo = false"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <h5>Creada por : {{ venta.user_id.username }}</h5>
            <span>
              fecha: <strong>{{ formatTime(venta.createdAt) }}</strong>
            </span>
			<p>productos:</p>
			<ul>
				<li v-for="(item, index) of venta.productos" :key="index">
					{{item.producto_id.nombre}} <strong>({{item.precio}}$ + {{item.iva}}% IVA)</strong>
					<ul> 
						<li aria-placeholder="title" v-for="(imei, index) in item.imei" :key="index">{{imei.value}}</li>
					</ul>
				</li>
			</ul>
			total : {{numeralFormat(total * venta.dolar)}} ({{total}}$)
          </div>
          <div class="modal-footer">
            <button
              @click="modalInfo = false"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Cerrar
            </button>
            <button @click="guardarCompra()" class="btn btn-primary">
              Comprar
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade show"></div>
  </div>
</template>
<script>
import { ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
import formatDate from "moment";

export default {
  props: ["venta"],
  setup(props) {
    function formatTime(time) {
      return formatDate(time).format("L");
    }
    let store = useStore();
    let venta = ref(props.venta);
    let productos = venta.value;
    let modalInfo = ref(false);
    function pdf() {
      store.dispatch("guardarVenta", venta.value);
      store.dispatch("generarPdf");
    }
    let total = computed(() =>
      productos.productos.reduce(
        (sum, item) =>
          sum + ((item.precio * item.iva) / 100 + item.precio) * item.cantidad,
        0
      )
    );
	let dolar = computed(()=>store.state.system.info.dolar)
    function detalles() {
      modalInfo.value = true;
    }

    return { total, pdf, formatTime, modalInfo, detalles, dolar };
  },
};
</script>