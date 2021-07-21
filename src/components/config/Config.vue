<template>

  <div class="container-fluid mt-2 mb-2">

    <!-- Content Row -->
    <div class="row">
      <!-- <button  @click="pdf">click aqui</button> -->
      <div class="col-lg-6 m-auto">
        <div class="card-header text-center bg-primary text-white">
          configuracion del sistema
        </div>
        <div class="card">
          <form class="card-body p-2" autocomplete="off">
            <div class="form-group">
              <label for="dolar"> dolar </label>
              <input
                type="number"
                v-model.number="info.info.dolar"
                class="form-control"
                id="dolar"
              />
            </div>
            <button class="btn btn-primary" @click.prevent="save">guardar</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "@vue/reactivity";
import axios from 'axios';
import { useStore } from 'vuex';
import { computed } from '@vue/runtime-core';
import { createToast } from 'mosha-vue-toastify';
export default {
  setup() {
    let store = useStore()
 store.dispatch('buscar')
   let informacion = computed(()=> store.state.system)
  let info = ref(informacion.value);
    let api = computed(()=> store.state.api)
  let toast = computed(()=> store.state.toask)
   async function save() {
      const {data} = await axios.post(`${api.value}/system/${informacion.value.id}`, info.value.info)
      createToast(data.value, toast.value.success)
    }
    function pdf() {
      store.dispatch("generarPdf")
    }
    return { pdf, info, save, informacion };
  },
};
</script>