<template>
  <div class="main">
    <form class="form">
      <div class="form__cover"></div>
      <div class="form__loader">
        <div class="spinner active">
          <svg class="spinner__circular" viewBox="25 25 50 50">
            <circle class="spinner__path" cx="50" cy="50" r="20" fill="none" stroke-width="4" stroke-miterlimit="10"></circle>
          </svg>
        </div>
      </div>
      <div class="form__content">
        <h1>酒店管理系统</h1>
        <div class="styled-input">
          <input type="text" class="styled-input__input" v-model="loginForm.userName" placeholder="请输入账号" required></input>
          <!--<div class="styled-input__placeholder"> <span class="styled-input__placeholder-text">Username</span> </div>-->
          <!--<div class="styled-input__circle"></div>-->
        </div>
        <div class="styled-input">
          <input type="password" class="styled-input__input" v-model="loginForm.userPwd" placeholder="请输入密码" required/>
          <!--<div class="styled-input__placeholder"> <span class="styled-input__placeholder-text">Password</span> </div>-->
          <!--<div class="styled-input__circle"></div>-->
        </div>
        <button type="button" class="styled-button" @click="login()"> <span class="styled-button__real-text-holder"> <span class="styled-button__real-text">登录</span> <span class="styled-button__moving-block face"> <span class="styled-button__text-holder"> <span class="styled-button__text">登录</span> </span> </span><span class="styled-button__moving-block back"> <span class="styled-button__text-holder"> <span class="styled-button__text">登录</span> </span> </span> </span> </button>
        <h5 style="color: #714cab;">开发人员：阿伊莎、杨美琪、刘香草、张银萍、苏林、罗丹峰</h5>
      </div>
    </form>
  </div>
</template>
<script>
  import API from '../assets/login.js';
  import { mapMutations } from 'vuex';
  export default {
    data() {
      return {
        loginForm: {
          userName: '',
          userPwd: ''
        },
        user: {},
        rules: {
          userName: [
            { required: true, message: '请输入用户名称', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
          ],
          userPwd: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        }
      };
    },

    methods: {
      ...mapMutations(['changeLogin']),
      login() {
        if (this.loginForm.userName === '' || this.loginForm.userPwd === '') {
          alert('账号或密码不能为空');
        } else {
          console.log(this.loginForm);
          var params = new URLSearchParams();
          params.append('userName', this.loginForm.userName);
          params.append('userPwd', this.loginForm.userPwd);
          this.axios({
            method: 'post',
            url: '/user/login',
            data: params
          }).then(res => {
            this.user = res.data;
            // console.log(res.data);
            if (res.data.userName === this.loginForm.userName) {
              // console.log(res.data);
              this.$router.push('/index');
              localStorage.setItem('user', JSON.stringify(res.data));
              localStorage.setItem('islogin', '1');
              alert('登陆成功');
            } else {
              alert('账号不存在');
            }
          }).catch(error => {
            alert('账号或密码错误');
            // console.log(error);
          });
        }
      }
    }
  };

</script>
<style scoped>
  @import "../assets/login.css";
</style>
