import { createStore } from "vuex";
import jsPDF from "jspdf";
import axios from "axios";
import moment from "moment";

import "jspdf-autotable";
import { createToast } from "mosha-vue-toastify";
export default createStore({
  state: {
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
    notaVenta: "asdasd",
    
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
    generarPdf({ state }) {
      const timeformat = () => {
       let value = new Date()
          moment.locale("es");
          return moment(String(value)).format("LL h:mm:ss a");
        
      };
      var doc = new jsPDF({
        format: "letter",
      });

      var columns = [
        "fecha de compra",
        "nota de entrega",
        "cantidad",
        "descripcion del equipo",
        "codigo imei",
      ];
      let datosVenta = state.productosVenta.map((item) => {
        let e = item.imei.map((e) => e.value);
        return [
          `${timeformat()}`,
          2,
          `${item.cantidad}`,
          `${item.productName} ${item.modelo} `,
          `${e}`,
        ];
      });
      let datosVendedor = [
        `nombre y apellido del comprador`,
        `${state.datosCliente.nombre} ${state.datosCliente.apellido}`,
        "cedula",
        `${state.datosCliente.dni}`,
      ];
      
      var img = new Image()
img.src = "/img/logo.png"
console.log(img)
doc.setFontSize(30)
doc.text('movistar C.A.', 35 , 18)
doc.setFontSize(6)
doc.text('rif -123123213', 80 , 21)
doc.setFontSize(22)
doc.text('contrato de garantia', 70 , 40)
doc.addImage(img, 'png', 10, 10, 20,20)
      var data = datosVenta;
      doc.autoTable(columns, data,
         {
        margin: { top: 50 },

        theme: "plain",
        styles: {
          lineColor: 10,
          lineWidth: 0.1,
          textColor: [0, 0, 0],
          tableLineWidth: 5,
          tableLineColor: [255, 0, 255],
          fontSize: 12,
          halign: "center",
        },
      },
      );
      let datos = [
        ["costo del equipo", `F799879`, "tasa", `${state.system.info.dolar}`],
        ["vendedor", `${state.usuario.username}`, "sucursal", "el vigia"],
      ];
      doc.autoTable(datosVendedor, datos, {
        margin: { top: 0 },
        theme: "plain",
        styles: {
          lineColor: 10,
          lineWidth: 0.1,
          textColor: [0, 0, 0],
          tableLineWidth: 5,
          tableLineColor: [255, 0, 255],
          fontSize: 12,
          halign: "center",
        },
      });
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
      
      const {data}= await axios.post(`${state.api}/ventas`, newFactura)
      createToast(data.value)
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
