import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import jQuery from 'jquery'
import 'mosha-vue-toastify/dist/style.css'
import numeralFormat from 'vue-numerals'
import 'mosha-vue-toastify'
import 'vue-popperjs/dist/vue-popper.css';
createApp(App).use(router).use(store).use(numeralFormat, {
    locale: 'es'
  }).use(jQuery).mount('#app')
