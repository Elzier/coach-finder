import { createApp, defineAsyncComponent } from 'vue'
import App from './App.vue'
import router from './router'
import BaseButton from '@/components/ui/BaseButton'
import BaseBadge from '@/components/ui/BaseBadge'
import store from './store/index'
import BaseCard from '@/components/ui/BaseCard'
import NotFound from '@/pages/NotFound'
import BaseSpinner from './components/ui/BaseSpinner'

const BaseDialog = defineAsyncComponent(() => import('@/components/ui/BaseDialog'))

const app = createApp(App)

app.use(store)
app.use(router)
app.component('base-button', BaseButton)
app.component('base-badge', BaseBadge)
app.component('base-card', BaseCard)
app.component('not-found', NotFound)
app.component('base-spinner', BaseSpinner)
app.component('base-dialog', BaseDialog)

app.mount('#app')
