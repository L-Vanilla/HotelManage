<template>
  <el-row  class="tac  firstmenu" style="height:100%;" >
    <el-col style="height:100%;">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        :router="true"
        text-color="#fff"
        @select="handleSelect"
        style="height:100%;">
        <el-submenu index="基本信息管理" style="background-color: #42485b" v-if="user.userPower==='0'">
          <template slot="title">
            <p style="color:#ffffff;font-size: 14px; ">
              <img src="../../assets/basic_msg.png" style="width: 16px;height: 16px"/>
              &nbsp;&nbsp;基本信息管理</p>
          </template>
          <el-menu-item index="客房类型管理" route="guestType">客房类型管理</el-menu-item>
          <el-menu-item index="楼层管理" route="floor">楼层管理</el-menu-item>
          <el-menu-item index="商品类别管理" route="GoodsType">商品类别管理</el-menu-item>
          <el-menu-item index="商品管理" route="Goods">商品管理</el-menu-item>
          <el-menu-item index="会员管理" route="leaguer">会员管理</el-menu-item>
        </el-submenu>
        <el-submenu index="系统管理" style="background-color: #42485b" v-if="user.userPower==='0'">
          <template slot="title">
            <p style="color:#ffffff;font-size: 14px; ">
              <img src="../../assets/system.png" style="width: 16px;height: 16px"/>
              &nbsp;&nbsp;系统管理</p>
          </template>
          <el-menu-item index="用户管理" route="user">用户管理</el-menu-item>
          <el-menu-item index="日志管理" route="logManagement">日志管理</el-menu-item>
        </el-submenu>
        <el-submenu index="客房管理" style="background-color: #42485b" v-if="user.userPower==='0'">
          <template slot="title">
            <p style="color:#ffffff;font-size: 14px; ">
              <img src="../../assets/hotel_msg.png" style="width: 18px;height: 18px"/>
              &nbsp;&nbsp;客房管理
            </p>
          </template>
          <el-menu-item index="客房信息管理" route="rooms">客房信息管理</el-menu-item>
        </el-submenu>
        <el-submenu index="房客管理" style="background-color: #42485b" v-if="user.userPower!=='1'">
          <template slot="title"><p style="color:#ffffff;font-size: 14px; ">
            <img src="../../assets/people_msg.png" style="width: 16px;height: 16px"/>&nbsp;&nbsp;房客管理</p>
          </template>
          <el-menu-item index="客房预定" route="roomslist">客房预定</el-menu-item>
          <el-menu-item index="客房预定订单" route="orderManage">客房预定订单</el-menu-item>
          <el-menu-item index="预订转入住" route="reservedTransfer">预订转入住</el-menu-item>
          <el-menu-item index="入住登记管理" route="orderlist">入住登记管理</el-menu-item>
          <el-menu-item index="换房管理" route="changeroom">换房管理</el-menu-item>
          <el-menu-item index="结账管理" route="checkout">结账管理</el-menu-item>
          <el-menu-item index="已结账信息" route="livedList">已结账信息</el-menu-item>
        </el-submenu>
        <el-submenu index="报表管理" style="background-color: #42485b" v-if="user.userPower!=='2'">
          <template slot="title"><p style="color:#ffffff;font-size: 14px; ">
            <img src="../../assets/table_msg.png" style="width: 16px;height: 16px"/>&nbsp;&nbsp;报表管理</p>
          </template>
          <el-menu-item index="预定客人报表" route="reservation_list">预定客人报表</el-menu-item>
          <el-menu-item index="在住客人报表" route="living_list">在住客人报表</el-menu-item>
          <el-menu-item index="离店客人报表" route="leaving_list">离店客人报表</el-menu-item>
          <el-menu-item index="财务进账报表" route="financial">财务进账报表</el-menu-item>
        </el-submenu>
        <el-submenu index="消费管理" style="background-color: #42485b" v-if="user.userPower!=='1'">
          <template slot="title"><p style="color:#ffffff;font-size: 14px; ">
            <img src="../../assets/consume.png" style="width: 19px;height: 19px"/>&nbsp;&nbsp;消费管理</p>
          </template>
          <el-menu-item index="附加消费入账" route="account">附加消费入账</el-menu-item>
          <el-menu-item index="消费信息" route="consume">消费信息</el-menu-item>
        </el-submenu>

      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
  import store from '@/vuex/store'

  import {mapMutations} from 'vuex'
  export default {
    name:'mymenu',
    data () {
      return {
        user:[]
      }
    },
    methods: {
      ...mapMutations(['SET_MENU']),
      handleSelect(key, keyPath) {
        this.SET_MENU(keyPath);
      },
      //获取用户数据
      loadComments(){
        var list = JSON.parse(localStorage.getItem("user") || '[]');
        this.user = list
      }
    },
    created(){
      this.loadComments()
    },
    store
  }
</script>
<style>
  .firstmenu .el-submenu__title:hover {
    padding-left:23px !important ;
  }

  .el-submenu__title{
    color:  #ffffff!important;
  }
  .el-submenu__title:hover {
    background-color:  #263238 !important;
  }

</style>

<style scoped>
  /*导航颜色样式*/
  .el-menu-item {
    color: #ffffff;
    background-color: #263238 !important;
  }
  .el-menu-item:hover {
    background-color:#333740!important;
    color: #009688;
    border-left: 3px solid #009688;
  }
  .el-menu{
    border-right: 0;
    background-color: #333744;
  }
  .el-menu--inline .el-menu-item:hover{
    padding-left:43px !important;
  }
</style>
