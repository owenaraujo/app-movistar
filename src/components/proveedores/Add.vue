<template>
  <div class="container-fluid">
    <!-- Content Row -->
    <div class="row">
      {{ form }}
      {{NewProveedor}}
      <div class="col-lg-6 m-auto">
        <div class="card-header bg-primary text-white">
          Registro de Proveedor
        </div>
        <div class="card">
          <form
            action=""
            autocomplete="off"
            method="post"
            class="card-body p-2"
          >
            <div v-for="item in form" :key="item" class="form-floating">
              <input
                v-model="NewProveedor[item]"

                type="text"
                :placeholder="'Ingrese ' + item"
                :id="item"
                class="form-control"
              />
              <label :for="item">{{ item }}</label>
            </div>

            <input
              type="submit"
              value="Guardar Proveedor"
              class="btn btn-primary"
            />
            <router-link to="/proveedores" class="btn btn-danger"
              >Regresar</router-link
            >
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
  setup() {
    const form = ["nombre", "rif", "telefono", "direccion"];
    let NewProveedor = ref({
      nombre: null,
      rif: null,
      telefono: null,
      direccion: null,
    });
    return {
      form,
      NewProveedor,
    };
  },
};
</script>



