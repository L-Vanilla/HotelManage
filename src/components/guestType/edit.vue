<template>
  <div style="margin-top: 15px;">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="客房类型" prop="typeName">
        <el-input v-model="ruleForm.typeName"></el-input>
      </el-form-item>
      <el-form-item label="人数限制" prop="limitNum">
        <el-input-number v-model="ruleForm.limitNum" :min="1"></el-input-number>
        <!--<el-input   v-model.number="ruleForm.limitNum" type="number"></el-input>-->
      </el-form-item>
      <el-form-item label="备注" prop="remarks">
        <el-input type="textarea" v-model="ruleForm.remarks"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">{{buttonText}}</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    inject:['reload'],
    props:["id"],
    data () {
      name:"guestTypeedit"
      return {
        ruleForm:{
          id:"",
          typeName:"",
          limitNum:"",
          remarks:""
        },
        rules: {
          typeName: [
            { required: true, message: '请输入客房类型名称', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
          ]
        },
        buttonText:"创建"

      }
    },
    created(){
      if(this.id){
        this.get("guestType/getOne",(data)=>{
          this.ruleForm=data;
          console.log(this.ruleForm);
        },{id:this.id});
        this.buttonText="修改"
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
          url="guestType/update";
        else
          url="guestType/add";
        this.post(formName,url,this.ruleForm);
      }

    }
  }
</script>

<style scoped>


</style>
