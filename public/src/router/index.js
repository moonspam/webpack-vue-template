import Vue from 'vue';
import VueRouter from 'vue-router';

import Main from '../components/Main.vue';
import Sub from '../components/Sub.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'hash',
  routes: [
    { path: '*', component: Main },
    { path: '/', component: Main },
    { path: '/sub', component: Sub },
  ],
});

export default router;
