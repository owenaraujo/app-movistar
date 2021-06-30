import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import jQuery from 'jquery'
createApp(App).use(router).use(store).use(jQuery).mount('#app')
