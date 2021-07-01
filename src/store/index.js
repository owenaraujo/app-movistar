import { createStore } from "vuex";

export default createStore({
  state: {
    logged: false,
    linkclientes: '/clientes',
    proveedores: [

      {nombre:'cliente', id:1},
      {nombre:'cliente', id:2},
      {nombre:'cliente', id:3},
      {nombre:'cliente', id:4},
      {nombre:'cliente', id:5},
      {nombre:'cliente', id:6},
      {nombre:'cliente', id:7},
      {nombre:'cliente', id:8},
    ],
    usuarios:[

      {nombre:'cliente', id:1},
      {nombre:'cliente', id:2},
      {nombre:'cliente', id:3},
      {nombre:'cliente', id:4},
      {nombre:'cliente', id:5},
      {nombre:'cliente', id:6},
      {nombre:'cliente', id:7},
      {nombre:'cliente', id:8},
    ],
    ventas:[],
    clientes: [

      {nombre:'cliente', id:1},
      {nombre:'cliente', id:2},
      {nombre:'cliente', id:3},
      {nombre:'cliente', id:4},
      {nombre:'cliente', id:5},
      {nombre:'cliente', id:6},
      {nombre:'cliente', id:7},
      {nombre:'cliente', id:8},
    ],
    productos: [
      { nombre: "harina" },
      { nombre: "harina" },
      { nombre: "harina" },
      { nombre: "harina" },
      { nombre: "harina" },
      { nombre: "harina" },
      { nombre: "harina" },
      { nombre: "harina" },
      { nombre: "harina" },
      { nombre: "harina" },
      { nombre: "harina" },
      { nombre: "harina" },
      { nombre: "harina" },
      { nombre: "harina" },
      { nombre: "harina" },
      { nombre: "harina" },
      { nombre: "harina" },
      { nombre: "harina" },
      { nombre: "harina" },
      { nombre: "harina" },
      { nombre: "harina" },
      { nombre: "harina" },
      { nombre: "arroz" },
      { nombre: "mantequilla" },
    ],
    
  },
  mutations: {
    logear(state, usuario){
      state.logged= true 
      console.log(usuario);
    },
    cambiarRuta(state, ruta){
      state.linkclientes = ruta.ruta
    }
  },
  actions: {
    sendUrl({commit},ruta){
commit('cambiarRuta' ,ruta)

    },
    login({commit} ,usuario ){
      commit('logear', usuario)
    }
  },
  modules: {},
});
