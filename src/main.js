// Pinia là thư viện quản lý trạng thái chính thức cho Vue 3. 
// Nó cho phép bạn lưu trữ và chia sẻ dữ liệu giữa các component hoặc trang.


import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap/dist/css/bootstrap.css'



import { createPinia } from 'pinia'
const app = createApp(App)
app.use(createPinia())
app.mount('#app')

createApp(App).use(router).mount('#app');
