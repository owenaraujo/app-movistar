import { createStore } from "vuex";
import axios from "axios";
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
    notaVenta : 'asdasd',
    dolar: '',
    deuda: false
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
    saveToCar(state, payload){
const num = state.productosTrue.filter(item=>{
if (item._id.toString()=== payload.producto_id){
 let resta = item.cantidad - payload.cantidad
  if(resta >= 0) {
    
    item.cantidad = resta
    return item}
}
})
if (num.length === 0) return
const val = state.productosVenta.filter(item=>{
  if(item.producto_id === payload.producto_id){
    item.cantidad = item.cantidad+payload.cantidad 
    item.imei.push({value : null})

    return item
  }
}) 

if(val.length == 0)state.productosVenta.push(payload)
    },
    addProductoInicial(state, payload){
state.productosTrue.filter(item=> item._id.toString() == payload.id ? item.cantidad= item.cantidad + payload.cantidad:0  )
    },
    resTotal(state, payload){
state.productosVenta.filter(item =>{
  if(item.producto_id == payload.id) {
  
   state.productosTrue.filter(item =>{
    if(item._id.toString() == payload.id)item.cantidad++
  })
    item.cantidad--
  if(item.cantidad == 0 ) state.productosVenta.splice(payload.indice, 1)
  
  }
 
})
console.log(payload)
    }
  },
  actions: {

    resProducto({commit},date){
      commit('resTotal', date)
    },
  async  comprar({state}, nota){
      const user = state.usuario._id
      const cliente = state.datosCliente._id
const productos = state.productosVenta

const dolar = state.dolar

const newFactura = {
  user_id: user,
  cliente_id: cliente,
  productos: productos,
  nota:  nota.nota, 
  dolar: dolar,
  prestamo : nota.prestamo
}
console.log(newFactura)
//await axios.post(`${state.api}/ventas`, newFactura)
    },
    deleteStore({state, commit},indice){
      const cantidad = state.productosVenta[indice].cantidad 
      const id = state.productosVenta[indice].producto_id
      console.log(cantidad + ' '+ id)
commit('addProductoInicial',{cantidad: cantidad, id: id})
state.productosVenta.splice(indice, 1)
 

    },
    agregarToCarrito({ commit, state }, newVenta) {
      let carrito = state.productosTrue.filter((item) => {
        if (item._id.toString() == newVenta.producto_id) {
          let total = item.cantidad - newVenta.cantidad;

          if (total >= 0) return item
          else{0 }
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
      data.status ? commit("logear", data) : console.log(data);
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
        console.log(producto.modelo);
        return item.modelo === producto.modelo ? item : false;
      });
      status.length < 0
        ? console.log("producto encontrado")
        : commit("agregar", producto);
    },
    deleteProccessVenta({state}){
state.productosVenta = []
state.datosCliente = {}
state.dataCliente = false
    }
  },
  modules: {},
});
