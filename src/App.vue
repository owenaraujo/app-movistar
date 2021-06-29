<template>
  <div>
  
<Signin v-if="data" class=""></Signin>
<Header></Header>

  </div>
</template>

<script>
import Signin from './components/Signin.vue'
import Header from './components/template/Header.vue'
export default {
components:{ Signin, Header},
data(){
  return {
    data: false
  }
}
}
</script>

