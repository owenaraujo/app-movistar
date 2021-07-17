<template>
{{ numeralFormat(info.dolar, '0,0[.]00' )}}
    <div class="container-fluid mt-2 mb-2">
    <!-- Content Row -->
    <div class="row">
      <div class="col-lg-6 m-auto">
        <div class="card-header text-center bg-primary text-white">
            configuracion del sistema
        </div>
        <div class="card">
          <form class="card-body p-2" autocomplete="off">
              <div class="form-group">
                  <label for="dolar"
                  >
                  dolar
                  </label>
                  <input type="number" v-model.number="info.dolar" class="form-control " id="dolar">
              </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from '@vue/reactivity'
export default {
    setup(){
        let info =ref({dolar: 0})
    
    return {info
    }
    }

}
</script>