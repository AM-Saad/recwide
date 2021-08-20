import Vue from 'vue'
import Router from 'vue-router'

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
      component: () => import(/* webpackChunkName: "about" */ './views/screen-recorder.vue')
    },
    {
      path: '/auth/:type',
      name: 'auth',
      meta:{
        sitemap:{
          slugs: [
            {
                type:'login',
                title:"login",
                category: 'auth',
            },
            {
              type:'signup',
              title:"signup",
              category: 'auth',
          }
          ]
        }
      },
      component: () => import( /* webpackChunkName: "auth" */ './views/Auth.vue')
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import( /* webpackChunkName: "projects" */ './views/Projects.vue')
    },
    {
      path: '/editor',
      name: 'editor',
      component: () => import( /* webpackChunkName: "editor" */ './views/Editor.vue')
    },
    {
      path: '/account',
      name: 'account',
      component: () => import( /* webpackChunkName: "account" */ './views/Account.vue')
    },
  ],

})
