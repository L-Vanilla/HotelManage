<template>
  <div style="margin-top: 10px">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px"  class="demo-ruleForm">
        <el-form-item label="会员姓名" prop="leaguerName" >
            <el-input v-model="ruleForm.leaguerName" disabled></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="leaguerSex">
          <el-input v-model="ruleForm.leaguerSex" disabled></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="leaguerPwd">
          <el-input   v-model="ruleForm.leaguerPwd" disabled show-password></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="leaguerTel">
          <el-input   v-model="ruleForm.leaguerTel" disabled></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="leaguerAddress">
          <el-input   v-model="ruleForm.leaguerAddress" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="leaguerEmail">
          <el-input   v-model="ruleForm.leaguerEmail" disabled></el-input>
        </el-form-item>
        <el-form-item label="积分" prop="leaguerScore">
          <el-input   v-model="ruleForm.leaguerScore" disabled></el-input>
        </el-form-item>
        <el-form-item label="级别" prop="leaguerRank" >
          <el-input   v-model="ruleForm.leaguerRank" disabled></el-input>
        </el-form-item>
        <el-form-item label="最后一次入住时间" prop="timeLastlive">
          <el-input   v-model="ruleForm.timeLastlive" disabled></el-input>
        </el-form-item>
        <el-form-item label="最后一次预定时间" prop="timeLastorder">
          <el-input   v-model="ruleForm.timeLastorder" disabled></el-input>
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
        name:"leaguerdetails"
      return {
          readonly: true,
          ruleForm:{
            id:"",
            leaguerName:"",
            leaguerSex:"",
            leaguerPwd:"",
            leaguerTel:"",
            leaguerAddress:"",
            leaguerEmail:"",
            leaguerScore:"",
            leaguerRank:"",
            timeLastlive:"",
            timeLastorder:"",
            remarks:"",

          },
          rules:{},

      }
    },
    created(){
        if(this.id){
             this.get("leaguer/getOne",(data)=>{
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
            url="leaguer/update";
            this.post(formName,url,this.ruleForm);
        }
    }
  };

</script>

<style scoped>


</style>
