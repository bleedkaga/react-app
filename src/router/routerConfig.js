/*路由配置文件*/
const routes = [
    {
        id:'0',
        pid:'0',
        name:'login',
        icon:'',
        path:'/login',
        models:()=>[import('../routes/login/model')],
        component:()=>import('../routes/login/index.jsx')
    },
    {
        id:'1',
        pid:'1',
        name:'register',
        icon:'',
        path:'/register',
        models:()=>[import('../models/global')],
        component:()=>import('../routes/register/index.jsx')
    }
];
const privateRoutes = [
    {
        id: '1',
        pid: '0-0-0',
        name: '工作台',
        icon: 'user',
        path: '/index',
        models: () => [import('../routes/login/model')],
        component: () => import('../routes/workbench/index.jsx')
    },
    {
        id:'2',
        pid:'0-0-1',
        name:'菜单列表',
        icon:'bars',
        path:'/menu',
        models:()=>[import('../routes/menu/model')],
        component:()=>import('../routes/menu/index.jsx'),
    },
    {
        id:'3',
        pid:'0-0-2',
        name:'工作台',
        icon:'user',
        path:'/workbench',
        models:()=>[import('../routes/login/model')],
        component:()=>import('../routes/workbench/index.jsx')
    },
];
const privateRoutesAll = [
    {
        id: '1',
        pid: '0-0-0-1',
        name: '菜单详情页',
        icon: 'user',
        path: '/menu/details',
        models: () => [import('../routes/login/model')],
        component: () => import('../routes/menu/details.jsx')
    },
]
export default {
    routes,
    privateRoutes,
    privateRoutesAll
}
