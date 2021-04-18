import Vue from 'vue';
import App from './App.vue';
import router from './router';
import firebase from './plugins/firebase';

Vue.config.productionTip = false;
Vue.prototype.$firebase = firebase;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
