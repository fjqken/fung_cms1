import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './route'

const router = createRouter({
    scrollBehavior: () => ({ y: 0 }),
    base: process.env.BASE_URL,
    history: createWebHashHistory(),
    routes,
})

export default router
