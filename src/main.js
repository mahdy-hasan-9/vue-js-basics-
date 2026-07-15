import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/index"


import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';


const app = createApp(App)

app.use(router)
app.use(Toast, {
    position: "bottom-right",
    timeout: 3000,
    closeOnClick: true,
    pauseOnHover: true
})
app.mount('#app')
