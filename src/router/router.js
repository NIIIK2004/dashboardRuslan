
import AuthPage from "@/pages/AuthPage.vue";
import {createRouter, createWebHistory} from "vue-router";
import MainPage from "@/pages/MainPage.vue";

const routes = [
    {
    path: '',
    component: MainPage
},
{
        path: "/auth",
        component: AuthPage,
    },
]
const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;
