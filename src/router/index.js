import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Attendance from '../views/Attendance.vue';
import User from '../views/User.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/attendances/new',
    name: 'Attendance',
    component: Attendance,
  },
  {
    path: '/users',
    name: 'User',
    component: User,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
