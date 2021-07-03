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
import store from './store'
import lazyPlugin from 'vue3-lazy'
const app = createApp(App)

import bus from './bus'
import FastClick from "fastclick";

app.use(router).use(store).use(lazyPlugin, {
    // loading: require('@/assets/images/default.png'), // 图片加载时默认图片
    // error: require('@/assets/images/error.png') // 图片加载失败时默认图片
}).mount('#app')
app.config.globalProperties.$bus = bus


FastClick.attach(document.body)
