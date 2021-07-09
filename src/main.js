import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import jQuery from 'jquery'
import 'mosha-vue-toastify/dist/style.css'

import 'mosha-vue-toastify'
createApp(App).use(router).use(store).use(jQuery).mount('#app')
