<template>
  <div style="margin-top: 15px;">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">
      <el-form-item label="入住单号" prop="id">
        <el-input  v-model="ruleForm.id" disabled></el-input>
      </el-form-item>
      <el-form-item label="房间号" prop="roomId">
        <el-input  v-model="ruleForm.roomId" disabled></el-input>
      </el-form-item>
      <el-form-item label="房价(元)" prop="roomPrice">
        <el-input  v-model="ruleForm.roomPrice" disabled></el-input>
      </el-form-item>
      <el-form-item label="押金(元)" prop="deposit">
        <el-input  v-model="ruleForm.deposit" disabled></el-input>
      </el-form-item>
      <el-form-item label="住宿天数" prop="livedDays">
        <el-input  v-model="ruleForm.livedDays" disabled></el-input>
      </el-form-item>
      <el-form-item label="住宿费(元)" prop="livedPrice">
        <el-input  v-model="ruleForm.livedPrice" disabled></el-input>
      </el-form-item>
      <el-form-item label="店内消费(元)" prop="roomBill">
        <el-input  v-model="ruleForm.roomBill" disabled></el-input>
      </el-form-item>
      <el-form-item label="餐费(元)" prop="foodBill">
        <el-input  v-model="ruleForm.foodBill" disabled></el-input>
      </el-form-item>
      <el-form-item label="电话费(元)" prop="telBill">
        <el-input  v-model="ruleForm.telBill" disabled></el-input>
      </el-form-item>
      <el-form-item label="应退押金(元)" prop="rebackDeposit">
        <el-input  v-model="ruleForm.rebackDeposit" disabled></el-input>
      </el-form-item>
      <el-form-item label="实际应收(元)" prop="totalBill">
        <el-input  v-model="ruleForm.totalBill" disabled></el-input>
      </el-form-item>
      <el-form-item label="付款方式" prop="payStyle">
        <el-input  v-model="ruleForm.payStyle" disabled></el-input>
      </el-form-item>
      <el-form-item label="实收(元)" prop="realWages">
        <el-input  v-model="ruleForm.realWages" disabled></el-input>
      </el-form-item>
      <el-form-item label="找零(元)" prop="oddChange">
        <el-input  v-model="ruleForm.oddChange" disabled></el-input>
      </el-form-item>
      <el-form-item label="操作员" prop="user">
        <el-input  v-model="ruleForm.user" disabled></el-input>
      </el-form-item>

      <el-form-item label="备注" prop="remarks">
        <el-input type="textarea"  v-model="ruleForm.remarks" disabled></el-input>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
  export default {
    inject:['reload'],
    props:["id"],
    data () {
      name:"liveddetail"
      return {
        ruleForm:{
          id:"",
          roomId:"",
          roomPrice:"",
          deposit:"",
          livedDays:"",
          livedPrice:"",
          roomBill:"",
          foodBill:"",
          telBill:"",
          totalBill:"",
          rebackDeposit:"",
          payStyle:"",
          realWages:"",
          oddChange:"",
          user:"",
          remarks:""
        },
        rules: {
        },

      }
    },
    created(){
      if(this.id){
        this.get("checkout/getOne",(data)=>{
          this.ruleForm=data;
          console.log(this.ruleForm);
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
