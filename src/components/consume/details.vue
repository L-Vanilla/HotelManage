<template>
  <div style="margin-top: 15px;">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="订单号" prop="liveId">
        <el-input v-model="ruleForm.liveId" disabled></el-input>
      </el-form-item>
      <el-form-item label="客房编号" prop="roomId">
        <el-input v-model="ruleForm.roomId" disabled></el-input>
      </el-form-item>
      <el-form-item label="商品名" prop="goodId">
        <el-select v-model="ruleForm.goodId" placeholder="请选择类型" disabled>
          <el-option v-for="entry in goodss" :label="entry.goodsName" :value="entry.id" :key="entry.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="数量" prop="num">
        <el-input v-model.number="ruleForm.num" disabled></el-input>
      </el-form-item>
      <el-form-item label="单价(元)" prop="price">
        <el-input v-model="ruleForm.price" disabled></el-input>
      </el-form-item>
      <el-form-item label="消费金额(元)" prop="consumePrice">
        <el-input v-model="ruleForm.consumePrice" disabled></el-input>
      </el-form-item>
      <el-form-item label="折扣率" prop="discount">
        <el-input v-model="ruleForm.discount" disabled></el-input>
      </el-form-item>
      <el-form-item label="折后金额(元)" prop="dcPrice">
        <el-input v-model="ruleForm.dcPrice" disabled></el-input>
      </el-form-item>
      <el-form-item label="操作员" prop="user">
        <el-input v-model="ruleForm.user" disabled></el-input>
      </el-form-item>
      <el-form-item label="消费时间" prop="consumeTime" >
        <el-date-picker
          v-model="ruleForm.consumeTime"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm"
          placeholder="选择时间"
          disabled>
        </el-date-picker>
      </el-form-item>
      <el-form-item label="备注" prop="remarks">
        <el-input type="textarea" v-model="ruleForm.remarks" disabled></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    inject:['reload'],
    props:["id"],
    data () {
      name:"consumedetail"
      return {
        goodss:[],
        ruleForm:{
          id:"",
          liveId:"",
          roomId:"",
          goodTypeid:"",
          goodId:"",
          goodName:"",
          num:"",
          price:"",
          consumePrice:"",
          discount:"",
          dcPrice:"",
          totalPrice:"",
          user:"",
          consumeTime:"",
          remarks:""
        },
        rules: {
        },

      }
    },
    created(){
      this.get("consume/getAllGoodsAndRooms",(data)=>{
        this.goodss=data.goodss;
      });
      if(this.id){
        this.get("consume/getOne",(data)=>{
          this.ruleForm=data;
          console.log(this.ruleForm);
        },{id:this.id});
      }

    },
    components: {

    },
    methods:{
      resetForm(formName){
        this.$refs[formName].resetFields();
      },
      submitForm(formName){
        let url="";
        if(this.id)
          url="consume/update";
        else
          url="consume/add";
        this.post(formName,url,this.ruleForm);
      }

    }
  }
</script>

<style scoped>


</style>
