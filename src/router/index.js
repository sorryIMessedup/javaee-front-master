import Vue from 'vue'
import Router from 'vue-router'
import Main from '../views/Main'
import TestWeb from '../views/TestWeb'

/* User */
import Login from "../views/Login"
import Register from "../views/Register"
import MyData from '../views/MyData.vue'
import UserManage from '../views/user/UserManage.vue'
import UserCenter from '../views/user/UserCenter.vue'

/* Paper */
import PaperManage from '../views/paper/PaperManage'
import PaperUpload from '../views/paper/PaperUpload'
import PaperChange from '../views/paper/PaperChange'
import PaperView from '../views/paper/PaperView'
import AllPaperManage from '../views/paper/AllPaperManage'
import GoSearch from '../views/paper/GoSearch'
import GoSearchResult from '../views/paper/GoSearchResult'

/* Subject */
import SubjectManage from '../views/subject/SubjectManage'
import SubjectUpload from '../views/subject/SubjectUpload'
import SubjectChange from '../views/subject/SubjectChange'

Vue.use(Router);

const router = new Router({
    routes: [
        { path: '/Login', name: 'Login', component: Login },
        { path: '/', redirect: '/Login'},
        { path: '/Register', name: 'Register', component: Register },
        { path: '/Main', name: 'Main', component: Main,
            redirect: '/MyData',
            children: [
                /* MyData */
                { path: '/MyData', component: MyData },
                /* Paper */
                { path: '/2-1', component: PaperManage },
                { path: '/2-2', component: PaperUpload },
                { path: '/PaperChange', name: 'PaperChange', component: PaperChange },
                { path: '/PaperView', name: 'PaperView', component: PaperView },
                /* Subject */
                { path: '/3-1', component: SubjectManage },
                { path: '/3-2', component: SubjectUpload },
                { path: '/SubjectChange', component: SubjectChange },
                /* Search */
                { path: '/2-3', component: GoSearch },
                { path: '/GoSearchResult', component: GoSearchResult },
                /* UserCenter */
                { path: '/6', component: UserCenter },
                /* Administrator */
                { path: '/7-1', component: UserManage },
                { path: '/7-2', component: AllPaperManage},
                { path: '/7-3', component: TestWeb}
            ]
        }
    ]
});

//router.beforeEach((to, from, next) => {
//    if (to.path === '/Login' || to.path === '/Register') return next()
//    const tokenStr = window.sessionStorage.getItem('token')
//    if (!tokenStr) {
//        alert('你还未登录，请先登录')
//        return next('/Login')
//    }
//    next()
//})// 路由导航守卫最后去搞 如果没有token不能访问除了login之外的所有页面

export default router
