import { createStore } from "vuex";
import axios from 'axios'
import { createToast } from "mosha-vue-toastify";
export default createStore({
  state: {
    search: 'hola',
    
    toask: {
danger:{
  hideProgressBar: false,
  showIcon: true,
  position: 'bottom-left',
  type: 'danger',
  timeout: 3000,
  transition: 'bounce'
  },
  warning:{
    hideProgressBar: false,
    showIcon: true,
    position: 'bottom-left',
    type: 'warning',
  timeout: 3000,

    transition: 'bounce'
    },
    success: {
      hideProgressBar: false,
      showIcon: true,
      position: 'bottom-left',
      timeout:3000 ,
      type: 'success',
      transition: 'bounce'
      }
    },
    api: 'http://api:3000/api',
    sidebars: false,
    logged: false,
    token: null,
    linkclientes: "/clientes",
    usuarios: [],
    proveedores: [],
    usuario: {},
    ventas: [],
    productosTrue : [],
    clientes: [
     
    ],
    productos: [],
  },
  mutations: {
    saveProductos(state, payload){
      state.productos = payload
    let productos = payload.filter(item => item.status === true ? item : 0)
    
state.productosTrue = productos
    },
    saveProveedores(state,payload){

state.proveedores = []
state.proveedores = payload
    },
    async verifyUser(state){
if(localStorage.token && localStorage.id){
  state.token = localStorage.token
  const {data} = await axios.get(`${state.api}/usuarios/${localStorage.id}`)
  state.usuario = data
  state.logged = true
}
    },
   async logear(state,payload) {
      const {data} = await axios.get(`${state.api}/usuarios/${payload.usuario}`)
      state.usuario = data
     state.token= payload.valueS
     localStorage.token= payload.value
     localStorage.id =payload.usuario
     createToast ( `bienvenido ${data.username}`,state.toask.success )
state.logged= true
    },
    saveClientes(state, payload){
      state.clientes = payload
    },
    saveUsuarios(state, payload){
      state.usuarios = payload
    },
    cambiarRuta(state, ruta) {
      state.linkclientes = ruta.ruta;
    },
    agregar(state, payload) {
      state.productos.push(payload);
    },
    updateProveedor(state ,payload){

state.proveedores.map(item=>item._id === payload ?item.status =  !item.status:0)
    }
  },
  actions: {
    async getProductos({commit, state}){
      const {data}= await axios.get(`${state.api}/productos`)
      commit('saveProductos', data)
    },
    proveedorStatus({commit}, id){
commit('updateProveedor', id)
    },
    activeMenu({state}){
      state.sidebars= !state.sidebars
    },
    sendUrl({ commit }, ruta) {
      commit("cambiarRuta", ruta);
    },
    async getProveedores({state, commit}){
const {data}= await axios.get(`${state.api}/proveedores`)
commit('saveProveedores', data)    
},
    login({commit }, data) {
        data.status? commit("logear", data)
        : console.log(data);
    },
    async getClientes({state, commit}){
      try {
        if(state.clientes.length != 0) return
        const {data} = await axios.get(`${state.api}/clientes`)
        commit('saveClientes', data)

      } catch (error) {
        createToast('no hay conexion con el servidor')
      }
    },
    async getUsuarios({state, commit}){
      try {
        
        const {data} = await axios.get(`${state.api}/usuarios`)
        commit('saveUsuarios', data)

      } catch (error) {
        createToast('no hay conexion con el servidor')
      }
    },
    verifyLocalstorage({commit }) {
        commit("verifyUser")
            },
            logout ({state}){
              state.logged = false
              createToast('hasta pronto!!!') 
             delete localStorage.token
             delete localStorage.id
            }
,    saveProduct({ commit, state }, producto) {
      const status = state.productos.filter((item) => {
        console.log(producto.modelo);
        return item.modelo === producto.modelo ? item : false;
      });
      status.length < 0
        ? console.log("producto encontrado")
        : commit("agregar", producto);
    },
  },
  modules: {},
});
