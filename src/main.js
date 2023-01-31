import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/icon/iconfont.css'
// import {ElLoading} from 'element-plus/lib/components/loading'
import 'element-plus/theme-chalk/el-message.css'
import { ElMessage } from 'element-plus'
// import { ElLoading } from 'element-plus'
import store from './store';
import {initMenu} from './model/menu'

router.beforeEach((to,from,next)=>{
    initMenu(router,store)
    next()
})
const app = createApp(App);
app.use(router)
app.use(ElMessage)
// app.use(ElLoading)
app.use(store)
// app.use(ElLoading)
app.mount('#app')
