import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
// axios({
//     url: 'http://123.207.32.32:8000/home/multidata',

// })
createApp(App).use(store).use(router).mount('#app')
