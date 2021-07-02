import { createStore } from "vuex";
export default createStore({
  state: {
    logged: true,
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
    proveedores: [
      { nombre: "cliente", id: 1 },
      { nombre: "cliente", id: 2 },
      { nombre: "cliente", id: 3 },
      { nombre: "cliente", id: 4 },
      { nombre: "cliente", id: 5 },
      { nombre: "cliente", id: 6 },
      { nombre: "cliente", id: 7 },
      { nombre: "cliente", id: 8 },
    ],
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
    logear(state, payload) {
      //state.logged = true;
      state.usuarios.filter((item) => {
        if (item._id === payload._id) item.password = 0;
      });
      state.usuario = payload;
    },
    cambiarRuta(state, ruta) {
      state.linkclientes = ruta.ruta;
    },
    agregar(state, payload) {
      state.productos.push(payload);
    },
  },
  actions: {
    sendUrl({ commit }, ruta) {
      commit("cambiarRuta", ruta);
    },
    login({ state, commit }, usuario) {
      const data = state.usuarios.filter((item) =>
        item.username === usuario.username ? item : false
      );
      let resultado = data.length > 0 ? data[0] : false;
      if (!resultado) return;
      resultado.password === usuario.password
        ? commit("logear", resultado)
        : console.log("no funciona");
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
