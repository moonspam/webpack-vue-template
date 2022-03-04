import Vue from 'vue';
import App from '../components/App.vue';
import router from '../router';

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  render: (h) => h(App),
});
