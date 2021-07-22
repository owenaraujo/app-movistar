import { createStore } from "vuex";
import jsPDF from "jspdf";
import axios from "axios";
import moment from "moment";
import numeralFormat from 'numeral'
// load a locale
numeralFormat.register('locale', 'es', {
  delimiters: {
      thousands: '.',
      decimal: ','
  },
  ordinal : function (number) {
      return number === 1 ? 'er' : 'ème';
  },
  currency: {
      symbol: '€'
  }
});

// switch between locales
numeralFormat.locale('es');
import "jspdf-autotable";
import { createToast } from "mosha-vue-toastify";
export default createStore({
  state: {
    statusVenta: false,
    search: "hola",
    productosVenta: [],
    toask: {
      danger: {
        hideProgressBar: false,
        showIcon: true,
        position: "bottom-left",
        type: "danger",
        timeout: 3000,
        transition: "bounce",
      },
      warning: {
        hideProgressBar: false,
        showIcon: true,
        position: "bottom-left",
        type: "warning",
        timeout: 3000,

        transition: "bounce",
      },
      success: {
        hideProgressBar: false,
        showIcon: true,
        position: "bottom-left",
        timeout: 3000,
        type: "success",
        transition: "bounce",
      },
    },
    api: "http://api:3000/api",
    sidebars: false,
    logged: false,
    token: null,
    dataCliente: false,
    datosCliente: {},
    linkclientes: "/clientes",
    usuarios: [],
    proveedores: [],
    usuario: {},
    ventas: [],
    clientesActivos: [],
    productosTrue: [],
    clientes: [],
    productos: [],
    notaVenta: "",
    ventaActual: {
      abonos: [],
      status: true,
      prestamos: false,
      _id: "60f591392ee3ff1ce84ffb7b",
      user_id: {
        status: true,
        _id: "60ef018e0f72690efceb69da",
        username: "admin",
        email: "default@gmail.com",
        password:
          "$2a$10$pgDXKSwDB4ziQV.QhYfY7OoTSt017.0M/UrO8ggUyZKUhYuVxrLDm",
        rol: "60ef018d0f72690efceb69d2",
        createdAt: "2021-07-14T15:23:58.047Z",
        updatedAt: "2021-07-18T15:17:11.081Z",
      },
      cliente_id: {
        status: true,
        _id: "60ef039f650a0518889a13f3",
        dni: "28072151",
        nombre: "owen djesus",
        telefono: +584147361209,
        direccion: "avenida las americas, calle 22-33, el vigia estado merida",
        apellido: "araujo orozco",
        createdAt: "2021-07-14T15:32:47.993Z",
        updatedAt: "2021-07-18T20:46:27.412Z",
        user_id: "60ef018e0f72690efceb69da",
      },
      productos: [
        {
          _id: "60f591392ee3ff1ce84ffb7c",
          precio: 110,
          imei: [
            {
              _id: "60f591392ee3ff1ce84ffb7d",
              value: 234234234234234,
            },
            {
              _id: "60f591392ee3ff1ce84ffb7e",
              value: 234234234234234,
            },
            {
              _id: "60f591392ee3ff1ce84ffb7f",
              value: 234234234234234,
            },
            {
              _id: "60f591392ee3ff1ce84ffb80",
              value: 234234234234243,
            },
            {
              _id: "60f591392ee3ff1ce84ffb81",
              value: 234234234234234,
            },
          ],
          cantidad: 5,
          iva: 10,
          producto_id: {
            status: true,
            _id: "60ef032f650a0518889a13e4",
            proveedor_id: "60ef02fc650a0518889a13df",
            nombre: "moto e4 plus",
            marca: "motorola",
            modelo: "xt-1684",
            descripcion: "telefono movil",
            cantidad: 5,
            precio: 110,
            codigo: "mt-01",
            iva: 10,
            createdAt: "2021-07-14T15:30:55.888Z",
            updatedAt: "2021-07-18T15:16:20.647Z",
          },
        },
        {
          _id: "60f591392ee3ff1ce84ffb7c",
          precio: 110,
          imei: [
            {
              _id: "60f591392ee3ff1ce84ffb7d",
              value: 234234234234234,
            },
            {
              _id: "60f591392ee3ff1ce84ffb7e",
              value: 234234234234234,
            },
            {
              _id: "60f591392ee3ff1ce84ffb7f",
              value: 234234234234234,
            },
            {
              _id: "60f591392ee3ff1ce84ffb80",
              value: 234234234234243,
            },
            {
              _id: "60f591392ee3ff1ce84ffb81",
              value: 234234234234234,
            },
          ],
          cantidad: 5,
          iva: 10,
          producto_id: {
            status: true,
            _id: "60ef032f650a0518889a13e4",
            proveedor_id: "60ef02fc650a0518889a13df",
            nombre: "moto e4 plus",
            marca: "motorola",
            modelo: "xt-1684",
            descripcion: "telefono movil",
            cantidad: 5,
            precio: 110,
            codigo: "mt-01",
            iva: 10,
            createdAt: "2021-07-14T15:30:55.888Z",
            updatedAt: "2021-07-18T15:16:20.647Z",
          },
        },
        {
          _id: "60f591392ee3ff1ce84ffb7c",
          precio: 110,
          imei: [
            {
              _id: "60f591392ee3ff1ce84ffb7d",
              value: 234234234234234,
            },
            {
              _id: "60f591392ee3ff1ce84ffb7e",
              value: 234234234234234,
            },
            {
              _id: "60f591392ee3ff1ce84ffb7f",
              value: 234234234234234,
            },
            {
              _id: "60f591392ee3ff1ce84ffb80",
              value: 234234234234243,
            },
            {
              _id: "60f591392ee3ff1ce84ffb81",
              value: 234234234234234,
            },
          ],
          cantidad: 5,
          iva: 10,
          producto_id: {
            status: true,
            _id: "60ef032f650a0518889a13e4",
            proveedor_id: "60ef02fc650a0518889a13df",
            nombre: "moto e4 plus",
            marca: "motorola",
            modelo: "xt-1684",
            descripcion: "telefono movil",
            cantidad: 5,
            precio: 110,
            codigo: "mt-01",
            iva: 10,
            createdAt: "2021-07-14T15:30:55.888Z",
            updatedAt: "2021-07-18T15:16:20.647Z",
          },
        },
      ],
      nota: "lorsdfsd sdf  r ewr we r wer we rw er we r we r wer we r we r we rrrrrrrrrrrrrrrrrrrrwe r we r wer",
      dolar: 3600000,
      createdAt: "2021-07-19T14:50:33.957Z",
      updatedAt: "2021-07-19T14:50:33.957Z",
    },

    deuda: false,
    system: { id: "", info: { dolar: "" } },
  },
  mutations: {
    saveCliente(state, payload) {
      state.datosCliente = payload;
      state.dataCliente = true;
    },
    saveProductos(state, payload) {
      state.productos = payload;
      let productos = payload.filter((item) =>
        item.status === true ? item : 0
      );

      state.productosTrue = productos;
    },
    saveProveedores(state, payload) {
      state.proveedores = [];
      state.proveedores = payload;
    },
    async verifyUser(state) {
      try {
        if (localStorage.token && localStorage.id) {
          state.token = localStorage.token;
          const { data } = await axios.get(
            `${state.api}/usuarios/${localStorage.id}`
          );
          if (data.status === null) {
            createToast(data.value);
            localStorage.token = "";
            localStorage.id = "";
            return;
          }
          state.usuario = data;
          state.logged = true;
        }
      } catch (error) {
        createToast("no hay acceso al servidor");
      }
    },
    async logear(state, payload) {
      const { data } = await axios.get(
        `${state.api}/usuarios/${payload.usuario}`
      );
      state.usuario = data;
      state.token = payload.value;
      localStorage.token = payload.value;
      localStorage.id = payload.usuario;
      createToast(`bienvenido ${data.username}`, state.toask.success);
      state.logged = true;
    },
    saveClientes(state, payload) {
      state.clientes = payload;
      let clientes = payload.filter((item) =>
        item.status === true ? item : 0
      );
      state.clientesActivos = clientes;
    },
    saveUsuarios(state, payload) {
      state.usuarios = payload;
    },
    cambiarRuta(state, ruta) {
      state.linkclientes = ruta.ruta;
    },
    agregar(state, payload) {
      state.productos.push(payload);
    },
    updateProveedor(state, payload) {
      state.proveedores.map((item) =>
        item._id === payload ? (item.status = !item.status) : 0
      );
    },
    saveToCar(state, payload) {
      const num = state.productosTrue.filter((item) => {
        if (item._id.toString() === payload.producto_id) {
          let resta = item.cantidad - payload.cantidad;
          if (resta >= 0) {
            item.cantidad = resta;
            return item;
          }
        }
      });
      if (num.length === 0) return;
      const val = state.productosVenta.filter((item) => {
        if (item.producto_id === payload.producto_id) {
          item.cantidad = item.cantidad + payload.cantidad;
          item.imei.push({ value: null });

          return item;
        }
      });

      if (val.length == 0) state.productosVenta.push(payload);
    },
    addProductoInicial(state, payload) {
      state.productosTrue.filter((item) =>
        item._id.toString() == payload.id
          ? (item.cantidad = item.cantidad + payload.cantidad)
          : 0
      );
    },
    resTotal(state, payload) {
      state.productosVenta.filter((item) => {
        if (item.producto_id == payload.id) {
          state.productosTrue.filter((item) => {
            if (item._id.toString() == payload.id) item.cantidad++;
          });
          item.cantidad--;
          if (item.cantidad == 0)
            state.productosVenta.splice(payload.indice, 1);
        }
      });
    },
  },
  actions: {
    guardarVenta({state},productos){
state.ventaActual =productos
    },
    vaciarVenta({ state }) {
      state.productosVenta = [];
      state.datosCliente = {};
      state.dataCliente = false;
      state.statusVenta = false
      state.ventaActual = {};
    },
    generarPdf({ state } ) {
      let datos = state.ventaActual;
      
      let productos = datos.productos
      let cliente = datos.cliente_id;
      const timeformat = () => {
        let value = datos.createdAt;
        moment.locale("es");
        return moment(String(value)).format("L");
      };
      var doc = new jsPDF({
        format: "letter",
      });

      

      let total = datos.productos.reduce(
        (sum, i) => sum + ((i.precio * i.iva) / 100 + i.precio) * i.cantidad,
        0
      );

      let iva = datos.productos.reduce(
        (sum, i) => sum + ((i.precio * i.iva) / 100) * i.cantidad,
        0
      );

      var img = new Image();
      img.src = "/img/fondo.jpg";

     
      doc.addImage(img, "jpg", 3.5, 0, 209, 131);
      doc.setFontSize(10);
      //headder factura
      let number = numeralFormat(datos.factura).format( "000000")
      doc.text(`Cliente:    ${cliente.nombre} ${cliente.apellido}`, 15, 36);
      doc.text(`Factura Nro:  ${number} `, 165, 34);
      doc.text(`Rif:    ${cliente.dni} `, 130, 36);
      doc.text(`Direccion:    ${cliente.direccion}`, 15, 40);
      doc.text(`fecha:  ${timeformat()}`, 165, 40);
      doc.text(`Telefono:    ${cliente.telefono}`, 15, 44);
      doc.text(`vence:    ${timeformat()}`, 165, 44);
      doc.text(`Condicion:   contado`, 120, 44);

      //body factura                            

     let position = 55
      for (let i = 0; i < productos.length; i++) {
        const element = productos[i];
        let newIva = ''
        if(!element.iva) newIva = `(e)`
        doc.text(`${element.producto_id.codigo}`, 17,position)
        doc.text(`${element.producto_id.marca}-${element.producto_id.modelo}`, 42,position)
        doc.text(`${element.cantidad}`, 125,position)
        doc.text(`${numeralFormat(element.precio *datos.dolar).format('0,0')}`, 135,position)
        doc.text(`${numeralFormat((element.cantidad *element.precio) * datos.dolar).format("0,0")}${newIva}`, 182,position)
        position =position + 5
        
      }
      //footer factura

      doc.text(`Total factura :`, 135, 112);
      doc.text(` ${numeralFormat( total*datos.dolar).format('0,0')}`, 200, 112, {align: "right"});
      doc.text(`IVA :`, 135, 109);
      doc.text(`${numeralFormat(iva* datos.dolar).format('0,0')}`, 200, 109, {align: "right"});
      
      doc.text(`Total Factura($USD) :`, 135, 115);
      doc.text(`${total}$`, 200, 115, {align: "right"});
      doc.text(`Observaciones:`, 10, 109);
      var text=`${datos.nota}`
      doc.text(text, 35, 109, {align: 'justify',lineHeightFactor: 1,maxWidth:95});
      doc.output("dataurlnewwindow");
    },
    async buscar({ state }) {
      const { data } = await axios.get(`${state.api}/system`);
      if (data) {
        delete data.createdAt;
        delete data.updatedAt;
        state.system.info = data;
        state.system.id = data._id;
      }
    },

    resProducto({ commit }, date) {
      commit("resTotal", date);
    },
    async comprar({ state }, nota) {
      const user = state.usuario._id;
      const cliente = state.datosCliente._id;
      const productos = state.productosVenta;

      const dolar = state.system.info.dolar;

      const newFactura = {
        user_id: user,
        cliente_id: cliente,
        productos: productos,
        nota: nota.nota,
        dolar: dolar,
        prestamo: nota.prestamo,
      };

      let { data } = await axios.post(`${state.api}/ventas`, newFactura);
      createToast(data.value);
      if (data.status === true) {
        state.statusVenta = true;
        state.ventaActual = data.data;
      }
    },
    deleteStore({ state, commit }, indice) {
      const cantidad = state.productosVenta[indice].cantidad;
      const id = state.productosVenta[indice].producto_id;
      commit("addProductoInicial", { cantidad: cantidad, id: id });
      state.productosVenta.splice(indice, 1);
    },
    agregarToCarrito({ commit, state }, newVenta) {
      let carrito = state.productosTrue.filter((item) => {
        if (item._id.toString() == newVenta.producto_id) {
          let total = item.cantidad - newVenta.cantidad;

          if (total >= 0) return item;
          else {
            0;
          }
        }
      });
      if (carrito.length > 0) commit("saveToCar", newVenta);
    },
    guardarCliente({ commit }, cliente) {
      commit("saveCliente", cliente);
    },
    async getProductos({ commit, state }) {
      const { data } = await axios.get(`${state.api}/productos`);
      commit("saveProductos", data);
    },
    proveedorStatus({ commit }, id) {
      commit("updateProveedor", id);
    },
    activeMenu({ state }) {
      state.sidebars = !state.sidebars;
    },
    sendUrl({ commit }, ruta) {
      commit("cambiarRuta", ruta);
    },
    async getProveedores({ state, commit }) {
      const { data } = await axios.get(`${state.api}/proveedores`);
      commit("saveProveedores", data);
    },
    login({ commit }, data) {
      data.status ? commit("logear", data) : 0;
    },
    async getClientes({ state, commit }) {
      try {
        const { data } = await axios.get(`${state.api}/clientes`);
        commit("saveClientes", data);
      } catch (error) {
        createToast("no hay conexion con el servidor");
      }
    },
    async getUsuarios({ state, commit }) {
      try {
        const { data } = await axios.get(`${state.api}/usuarios`);
        commit("saveUsuarios", data);
      } catch (error) {
        createToast("no hay conexion con el servidor");
      }
    },
    verifyLocalstorage({ commit }) {
      commit("verifyUser");
    },
    logout({ state }) {
      state.logged = false;
      createToast("hasta pronto!!!");
      delete localStorage.token;
      delete localStorage.id;
    },
    saveProduct({ commit, state }, producto) {
      const status = state.productos.filter((item) => {
        return item.modelo === producto.modelo ? item : false;
      });
      status.length < 0 ? 0 : commit("agregar", producto);
    },
    deleteProccessVenta({ state }) {
      state.productosVenta = [];
      state.datosCliente = {};
      state.dataCliente = false;
    },
  },
  modules: {},
});
