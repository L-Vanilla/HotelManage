// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import mypublic from '@/public/mypublicjs'
import axios from 'axios'
import layer from 'vue-layer'
// import store from './vuex/store.js'


axios.defaults.baseURL="http://127.0.0.1/";
Vue.prototype.axios=axios;
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.get=mypublic.get;
Vue.prototype.merge=mypublic.merge;
Vue.prototype.$layer = layer(Vue);
Vue.prototype.reset=function(formName){
  this.$refs[formName].resetFields();
}
Vue.prototype.post=function(formName,url,params,
  callback=()=>{
  this.$layer.closeAll();
  this.reload()
  }
,config={}){
this.$refs[formName].validate((valid) => {
if (valid) {
  mypublic.post(url,params,callback,config);
} else {
  return false;
}
});
}
Vue.prototype.delete=function(url,id,status){
  mypublic.del(id,status,(id,status)=>{
    mypublic.get(url,(result)=>{
      this.$message({
        showClose: true,
        message: 'success',
        type: 'success'
      });
      this.reload();
    },{id:id,active:status});
  })
}
//Vanilla
axios.defaults.withCredentials = true
/* eslint-disable no-new */
new Vue({
  el: '#app',
  // store,
  router,
  components: { App },
  template: '<App/>'
})
