<template>
  <div style="margin-top: 10px">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px"  class="demo-ruleForm">
        <el-form-item label="入住编号" prop="id">
           <el-input  v-model="ruleForm.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="入住房间名称" prop="currentRoomName">
           <el-input  v-model="ruleForm.currentRoomName" disabled></el-input>
        </el-form-item>
        <el-form-item label="房间类型" prop="roomsTypeName">
          <el-input  v-model="ruleForm.roomsTypeName"  disabled></el-input>
        </el-form-item>
        <el-form-item label="标准价(元)" prop="normalPrice">
          <el-input  v-model="ruleForm.normalPrice"  disabled></el-input>
        </el-form-item>
        <el-form-item label="折扣价(元)" prop="discountPrice">
          <el-input  v-model="ruleForm.discountPrice"  disabled></el-input>
        </el-form-item>
        <el-form-item label="押金(元)" prop="deposit">
          <el-input  v-model="ruleForm.deposit" disabled></el-input>
        </el-form-item>
        <el-form-item label="预定人" prop="residents">
          <el-input  v-model="ruleForm.residents" disabled></el-input>
        </el-form-item>
        <el-form-item label="证件类型" prop="credentialsType" v-if="ruleForm.credentialsType==0">
           <el-input value="身份证" disabled></el-input>
        </el-form-item>
        <el-form-item label="证件类型" prop="credentialsType" v-if="ruleForm.credentialsType==1">
           <el-input value="护照" disabled></el-input>
        </el-form-item>
        <el-form-item label="证件号码" prop="credentialsNum">
          <el-input  v-model="ruleForm.credentialsNum" disabled></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="phone">
          <el-input  v-model="ruleForm.phone" disabled></el-input>
        </el-form-item>
        <el-form-item label="抵店时间" prop="arrivalTime">
          <el-input  v-model="ruleForm.arrivalTime" disabled></el-input>
        </el-form-item>
        <el-form-item label="离店时间" prop="leaveTime">
          <el-input  v-model="ruleForm.leaveTime" disabled></el-input>
        </el-form-item>
        <el-form-item label="入住人数" prop="personNum">
          <el-input  v-model="ruleForm.personNum" disabled></el-input>
        </el-form-item>
        <el-form-item label="操作人id" prop="userId" hidden>
          <el-input  v-model="ruleForm.userId" disabled></el-input>
        </el-form-item>
        <el-form-item label="操作人" prop="userName">
          <el-input  v-model="ruleForm.userName" disabled></el-input>
        </el-form-item>
        <el-form-item label="会员编号" prop="memberId">
          <el-input  v-model="ruleForm.memberId" disabled></el-input>
        </el-form-item>
        <el-form-item label="会员价(元)" prop="memberPrice">
          <el-input  v-model="ruleForm.memberPrice" disabled></el-input>
        </el-form-item>

        <el-form-item label="登记入住" prop="bookStatus" v-if="ruleForm.bookStatus==1">
        <el-input  value="已入住" disabled></el-input>

        <!--<el-form-item label="预定状态" prop="bookStatus" v-if="ruleForm.bookStatus==0">-->
            <!--<el-input  value="已预定" disabled></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="预定状态" prop="bookStatus" v-if="ruleForm.bookStatus==1">-->
            <!--<el-input  value="已取消" disabled></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="预定状态" prop="bookStatus" v-if="ruleForm.bookStatus==2">-->
            <!--<el-input  value="已入住" disabled></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="预定状态" prop="bookStatus" v-if="ruleForm.bookStatus==3">-->
            <!--<el-input  value="已退房" disabled></el-input>-->
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input  v-model="ruleForm.remarks" disabled></el-input>
        </el-form-item>
        </el-form>
  </div>
</template>
<script>
  export default {
      inject:['reload'],
      props:["id"],
    data () {
        name:"reservedTransferdetails"
      return {
          disabled: true,
          ruleForm:{
            id:"",
            currentRoomId:"",
            normalPrice:"",
            discountPrice:"",

            deposit:"",
            residents:"",
            credentialsType:"",
            credentialsNum:"",
            phone:"",
            arrivalTime:"",
            leaveTime:"",
            personNum:"",
            memberId:"",
            bookStatus:"",
            memberPrice:"",
            roomsTypeName:"",
            remarks:"",
            userId:"",
            userName:""
          },
        rules: {

        },
      }
    },
    created(){
        if(this.id){
             this.get("orderManage/getOne",(data)=>{
                this.ruleForm=data;
                console.log(this.ruleForm);
            },{id:this.id});
        }
    },
    components: {

    },
    methods:{
    }
  };

</script>

<style scoped>


</style>
