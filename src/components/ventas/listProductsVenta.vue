<template>
  <tr>
    <th>{{ producto.codigo }}</th>
    <th>{{ producto.marca }}-{{ producto.modelo }}</th>
    <th class="">
      <div
        class="form-row align-items-center"
        v-for="(item, index) of producto.imei"
        :key="index"
      >
        <input :class="{'is-invalid' : Producto.imei[index].value == ''}"
          class="form-control col-md-9 my-1"
          placeholder="imei"

          v-model.number="Producto.imei[index].value"
          type="tel"
          maxlength="15"
        />
        <button
          @click="deleteOneItem(index)"
          class="btn btn-danger ml-2 col-md-2 my-1"
        >
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </th>
    <th>{{ producto.cantidad }}</th>
    
    <th>
      <Popper
                    class="dark-popper"
                    arrow
                    hover
                    placement="left"
                    :content="numeralFormat((producto.precio) * dolar) + ' Bs'"
                  >
                  {{ producto.precio }} (+{{producto.iva}}% iva)
                  </Popper>
      </th>

    <th>
      <Popper
                    class="dark-popper"
                    arrow
                    hover
                    placement="left"
                    :content="numeralFormat((total) * dolar) + ' Bs'"
                  >
                    {{ total }}
                  </Popper>
    </th>
    <th>
      <button @click="deleteProduct(indice)" class="btn btn-danger">
        <i class="svg-inline--fa fas fa-trash-alt fa-w-14"></i> Eliminar
      </button>
    </th>
  </tr>
</template>
<script>
import { computed, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
import Popper from "vue3-popper";

export default {
  props: ["producto", "indice"],
  components:{Popper},
  setup(props) {
    const store = useStore();
    let Producto = ref(props.producto);
    let dolar = computed(() => store.state.system.info.dolar);

    let total = computed(() => {
      let obj = Producto.value;
      let iva = ((obj.precio * obj.iva) / 100) * obj.cantidad;
      let totalSinIva = obj.precio * obj.cantidad;

      if (!totalSinIva) totalSinIva = 0;
      if (!iva) iva = 0;

      return totalSinIva + iva;
    });
    function deleteOneItem(indice) {
      store.dispatch("resProducto", {
        id: Producto.value.producto_id,
        indice: indice,
      });
      Producto.value.imei.splice(indice, 1);
    }
    function deleteProduct(indice) {
      store.dispatch("deleteStore", indice);
    }
    return { total, dolar ,deleteProduct, Producto, deleteOneItem };
  },
};
</script>