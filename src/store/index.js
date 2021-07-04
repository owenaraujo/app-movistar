import { createStore } from "vuex";
import axios from 'axios'
export default createStore({
  state: {
    api: 'http://localhost:3000/api',
    sidebars: false,
    logged: true,
    token: null,
    linkclientes: "/clientes",
    usuarios: [
      {
        _id: "60b1500767c4e91340a2d78a",
        status: true,
        nombre: "admin",
        documento: "123456",
        correo: "default@gmail.com",
        password: "1234",
        username: "admin",
      },
      {
        _id: "60b1500767c4e91340a2d78b",
        status: true,
        nombre: "vendedor",
        documento: "123456",
        correo: "default@gmail.com",
        password: "1234",
        username: "vendedor",
      },
      {
        _id: "60b1500767c4e91340a2d78c",
        status: true,
        nombre: "usuario",
        documento: "123456",
        correo: "default@gmail.com",
        password: "1234",
        username: "usuario",
      },
    ],
    proveedores: [],
    usuario: {},
    ventas: [],
    clientes: [
      { nombre: "cliente", id: 1 },
      { nombre: "cliente", id: 2 },
      { nombre: "cliente", id: 3 },
      { nombre: "cliente", id: 4 },
      { nombre: "cliente", id: 5 },
      { nombre: "cliente", id: 6 },
      { nombre: "cliente", id: 7 },
      { nombre: "cliente", id: 8 },
    ],
    productos: [],
  },
  mutations: {
    saveProveedores(state,payload){

state.proveedores = []
state.proveedores = payload
    },
    logear(state,payload) {
      state.logged = true;
     state.token= payload.data
     console.log(state.token)
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
    saveProduct({ commit, state }, producto) {
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
