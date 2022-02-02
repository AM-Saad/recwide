import Vue from 'vue'
import Router from 'vue-router'
import { request } from "./api/request"
Vue.use(Router)


export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "Home" */ './views/Home.vue')

    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/recorder',
      name: 'recorder',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Recording/screen-recorder.vue')
    },
    {
      path: '/auth/:type',
      name: 'auth',
      meta: {
        sitemap: {
          slugs: [
            {
              type: 'login',
              title: "login",
              category: 'auth',
            },
            {
              type: 'signup',
              title: "signup",
              category: 'auth',
            }
          ]
        }
      },
      component: () => import( /* webpackChunkName: "auth" */ './views/User/Auth.vue')
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import( /* webpackChunkName: "projects" */ './views/Recording/Projects.vue'),
      meta: {
        requiredAuth: true,
      }
    },
    {
      path: '/project/:slug',
      name: 'project',
      component: () => import( /* webpackChunkName: "projects" */ './views/Recording/Project.vue'),
      meta: {
        requiredAuth: true,
        sitemap: {
          slugs: [
            
          ]
        }
      }
    },
    {
      path: '/editor',
      name: 'editor',
      component: () => import( /* webpackChunkName: "editor" */ './views/Recording/Editor.vue'),
      meta: {
        requiredAuth: true,
      }
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import( /* webpackChunkName: "settings" */ './views/User/Settings.vue'),
      meta: {
        requiredAuth: true,
      }
    },
    {
      path: '/new-meeting',
      name: 'new-meeting',
      component: () => import( /* webpackChunkName: "settings" */ './views/Meeting/Create_Meeting.vue'),
      meta: {
        requiredAuth: true,
      }
    },
    {
      path: '/join-meeting',
      name: 'join-meeting',
      component: () => import( /* webpackChunkName: "settings" */ './views/Meeting/Join_Meeting.vue'),
      meta: {
        requiredAuth: true,
      }
    },
    {
      path: '/start-meeting',
      name: 'start-meeting',
      component: () => import( /* webpackChunkName: "settings" */ './views/Meeting/Start_Meeting.vue'),
      meta: {
        requiredAuth: true,
      }
    },
    // {
    //   path: '/meeting/:id',
    //   name: 'meeting',
    //   component: () => import( /* webpackChunkName: "settings" */ './views/Meeting/Meeting.vue'),
    //   meta: {
    //     requiredAuth: true,
    //   }
    // },
  ],

})

