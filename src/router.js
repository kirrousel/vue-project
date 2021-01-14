import {createRouter, createWebHistory} from "vue-router";

import store from './store/index';

const CoachDetail = () => import('./pages/coaches/CoachDetail');
const CoachRegistration = () => import('./pages/coaches/CoachRegistration');
const CoachesList = () => import('./pages/coaches/CoachesList');
const ContactCoach = () => import('./pages/requests/ContactCoach');
const RequestsReceived = () => import('./pages/requests/RequestsReceived');
const NotFound = () => import('./pages/NotFound');
const UserAuth = () => import('./pages/auth/UserAuth');

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {path: '/', redirect: 'coaches'},
    {path: '/coaches', component: CoachesList},
    {
      path: '/coaches/:id',
      props: true,
      component: CoachDetail,
      children: [
        {path: 'contact', component: ContactCoach},
      ]
    },
    {path: '/register', component: CoachRegistration, meta: {requiresAuth: true}},
    {path: '/requests', component: RequestsReceived, meta: {requiresAuth: true}},
    {path: '/auth', component: UserAuth, meta: {requiresUnauth: true}},
    {path: '/:notFound(.*)', component: NotFound},
  ],
});

router.beforeEach(function(to, from, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth');
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next('/coaches');
  } else {
    next();
  }
})

export default router;
