import {createApp} from 'vue'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './style.css'
import App from './App.vue'
import {router} from "./routes.js";

const app = createApp(App)


app.use(router);

app.mount('#app')
