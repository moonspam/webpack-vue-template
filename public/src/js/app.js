import Vue from 'vue';
import VueRouter from 'vue-router';
import App from '../components/App.vue';
import Main from '../components/Main.vue';
import Sub from '../components/Sub.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: Main },
  { path: '/sub', component: Sub },
];

const router = new VueRouter({
  // mode: 'history',
  routes,
});

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  render: (h) => h(App),
});
