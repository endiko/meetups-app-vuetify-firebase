import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import AuthGuard from './auth-guard.js'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/meetups',
      name: 'meetups',
      component: () => import('@/components/Meetup/Meetups.vue')
    },
    {
      path: '/meetups/new',
      name: 'createMeetup',
      component: () => import('@/components/Meetup/CreateMeetup.vue'),
      beforeEnter: AuthGuard
    },
    {
      path: '/meetups/:id',
      name: 'meetup',
      props: true,
      component: () => import('@/components/Meetup/Meetup.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/components/User/Profile.vue'),
      beforeEnter: AuthGuard
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('@/components/User/Signin.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/components/User/Signup.vue')
    }
  ]
})
