const routes = [
    {
        name: '博客',
        path:'/',
        component:()=>import('pages/blog/index.jsx'),
        models:()=>[import('pages/blog/model')]
    },
    {
        name:'登录',
        path:'/login',
        component:()=>import('pages/login/index.jsx'),
        models:()=>[import('pages/login/model')]
    },
    {
        name: '注册',
        path:'/register',
        component:()=>import('pages/register/index.jsx'),
        models:()=>[import('models/global')]
    }
];
const privateRoutes = [
    {
        name: 'API管理',
        icon: 'link',
        path: '/apiManagement'
    }
];
const privateRoutesAll = [
    {
        name: 'API管理',
        path: '/apiManagement',
        component: () => import('pages/apiManagement/index.jsx'),
        models: () => [import('pages/apiManagement/model')]
       
    },
    {
        name: 'API管理详情',
        path: '/apiManagement/details',
        component: () => import('pages/apiManagement/details.jsx'),
        models: () => [import('pages/apiManagement/model')]
       
    },
];


export {
    routes,
    privateRoutes,
    privateRoutesAll
}