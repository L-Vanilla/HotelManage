<template>
  <el-container class="wrap">
    <el-header class="header" style=" display: inline-block;">
      <img src="../assets/hotel.png" style="width: 26px;height: 26px;display:inline-block; vertical-align:middle"/>
      <h1  class="title">酒店管理系统</h1>
      <!--<button @click="logout()" class="logout">退出</button>-->
      <!--<p  class="user">{{user.userName}}</p>-->
      <el-menu
        :default-active="activeIndex2"
        mode="horizontal"
        @select="handleSelect"
        background-color="#333744"
        text-color="#fff"
        style=" display: inline-block;float: right"
        active-text-color="#ffd04b">
        <el-submenu index="2" style="float: right">
          <template slot="title">{{user.userName}}</template>
          <el-menu-item index="2-1" @click="edit()">修改信息</el-menu-item>
          <el-menu-item index="2-1" @click="logout()">退出</el-menu-item>
        </el-submenu>
      </el-menu>
      <img src="../assets/census.png" @click="home()"
           style="width: 26px;height: 26px;display:inline-block; cursor: pointer;vertical-align:middle;float:right; margin-top:15px;margin-right:10px"/>
    </el-header>
    <el-container class="content">
      <el-aside width="200px">
        <Menu>
        </Menu>
      </el-aside>
      <el-main style="background-color: #F4F4F4;">
        <MyBreadcrumb style="margin-bottom:20px;"></MyBreadcrumb>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import Menu from '@/components/frame/menu'
  import MyBreadcrumb from '@/components/frame/myBreadcrumb'
  export default {
    name:"index",
    data () {
      return {
        activeIndex2: '1',
        user:[],
      }
    },

    methods:{      //从本地的localStorage中，加载列表
      loadUser(){
        var list = JSON.parse(localStorage.getItem("user") || '[]');
        this.user = list;
        console.log(this.user);
      },
      //用户退出，销毁localStorage
      logout(){
            this.get("user/logout",(data)=>{
              if(data>0){
                this.$message({
                  type: 'success',
                  message: '退出成功!'
                });
                localStorage.removeItem('user');
                localStorage.removeItem('islogin');
                alert("退出成功");
                this.$router.push('/');
              }
            });

      },
      //跳转首页
      home(){
        this.$router.push({ path:'/index'  })
      },
      edit(){
        this.$layer.iframe({
          content: {
            content: EditUser, //传递的组件对象
            parent: this,//当前的vue对象
            data:{id:this.user.id,
                  userName:this.user.userName,
                  userPwd:this.user.userPwd,
                  remarks:this.user.remarks
            }//props
          },
          area:['800px','600px'],
          title: '修改个人信息',
          shadeClose: false,
          shade :true
        });
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    created(){
      var islogin = localStorage.getItem("islogin");
      if(islogin!='1'){
        this.$router.push('/');
      }
      this.loadUser();

    },
    watch:{
      islogin: {
        handler:function(){

        },
        deep:true
      }
    },
    components: {
      Menu,
      MyBreadcrumb
    }
  }
</script>
<style scoped>
  @keyframes in {
    from{transform: translateY(-30px);opacity: 0;}
    to{transform: translateY(0px);opacity: 1;}
  }
  @-webkit-keyframes in{
    from{transform: translateY(-30px);opacity: 0;}
    to{transform: translateY(0px);opacity: 1;}
  }
  .wrap{
    height:100%;
    display: flex;
    flex-direction:column;
    background-color: #373d41;
  }
  .header{
    padding:0;
    padding-left: 2%;
    line-height: 60px;
    background-color:#333744;
  }
  .header>.title {
    height:100%;
    animation: in 1s;
    -webkit-animation: in 1s;
    color: #ffffff;
    display: inline-block;
    vertical-align:middle
  }
  .header>.logout {
    height:100%;
    animation: in 1s;
    -webkit-animation: in 1s;
    color: red;
    display: inline-block;
    float: right;
    background-color: #373d41;
    padding-left: 10px;
    padding-right: 10px;
    margin-right: 10px;
    border: none;
    font-size: 16px;
    vertical-align:middle;
    cursor:pointer
  }
  .header>.user {
    height:100%;
    animation: in 1s;
    -webkit-animation: in 1s;
    color: #ffffff;
    font-size: 20px;
    display: inline-block;
    float: right;
    margin-right: 10px;
    vertical-align:middle
  }
  .content{
    flex: 1;
  }

</style>
