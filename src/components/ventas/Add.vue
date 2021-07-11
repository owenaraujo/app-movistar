<template>
  <div class="container-fluid">
    <div class="text-right">
      <router-link
        to="/clientes/add"
        @click="sendUrl()"
        class="mt-2 btn btn-primary text-rigth btn_new_cliente"
        ><i class="fas fa-user-plus"></i> Nuevo Cliente</router-link
      >
    </div>
    <div class="row">
      <div class="col-sm-3">
        <h4 class="">Datos del Cliente</h4>
        <label for="buscarCliente">busqueda de cliente</label>
{{cliente}}
        <input id="buscarCliente" type="text" class="form-control mb-2" />
        <div class="resultado">
          <select
            :class="{ 'd-none': busquedaCliente }"
            class="custom-select scrollbar-light-blue"
            multiple
            v-model="cliente"
          >
            <option selected>Open this select menu</option>

            <option
              v-for="(item, index) in clientes"
              :key="index"
              :value="item._id"
            >
              {{ item.nombre }}
            </option>
          </select>
        </div>
      </div>
      <div class="col-lg-12">
        <h4 class="text-center">Datos Venta</h4>
        <div class="row">
          <div class="col-lg-6">
            <div class="form-group">
              <label><i class="fas fa-user"></i> VENDEDOR</label>
              <p
                style="font-size: 16px; text-transform: uppercase; color: blue"
              ></p>
            </div>
          </div>
        </div>
        <div class="table-responsive">
          <table class="table table-hover">
            <thead class="thead-dark">
              <tr>
                <th width="100px">Código</th>
                <th>Des.</th>
                <th>Stock</th>
                <th width="100px">Cantidad</th>
                <th class="textright">Precio</th>
                <th class="textright">Precio Total</th>
                <th>Acciones</th>
              </tr>
              <tr>
                <td>
                  <input
                    type="number"
                    name="txt_cod_producto"
                    id="txt_cod_producto"
                  />
                </td>
                <td id="txt_descripcion">-</td>
                <td id="txt_existencia">-</td>
                <td>
                  <input
                    type="text"
                    name="txt_cant_producto"
                    id="txt_cant_producto"
                    value="0"
                    min="1"
                    disabled
                  />
                </td>
                <td id="txt_precio" class="textright">0.00</td>
                <td id="txt_precio_total" class="txtright">0.00</td>
                <td>
                  <a
                    href="#"
                    id="add_product_venta"
                    class="btn btn-dark"
                    style="display: none"
                    >Agregar</a
                  >
                </td>
              </tr>
              <tr>
                <th>Código</th>
                <th colspan="2">Descripción</th>
                <th>Cantidad</th>
                <th class="textright">Precio</th>
                <th class="textright">Precio Total</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody id="detalle_venta">
              <!-- Contenido ajax -->
            </tbody>

            <tfoot id="detalle_totales">
              <!-- Contenido ajax -->
            </tfoot>
          </table>
        </div>
        <div class="col-lg-12 text-center">
          <label>Acciones</label>
          <div id="acciones_venta" class="form-group">
            <buttom href="#" class="btn btn-danger mr-2" id="btn_anular_venta"
              >Anular</buttom
            >
            <button class="btn btn-primary" id="btn_facturar_venta">
              <i class="fas fa-save"></i> Generar Venta
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, ref } from "@vue/reactivity";
export default {
  setup() {
      let cliente = ref('')
    let store = useStore();
    store.dispatch("getProductos");
    store.dispatch("getClientes");
    const sendUrl = () => {
      const ruta = { ruta: "/ventas/add" };
      store.dispatch("sendUrl", ruta);
    };
    let busquedaCliente = ref(false);
    let productos = computed(() => store.state.productosTrue);
    let clientes = computed(() => store.state.clientes);

    return { sendUrl, productos, clientes, busquedaCliente, cliente };
  },
};
</script>

<style>
.resultado {
  background: #ececec;
  position: absolute;
  z-index: 150;
  border-radius: 0.5rem;
  width: 85%;
  max-height: 30vh;
}
.scrollbar-light-blue::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: #f5f5f5;
  border-radius: 5px;
}

.scrollbar-light-blue::-webkit-scrollbar {
  width: 10px;
  background-color: #f5f5f5;
}

.scrollbar-light-blue::-webkit-scrollbar-thumb {
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: #4e73df;
}
</style>