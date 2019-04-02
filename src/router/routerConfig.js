/*路由配置文件*/
const routes = [
    {
        id:'0',
        pid:'0',
        name:'',
        icon:'',
        path:'/',
        models:()=>[import('../pages/login/model')],
        component:()=>import('../pages/login/index.jsx')
    },
    {
        id:'1',
        pid:'1',
        name:'login',
        icon:'',
        path:'/login',
        models:()=>[import('../pages/login/model')],
        component:()=>import('../pages/login/index.jsx')
    },
    {
        id:'2',
        pid:'2',
        name:'register',
        icon:'',
        path:'/register',
        models:()=>[import('../models/global')],
        component:()=>import('../pages/register/index.jsx')
    }
];
const privateRoutes = [
    /*{
        name: 'API管理',
        icon: 'link',
        path: '/apiManagement',
        models: () => [import('../pages/apiManagement/model')],
        component: () => import('../pages/apiManagement/index.jsx')
    },*/
    {
        id:'01',
        pid:'0-0-3',
        name:'顾问白名单',
        icon:'file-text',
        path:'/serviceadviserlist',
        models:()=>[import('../pages/serviceadviserlist/model')],
        component:()=>import('../pages/serviceadviserlist/index.jsx')
    },
    {
        id:'02',
        pid:'0-0-3',
        name:'vip记录',
        icon:'star',
        path:'/viprecord',
        models:()=>[import('../pages/viprecord/model')],
        component:()=>import('../pages/viprecord/index.jsx')
    },
    {
        id:'03',
        pid:'0-0-3',
        name:'福利业绩记录',
        icon:'bell',
        path:'/welfarerecord',
        models:()=>[import('../pages/welfarerecord/model')],
        component:()=>import('../pages/welfarerecord/index.jsx')
    },
    {
        id:'04',
        pid:'0-0-3',
        name:'薪筹业绩记录',
        icon:'calculator',
        path:'/salaryrecord',
        models:()=>[import('../pages/salaryrecord/model')],
        component:()=>import('../pages/salaryrecord/index.jsx')
    },
    {
        id:'05',
        pid:'0-0-3',
        name:'交接记录',
        icon:'team',
        path:'/serviceadviserchangelist',
        models:()=>[import('../pages/serviceadviserchangelist/model')],
        component:()=>import('../pages/serviceadviserchangelist/index.jsx')
    },
];
const privateRoutesAll = [
    /*{
        name: 'API管理详情',
        path: '/apiManagement/details',
        models: () => [import('../pages/apiManagement/model')],
        component: () => import('../pages/apiManagement/details.jsx')
    },*/
];
export default {
    routes,
    privateRoutes,
    privateRoutesAll
}
