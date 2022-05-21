import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignUpView from '../views/SignUpView.vue'
import LoggedInView from '../views/LoggedInView'
import LoggedOutView from '../views/LoggedOutView'
import CreateFormView from '../views/CreateFormView'
import UpdateFormView from '../views/UpdateFormView'
import  createStore from '../store/index'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/signUp',
    name: 'signUp',
    component: SignUpView
  },
  {
    path: '/user',
    name: 'user',
    component: LoggedInView
  },
  {
    path: '/loggedOut',
    name: 'loggedOut',
    component: LoggedOutView
  },
  {
    path: '/user/createForm',
    name: 'createForm',
    component: CreateFormView
  },
  {
    path: '/user/:id',
    name: 'updateForm',
    component: UpdateFormView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(async (to, from) => {
  if(!createStore.state.userInfo && (to.name !== 'home' && to.name !== 'signUp')) {
    alert("Login please")
    return {name: 'home'}
  }
})

export default router
