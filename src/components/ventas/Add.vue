<template>
  <div v-if="usuario.rol.grado <= 2" class="container-fluid">
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
          <h5 style="font-size: 16px; text-transform: uppercase; color: blue">
            {{ datosCliente.nombre }} {{ datosCliente.apellido }}
          </h5>
          <p>
            {{ datosCliente.dni }}
          </p>
        </div>
        <div v-show="!dataCliente">
          <label for="buscarCliente">busqueda de cliente</label>

          <input
            autocomplete="off"
            v-model="buscarClientes"
            id="buscarCliente"
            type="text"
            class="form-control mb-2"
          />
          <div class="resultado" v-if="buscarClientes">
            <select multiple class="custom-select scrollbar-light-blue">
              <option
                @click="selectCliente(item)"
                v-for="item in clientes"
                :key="item._id"
                :value="item._id"
                v-show="
                  item.nombre
                    .toLowerCase()
                    .indexOf(buscarClientes.toLowerCase()) != -1 ||
                  item.dni
                    .toLowerCase()
                    .indexOf(buscarClientes.toLowerCase()) != -1
                "
              >
                {{ item.nombre }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="col-lg-12">
        <h4 class="text-center">Datos Venta</h4>

        <div class="table-responsive">
          <table ref="table" class="table table-hover">
            <thead class="thead-dark">
              <tr>
                <th width="100px">Código</th>
                <th>modelo</th>
                <th>Stock</th>
                <th width="100px">IVA</th>
                <th class="textright">Precio</th>
                <th class="textright">Precio Total</th>
                <th>Acciones</th>
              </tr>
              <tr>
                <td>
                  <input
                    autocomplete="off"
                    type="text"
                    class="form-control form-control-md"
                    name="txt_cod_producto"
                    id="txt_cod_producto"
                    v-model="buscarProducto"
                  />
                  <div class="resultado2" v-if="buscarProducto">
                    <select multiple class="custom-select scrollbar-light-blue">
                      <option
                        v-for="item in productos"
                        @click="selectProducto(item)"
                        :key="item._id"
                        :value="item._id"
                        v-show="
                          item.codigo
                            .toLowerCase()
                            .indexOf(buscarProducto.toLowerCase()) != -1
                        "
                      >
                        {{ item.nombre }}-{{ item.codigo }}
                      </option>
                    </select>
                  </div>
                </td>
                <td id="txt_descripcion">
                  {{ inputsAgregar.modelo || "-" }}
                </td>
                <td id="txt_existencia">{{ inputsAgregar.cantidad || 0 }}</td>
                <td>
                  <Popper
                    class="dark-popper"
                    arrow
                    hover
                    placement="left"
                    :content="numeralFormat( (total - inputsAgregar.precio )* dolar|| 0  ) + ' Bs'"
                  >
                  {{numeralFormat( total - inputsAgregar.precio, "0,0.0") || 0 }}$
                  </Popper>
                  
                </td>
                <td id="txt_precio" class="textright">
                   <Popper
                    class="dark-popper"
                    arrow
                    hover
                    placement="left"
                    :content="numeralFormat( (inputsAgregar.precio )* dolar|| 0  ) + ' Bs'"
                  >
                   {{ inputsAgregar.precio || 0 }}$(+{{inputsAgregar.iva}}% iva )
                  </Popper>
                 
                </td>
                <td id="txt_precio_total" class="txtright">

                  <Popper
                    class="dark-popper"
                    arrow
                    hover
                    placement="left"
                    :content="numeralFormat( (total )* dolar|| 0  ) + ' Bs'"
                  >
                   {{ total || 0 }}$
                  </Popper>
                  
                  
                  
                  </td>
                <td>
                  <button
                    @click="agregarCarrito()"
                    id="add_product_venta"
                    class="btn btn-dark"
                    v-show="cantidad > 0"
                    :disabled="inputsAgregar.cantidad === 0"
                    v-if="inputsAgregar.cantidad"
                  >
                    Agregar
                  </button>
                </td>
              </tr>
              <tr>
                <th>Código</th>
                <th>modelo</th>
                <th>IMEI</th>
                <th>cantidad</th>
                <th class="textright">Precio</th>
                <th class="textright">Precio Total</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody id="detalle_venta">
              <ListProductos
                v-for="(producto, index) in productosVenta"
                :indice="index"
                :key="index"
                :producto="producto"
              />
            </tbody>

            <tfoot id="detalle_totales">
              <tr>
                <td colspan="6" class="textright">Sub-total</td>
                <td>
                  <Popper
                    class="dark-popper"
                    arrow
                    hover
                    placement="left"
                    :content="numeralFormat(totalVenta * dolar, '0,00') + ' Bs'"
                  >
                    {{ totalVenta }}
                  </Popper>
                </td>
              </tr>
              <tr>
                <td colspan="6" class="textright">iva</td>
                <td>
                  <Popper
                    class="dark-popper"
                    arrow
                    hover
                    placement="left"
                    :content="numeralFormat(iva * dolar) + ' Bs'"
                    >{{ iva }}</Popper
                  >
                </td>
              </tr>
              <tr>
                <td colspan="6" class="textright">total a pagar</td>
                <td>
                  <Popper
                    class="dark-popper"
                    arrow
                    hover
                    placement="left"
                    :content="numeralFormat((iva + totalVenta) * dolar) + ' Bs'"
                  >
                    {{ iva + totalVenta }}
                  </Popper>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div class="col-lg-12 text-center">
          <label>Acciones</label>
          <div class="form-group">
            <button @click="cancelVenta()" class="btn btn-danger mr-2">
              Anular
            </button>
            <button
              @click="preGuardarCompra()"
              class="btn btn-primary"
              id="btn_facturar_venta"
            >
              <i class="fas fa-save"></i> Generar Venta
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

<NoAccess v-else/>
  <!-- modal -->
  <!-- Button trigger modal -->

  <!-- Modal -->
  <div v-if="modalVenta">
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
              @click="modalVenta = false"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
           <div v-if="!statusVenta">
              <div class="form-check">
              <input
                class="form-check-input"
                v-model="prestamo"
                type="checkbox"
                id="defaultCheck1"
              />
              <label class="form-check-label" for="defaultCheck1">
                Reportar venta como prestamo
              </label>
            </div>

            <label for="inputNota"></label>
            <input
              v-model="notaVenta"
              type="text"
              id="inputNota"
              placeholder="agregar una nota"
              class="form-control"
            />
           </div>
           <div v-if="statusVenta" class="text-center">
<p>
            <strong class="mt-4">que desea hacer?</strong> 

</p>
            <br>
             <button @click="newVenta" class="btn btn-primary mr-2">registrar otra venta</button>
             <button @click="generarPdf" class="btn btn-success">inprimir factura</button>
           </div>
          </div>
          <div class="modal-footer">
            <button
              @click="modalVenta = false"
              
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Cerrar
            </button>
            <button
              
              @click="guardarCompra()"
              class="btn btn-primary"
            >
              Comprar
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade show"></div>
  </div>
  <!-- modal -->
</template>

<script>
import NoAccess from '../403.vue'
import { useStore } from "vuex";
import { computed, ref } from "@vue/reactivity";
import ListProductos from "./listProductsVenta.vue";
import Popper from "vue3-popper";
import { createToast } from 'mosha-vue-toastify';
export default {
  props: ["param"],
  components: { ListProductos, Popper, NoAccess },
  setup() {
    //respuestas automaticas
    let store = useStore();
    store.dispatch("getProductos");
    store.dispatch("buscar");
    store.dispatch("getClientes");
    //ref
    
    let dolar = computed(() => store.state.system.info.dolar);
    let modalVenta = ref(false);
    let buscarProducto = ref("");
    let inputsAgregar = ref({});
    let cantidad = ref(1);
    let buscarClientes = ref("");
    //computed
    let toast = computed(()=> store.state.toask)
    let usuario = computed(()=> store.state.usuario)
    let productosVenta = computed(() => store.state.productosVenta);
    let statusVenta = computed(()=> store.state.statusVenta)
    let notaVenta = ref("");
    let prestamo = ref(false);
    let total = computed(() => {
      let obj = inputsAgregar.value;
      let iva = ((obj.precio * obj.iva) / 100) * cantidad.value;
      let totalSinIva = obj.precio * cantidad.value;

      if (!totalSinIva) totalSinIva = 0;
      if (!iva) iva = 0;

      return totalSinIva + iva;
    });
    let dataCliente = computed(() => store.state.dataCliente);
    let datosCliente = computed(() => store.state.datosCliente);
    let totalVenta = computed(() =>
      productosVenta.value.reduce(
        (sum, item) => sum + item.cantidad * item.precio,
        0
      )
    );
    let iva = computed(() =>
      productosVenta.value.reduce(
        (sum, item) => sum + (item.cantidad * item.precio * item.iva) / 100,
        0
      )
    );
    let productos = computed(() => store.state.productosTrue);
    let clientes = computed(() => store.state.clientesActivos);
    //funciones
    function newVenta(){
      store.dispatch("vaciarVenta")
      notaVenta.value = ''
      prestamo.value = false
      modalVenta.value = false

      }
    function selectCliente(cliente) {
      buscarClientes.value = "";

      store.dispatch("guardarCliente", cliente);
    }
    const sendUrl = () => {
      const ruta = { ruta: "/ventas/add" };
      store.dispatch("sendUrl", ruta);
    };
    function preGuardarCompra() {
      if(!dataCliente.value) return createToast('especifique un cliente', toast.value.warning)
      if(productosVenta.value.length ==0) return createToast('no se puede hacer una venta vacia', toast.value.warning)
      let producto = productosVenta.value.map(item =>{
        let imei = item.imei.map(e=>{ 
          if(e.value) return true
          else{ 
            e.value = ''
           return false}
          }
        
        )
        if (imei.indexOf(false) != -1) {
          return false
        }
        else{ return true}
      })
      if(producto.indexOf(false) != -1) return createToast('el campo imei no puede estar vacio', toast.value.warning)
      modalVenta.value = true;
    }

    function selectProducto(producto) {
      buscarProducto.value = "";
      inputsAgregar.value = producto;
    }
    function verifyStock() {
      if (cantidad.value > inputsAgregar.value.cantidad)
        cantidad.value = inputsAgregar.value.cantidad;
    }
    function agregarCarrito() {
      const NewVenta = {
        productName: inputsAgregar.value.nombre,
        modelo: inputsAgregar.value.modelo,
        marca: inputsAgregar.value.marca,
        precio: inputsAgregar.value.precio,
        codigo: inputsAgregar.value.codigo,
        imei: [{ value: null }],
        cantidad: cantidad.value,
        iva: inputsAgregar.value.iva,
        producto_id: inputsAgregar.value._id,
      };
      store.dispatch("agregarToCarrito", NewVenta);
    }
    function cancelVenta() {
      store.dispatch("deleteProccessVenta");
      inputsAgregar.value = {};
      cantidad.value = 1;
    }

function generarPdf() {
  store.dispatch("generarPdf")
}
    function guardarCompra() {
      // store.dispatch('generarPdf')
      store.dispatch("comprar", {
        nota: notaVenta.value,
        prestamo: prestamo.value,
      });
    }
    return {
      usuario,
      newVenta,
      generarPdf,
      statusVenta,
      dolar,
      prestamo,
      modalVenta,
      notaVenta,
      preGuardarCompra,
      guardarCompra,
      iva,
      totalVenta,
      cancelVenta,
      agregarCarrito,
      productosVenta,
      verifyStock,
      total,
      cantidad,
      inputsAgregar,
      selectProducto,

      buscarProducto,
      sendUrl,
      selectCliente,
      productos,
      buscarClientes,
      clientes,

      dataCliente,
      datosCliente,
    };
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
@media screen and (max-width: 500px) {
  .resultado2 {
    background: #ececec;
    position: absolute;
    z-index: 150;
    border-radius: 0.5rem;
    width: 55%;
    max-height: 30vh;
  }
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