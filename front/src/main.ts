import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/App.scss'
import 'bootstrap'

const app = createApp(App)
app.use(store).use(router).mount('#app')

app.config.performance = process.env.NODE_ENV === 'development'

if(process.env.NODE_ENV === 'development'){
  console.log('Development Build')
}