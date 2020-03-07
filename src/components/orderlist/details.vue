<template>
  <div style="margin-top: 15px;">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="房间类型" prop="roomsTypeName" >
        <el-input   v-model="ruleForm.roomsTypeName" disabled></el-input>
      </el-form-item>
      <el-form-item label="房间编号" prop="currentRoomName">
        <el-input   v-model="ruleForm.currentRoomName" disabled></el-input>
      </el-form-item>
      <el-form-item label="标准价(元)" prop="normalPrice">
        <el-input   v-model="ruleForm.normalPrice" disabled></el-input>
      </el-form-item>
      <el-form-item label="折后价(元)" prop="discountPrice">
        <el-input   v-model="ruleForm.discountPrice" disabled></el-input>
      </el-form-item>

      <el-form-item label="会员编号" prop="memberId">
        <el-input  v-model="ruleForm.memberId" disabled></el-input>
      </el-form-item>
      <el-form-item label="入住人" prop="residents">
        <el-input   v-model="ruleForm.residents" disabled></el-input>
      </el-form-item>
      <el-form-item label="会员价(元)" prop="memberPrice">
        <el-input   v-model="ruleForm.memberPrice" disabled></el-input>
      </el-form-item>
      <el-form-item label="押金(元)" prop="deposit">
        <el-input  v-model="ruleForm.deposit" disabled></el-input>
      </el-form-item>
      <el-form-item label="证件类型:" prop="credentialsType">
        <el-radio-group v-model="ruleForm.credentialsType" disabled>
          <el-radio  label="0">身份证</el-radio>
          <el-radio label="1">护照</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="证件号码" prop="credentialsNum">
        <el-input  v-model="ruleForm.credentialsNum" disabled></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="phone">
        <el-input   v-model="ruleForm.phone" disabled></el-input>
      </el-form-item>
      <el-form-item label="抵店时间" prop="arrivalTime">
        <el-date-picker
          v-model="ruleForm.arrivalTime"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择日期" disabled>
        </el-date-picker>
      </el-form-item>
      <el-form-item label="离店时间" prop="leaveTime" >
        <el-date-picker
          v-model="ruleForm.leaveTime"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择日期" disabled>
        </el-date-picker >
      </el-form-item>
      <el-form-item label="入住人数" >
        <el-input-number v-model="ruleForm.personNum" @change="handleChange" :min="1" :max="10" disabled>
        </el-input-number>
      </el-form-item>
      <el-form-item label="操作人id" prop="userId" hidden>
        <el-input  v-model="ruleForm.userId" disabled></el-input>
      </el-form-item>
      <el-form-item label="操作人" prop="userName">
        <el-input  v-model="ruleForm.userName" disabled></el-input>
      </el-form-item>

      <el-form-item prop="timedWakeup" label="服务唤醒" disabled>
        <el-checkbox true-label="1" false-label="0" v-model="ruleForm.breakfast" disabled>提供早餐</el-checkbox>
        <el-checkbox true-label="2" false-label="0" v-model="ruleForm.timedWakeup" disabled>定时叫醒</el-checkbox>
      </el-form-item>
      <el-form-item label="备注" prop="remarks">
        <el-input   v-model="ruleForm.remarks" disabled></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    inject:['reload'],
    props:["id"],
    data () {
      name:"orderlistedit"

      return {
        guestTypes:[],
        ruleForm:{
          id:"",
          originalRoomName:"",
          currentRoomName:"",
          bookStatus:2,
          roomTypeId:"",
          normalPrice:"",
          discountPrice:"",
          deposit:"",
          residents:"",
          roomsTypeName:"",
          credentialsType:"",
          credentialsNum:"",
          phone:"",
          arrivalTime:"",
          leaveTime:"",
          personNum:1,
          memberId:"",
          memberPrice:"",
          breakfast:"",
          timedWakeup:"",
          remarks:"",
          active:"",
          createDate:"",
          userId:"",
          userName:""
        },
        rules:{},
      }
    },
    created(){

      // this.get("orderManage/getAllGoodsType",(data)=>{
      //   this.goodsTypes=data;
      // });
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
      handleChange(value) {
        console.log(value);
      },
      resetForm(formName){
        this.$refs[formName].resetFields();
      },

    }
  }
</script>

<style scoped>


</style>
