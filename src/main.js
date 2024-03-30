/*
 * @Author: Zhiqing 1775840762@qq.com
 * @Date: 2024-03-25 04:00:57
 * @LastEditors: Zhiqing 1775840762@qq.com
 * @LastEditTime: 2024-03-28 10:03:03
 * @FilePath: \subway_visual\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import dataV from '@jiaminghi/data-view';
import BaiduMap from '@/components/vue-baidu-map/components'
// 引入全局css
import './assets/scss/style.scss';
// 按需引入vue-awesome图标
import Icon from 'vue-awesome/components/Icon';
import 'vue-awesome/icons/chart-bar.js';
import 'vue-awesome/icons/chart-area.js';
import 'vue-awesome/icons/chart-pie.js';
import 'vue-awesome/icons/chart-line.js';
import 'vue-awesome/icons/align-left.js';

//引入echart
//4.x 引用方式
import echarts from 'echarts'
//5.x 引用方式为按需引用
//希望使用5.x版本的话,需要在package.json中更新版本号,并切换引用方式
//import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false;

// 全局注册
Vue.component('icon', Icon);
Vue.use(dataV);

Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: '9CuJ4yTF9FWr8fqH8JW1iisv1kjmlpX1'
})

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
