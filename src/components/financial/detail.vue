<template>
  <div style="margin-top: 15px;">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="入住单号" prop="id">
        <el-input  v-model="ruleForm.id" disabled></el-input>
      </el-form-item>
      <el-form-item label="客房编号" prop="currentRoomName">
        <el-input  v-model="ruleForm.currentRoomName" disabled></el-input>
      </el-form-item>
      <el-form-item label="客房类型" prop="roomsTypeName">
        <el-input  v-model="ruleForm.roomsTypeName"  disabled></el-input>
      </el-form-item>
      <el-form-item label="入住人" prop="residents">
        <el-input  v-model="ruleForm.residents" disabled></el-input>
      </el-form-item>
      <el-form-item label="会员编号" prop="memberId">
        <el-input  v-model="ruleForm.remarks"  disabled></el-input>
      </el-form-item>
      <el-form-item label="进账金额" prop="bookStatus">
        <span v-if="ruleForm.bookStatus==0">{{deposit}}</span>
        <span v-if="ruleForm.bookStatus==2 ">{{deposit}}</span>
        <span v-if="ruleForm.bookStatus==3 ">{{totalBill}}</span>
        <span v-if="ruleForm.bookStatus==4 ">{{deposit}}</span>
      </el-form-item>
      <el-form-item label="进账时间" prop="bookStatus">
        <span v-if="ruleForm.bookStatus==0">{{createDate1}}</span>
        <span v-if="ruleForm.bookStatus==2 ">{{createDate1}}</span>
        <span v-if="ruleForm.bookStatus==3 ">{{createDate2}}</span>
        <span v-if="ruleForm.bookStatus==4 ">{{createDate1}}</span>
        <!--<el-input   v-model.number="ruleForm.createDate" disabled ></el-input>-->
      </el-form-item>


    </el-form>
  </div>
</template>

<script>
  export default {
    inject:['reload'],
    props:["id","totalBill","deposit","createDate1","createDate2"],
    data () {
      return {
        ruleForm:{
          id:"",
          currentRoomName:"",
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
          createDate:"",
          totalBill:"",
        },
        rules: {
        },

      }
    },
    created(){
      if(this.id){
        this.get("orderManage/getOne",(data)=>{
          this.ruleForm=data;
          console.log("订单表所有信息",this.ruleForm);
        },{id:this.id});
      }

    },
    components: {

    },
    methods:{

    }
  }
</script>

<style scoped>


</style>
