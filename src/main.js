import { createRouter, createWebHistory } from 'vue-router';

import { createApp } from 'vue';
import App from './App.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: "AddPost",
            path: "/AddPost",
            component: () => import ('./components/Left/AddPost.vue'),
        },
        {
            name: "Home",
            path: "/",
            component: () => import ('./components/Left/Left.vue'),
        }
    ]
});

createApp(App).use(router).mount('#app');
