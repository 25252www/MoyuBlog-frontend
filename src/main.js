import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import axios from 'axios'
import VueAxios from 'vue-axios'

axios.defaults.timeout = 5000 // 请求超时
axios.defaults.baseURL = '/api/'

const app = createApp(App)

app.use(router)
app.use(ElementPlus)
app.use(VueAxios, axios)
app.mount('#app')
