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
        <div v-show="dataCliente">
          
<h5>
          {{datosCliente.nombre}} {{datosCliente.apellido}} 
  </h5> 
  <p>
           {{datosCliente.dni}}
    </p>         
          </div>
        <div v-show="!dataCliente">
          <label for="buscarCliente">busqueda de cliente</label>

        <input autocomplete="off" v-model="buscarClientes" id="buscarCliente" type="text" class="form-control mb-2" />
        <div class="resultado" v-if="buscarClientes">
          <select
          multiple
           
            class="custom-select scrollbar-light-blue"
            
            v-model="cliente"
          >

            <option @click="selectCliente(item)" 
              v-for="(item) in clientes"
              :key="item._id"
              :value="item._id"
              v-show="item.nombre.toLowerCase().indexOf(buscarClientes.toLowerCase()) != -1||
              item.dni.toLowerCase().indexOf(buscarClientes.toLowerCase()) != -1"
            >
              {{ item.nombre }}
            </option>
            
          </select>
        </div>
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
                    type="text"
                    class="form-control form-control-md"
                    name="txt_cod_producto"
                    id="txt_cod_producto"
                    v-model="buscarProducto"
                  />
                   <div class="resultado2" v-if="buscarProducto" >
                     
          <select
          multiple
           
            class="custom-select scrollbar-light-blue"
            
            v-model="producto"
          >

            <option 
              v-for="(item) in productos"
              :key="item._id"
              :value="item._id"
              v-show="item.codigo.toLowerCase().indexOf(buscarProducto.toLowerCase()) != -1"
            >
              {{ item.nombre }}
            </option>
            
          </select>
        </div>
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
  props:['param'],
  setup() {
      
    let store = useStore();
    store.dispatch("getProductos");
    store.dispatch("getClientes");
    let cliente = ref('')
    let buscarProducto= ref('')
   let dataClientes = computed(()=>store.state.dataCliente)
   let datosClientes = computed(()=>store.state.datosCliente)
   let dataCliente = ref(dataClientes.value)
   let datosCliente = ref(datosClientes.value)
      let buscarClientes= ref('')
    function selectCliente(cliente) {
      buscarClientes.value = ""
      dataCliente.value =true
      store.dispatch('guardarCliente', cliente)
      datosCliente.value =cliente
    }
    const sendUrl = () => {
      const ruta = { ruta: "/ventas/add" };
      store.dispatch("sendUrl", ruta);
    };
   let producto = ref ({})
    let productos = computed(() => store.state.productosTrue);
    let clientes = computed(() => store.state.clientesActivos);

    return { producto,buscarProducto,sendUrl,selectCliente, productos,buscarClientes, clientes, cliente, dataCliente,datosCliente };
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

.resultado2 {
  background: #ececec;
  position: absolute;
  z-index: 150;
  border-radius: 0.5rem;
  width: 20%;
  max-height: 30vh;
}
@media screen and (max-width: 500px){
  .resultado2 {
  background: #ececec;
  position: absolute;
  z-index: 150;
  border-radius: 0.5rem;
  width: 55%;
  max-height: 30vh;
}}
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