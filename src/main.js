import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios';
import './styles/app.css'

const app = createApp(App)

app.config.globalProperties.$http = axios;

app.mount('#app')

