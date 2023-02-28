import {createRouter, createWebHistory} from 'vue-router'
import Alpaca from "./components/Alpaca.vue";

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'alpaca',
            component: Alpaca
        },
    ]
})
