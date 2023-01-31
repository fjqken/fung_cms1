const routes = [
    {
        path: '/',
        name: 'login',
        component: () => import('@/view/login/login'),
    },
    {
        path: '/login_qx',
        name: 'login_qx',
        component: () => import('@/view/login/login_qx'),
    },
    {
        path: '/login_vif',
        name: 'login_vif',
        component: () => import('@/view/login/login_vif'),
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('@/view/home/HomePage'),
        children: [{
            path: '/nested/menu1/menu1-1',
            name: 'test_abc',
            component: () => import('@/view/home/test_abc')
        },
            {
                path: '/nested/menu1/menu1-2',
                name: 'test_abc2',
                component: () => import('@/view/home/test_abc2')
            }]
    },
    {
        path: '/home1',
        name: 'home1',
        component: () => import('@/view/home/HomePage')
    }
]

export default routes
