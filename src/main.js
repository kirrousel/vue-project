import { createApp, defineAsyncComponent } from 'vue';

import router from './router';
import App from './App.vue';
import store from './store/index';
import BaseCard from './components/ui/BaseCard.vue';
import BaseButton from './components/ui/BaseButton.vue';
import BaseBadge from "./components/ui/BaseBadge";

const BaseDialog = defineAsyncComponent(() => import('./components/ui/BaseDialog'));

const app = createApp(App);
app.component('BaseCard', BaseCard);
app.component('BaseButton', BaseButton);
app.component('BaseBadge', BaseBadge);
app.component('BaseDialog', BaseDialog);
app.use(router);
app.use(store);

app.mount('#app');
