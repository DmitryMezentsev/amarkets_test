import Vue from 'vue';
import Vuex from 'vuex';
import BootstrapVue from 'bootstrap-vue';
import VueTheMask from 'vue-the-mask';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import datePicker from 'vue-bootstrap-datetimepicker';

// eslint-disable-next-line import/no-extraneous-dependencies
import 'bootstrap/dist/css/bootstrap';
import 'bootstrap-vue/dist/bootstrap-vue';
// eslint-disable-next-line import/extensions, import/no-extraneous-dependencies
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker';

import 'Common/styles';
import 'Common/js/vee-validate-rules';
import store from 'Common/js/store';
import App from 'Components/App';

Vue.use(Vuex);
Vue.use(BootstrapVue);
Vue.use(datePicker);
Vue.use(VueTheMask);
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);

window.app = new Vue({
  el: '#app',
  render: h => h(App),
  store,
});
