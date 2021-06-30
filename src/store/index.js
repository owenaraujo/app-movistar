import { createStore } from "vuex";

export default createStore({
  state: {
    linkclientes: '/clientes',
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
    cambiarRuta(state, ruta){
      state.linkclientes = ruta.ruta
    }
  },
  actions: {
    sendUrl({commit},ruta){
commit('cambiarRuta' ,ruta)

    }
  },
  modules: {},
});
