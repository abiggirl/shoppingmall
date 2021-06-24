// import { createApp, vue } from 'vue'
// import App from './App.vue'
// import router from './router'
// import bus from './bus'
// import store from './store'
// vue.config.devtools = true

// createApp(App).use(router).mount('#app')
// App.config.globalProperties.$bus = bus

// import Vue from 'vue'
// import App from './App.vue'
// import router from './router'

// Vue.config.productionTip = false

// /* eslint-disable no-new */
// new Vue({

//     router,
//     render: h => h(App)
// }).$mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import store from './store'
const app = createApp(App)

import bus from './bus'

app.use(router).mount('#app')
app.config.globalProperties.$bus = bus
