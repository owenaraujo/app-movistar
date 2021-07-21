<template>
{{numeralFormat(number," 000000")}}
    <input type="Number" v-model="number" name="" id="">
</template>


<script>
import { ref } from '@vue/reactivity'
export default {
    setup(){
let number = ref(2)
return {number}
    }
}
</script>
1000000