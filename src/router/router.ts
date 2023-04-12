import { createRouter, createWebHistory } from 'vue-router';

import LoginForm from '../components/LoginForm.vue'
import MyPage from '../components/MyPage.vue'
import { apiVerifyToken } from '@/apis/VerifyToken'

const routes = [
    {
        path: '/LoginSysWeb',
        name: 'Login',
        component: LoginForm
    },

    {
        path: '/LoginSysWeb/MyPage',
        name: 'MyPage',
        component: MyPage
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    if (to.path == '/LoginSysWeb') {
        localStorage.removeItem('token')
        localStorage.removeItem('userName')
        localStorage.removeItem('userId')
        next()
    } else {
        let userToken = localStorage.getItem('token')
        if (userToken == null || userToken == '') {
            alert("Please sign in");
            return next('/LoginSysWeb');
        } else {
            apiVerifyToken().then((response)=>{
                if(response.data.code == 200){
                    next()
                }else{
                    localStorage.removeItem('token')
                    localStorage.removeItem('userName')
                    localStorage.removeItem('userId')
                    alert("Please sign in");
                    return next('/LoginSysWeb');
                }
            })
        }
    }
})

export default router


