<template>
  <div
    style="
  user-select: none;
  "
  >

  
    <Signin v-if="!logged"></Signin>
    <Header v-if="logged" class=""></Header>
  </div>
</template>

<script>
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
import Signin from "./components/Signin.vue";
import Header from "./components/template/Header.vue";
export default {
  components: { Signin, Header },
  setup() {
    const store = useStore()
    store.dispatch('verifyLocalstorage')
    const logged = computed(() => store.state.logged);
    return { logged };
  },
};
</script>
