import Vue from 'vue';
import Router from 'vue-router';
import index from '@/components/index/index';
import report from '@/components/report/report';
import daily from '@/components/daily/daily';
import mine from '@/components/mine/mine';
import NewList from '@/components/newList/newList';
import newDetail from '@/components/newDetail/newDetail';
import tab from '@/components/tab';
import userEmail from '@/components/mine/userEmail';
import userProfile from '@/components/mine/userProfile';
import UserProfilePreview from '@/components/mine/UserProfilePreview';

Vue.use(Router)

export const routes = [{
        path: '/',
        name: 'tab',
        redirect: '/index',
        component: tab,
        children: [{
            path: '/index',
            name: 'index',
            component: index,
            meta: {
                title: '首页'
            }
        }, {
            path: '/report',
            name: 'report',
            component: report,
            meta: {
                title: '报告'
            }
        }, {
            path: '/daily',
            name: 'daily',
            component: daily,
            meta: {
                title: '日报'
            }
        }, {
            path: '/mine/:name',
            name: 'mine',
            component: mine,
            meta: {
                title: '我的'
            },
            children: [{
                    path: '/userEmail',
                    name: 'userEmail',
                    component: userEmail,
                    props: (route) => ({ query: route.query.id })
                },
                {
                    path: '/userProfile',
                    name: 'userProfile',
                    components: {
                        default: userProfile,
                        helper: UserProfilePreview
                    }
                }
            ]
        }, ]
    },
    {
        path: '/newsList',
        name: 'newlist',
        component: NewList,
        meta: {
            title: '新闻列表'
        }
    },
    {
        path: '/newDetail',
        name: 'newDetail',
        component: newDetail,
        meta: {
            title: '新闻详情'
        }
    }
];
export default new Router({
    routes: routes
})