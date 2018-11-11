require('./bootstrap');

window.Vue = require('vue');
window.axios = require('axios');

Vue.component(
    'passport-clients',
    require('./components/passport/Clients.vue')
);

Vue.component(
    'passport-authorized-clients',
    require('./components/passport/AuthorizedClients.vue')
);

Vue.component(
    'passport-personal-access-tokens',
    require('./components/passport/PersonalAccessTokens.vue')
);

import router from './router/index.js'
import store from './store/index.js'
const app = new Vue({
    el: '#app',
    router,
    store,
});
