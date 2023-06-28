import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
import Notifications from '@kyvg/vue3-notification'
import { loadFonts } from './plugins/webfontloader'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import * as process from 'process';
import router from './router'
import App from './App.vue'

import '@assets/main.css'
import './index.css'

loadFonts()

window.global = window;
window.process = process;
window.Buffer = [];

//Add all icons to the library so you can use it in your page
library.add(fas, far, fab)

const pinia = createPinia()
pinia.use(piniaPersist)
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(Notifications)
app.component("font-awesome-icon", FontAwesomeIcon);

router.isReady().then(() => {
  // Waiting for the router to be ready prevents race conditions when returning from a loginRedirect or acquireTokenRedirect
  app.mount('#app');
});
