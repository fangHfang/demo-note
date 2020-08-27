import Vue from 'vue';
import App from './App';
import router from './router';
import MintUI from 'mint-ui';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'mint-ui/lib/style.css';
import './assets/css/global.css';
import MyUl from '@/components/common/myUl';
import MyLi from '@/components/common/myLi';
import NavBar from '@/components/common/navBar';

Vue.use(MintUI);
Vue.use(ElementUI);
Vue.config.productionTip = false;

Vue.component('my-ul', MyUl);
Vue.component('my-li', MyLi);
Vue.component('NavBar', NavBar);

import Moment from 'moment';
Vue.filter('coverTime', function(data, formatStr) {
    return Moment(data).format(formatStr);
})

new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    next();
});