import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import './css/reset.css';
import './css/spacing.css';
import AutoLogin from './plugins/autoLogin';

const app = createApp(App);

app.use(AutoLogin);
app.use(createPinia());
app.use(router);

app.mount('#app');
