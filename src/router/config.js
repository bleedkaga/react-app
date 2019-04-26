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
        icon: 'file-text',
        path: '/managementApi'
    },
    {
        name: '查询栏',
        icon: 'file-search',
        path: '/queryBar'
    },
    {
        name: '基础表格',
        icon: 'table',
        path: '/baseTable'
    }
];
const privateRoutesAll = [
    {
        name: 'API管理',
        path: '/managementApi',
        component: () => import('pages/apiManagement/index.jsx'),
        models: () => [import('pages/apiManagement/model')]
       
    },
    {
        name: 'API管理详情',
        path: '/managementApi/details',
        component: () => import('pages/apiManagement/details.jsx'),
        models: () => [import('pages/apiManagement/model')]
       
    },
    {
        name: '查询栏',
        path: '/queryBar',
        component: () => import('pages/queryBar/demo.jsx'),
    },
    {
        name: '基础表格',
        path: '/baseTable',
        component: () => import('pages/baseTable/demo.jsx'),
    },
];


export {
    routes,
    privateRoutes,
    privateRoutesAll
}