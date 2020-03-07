<template>
  <div style="margin-top: 10px">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户姓名" prop="userName">
        <el-input v-model="ruleForm.userName"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="userPwd">
        <el-input   v-model="ruleForm.userPwd" show-password></el-input>
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
    props:["id",
      "userName",
      "userPwd",
      "remarks"],
    data () {
      name:"useredit"
      return {
        ruleForm:{
          id:this.id,
          userName:this.userName,
          userPwd:this.userPwd,
          remarks:this.remarks
        },
        users:{

        },
        rules: {
          userName: [
            { required: true, message: '请输入用户名称', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
          ],
          userPwd: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        },
        buttonText:"创建"

      }
    },
    created(){
      this.ruleForm.id=this.id;
      this.ruleForm.userName=this.userName;
      this.ruleForm.userPwd=this.userPwd;
      this.ruleForm.remarks=this.remarks;
        console.log("用户名"+this.ruleForm.userName);

    },
    components: {

    },
    methods:{
      resetForm(formName){
        this.$refs[formName].resetFields();
      },
      submitForm(formName){
        let url="";
        if(this.id){
          this.get("user/getAll",(data)=>{
            this.users=data;
            // console.log(this.ruleForm);
            if(data.length>0){
              if(data[0].id!==this.id){
                alert("该用户已存在!");
              }
              else{
                url="user/update";
                this.post(formName,url,this.ruleForm);
                localStorage.removeItem('user');
                localStorage.removeItem('islogin');
                this.$router.push('/');
                alert("请重新登录！！");
              }
            }else{
              url="user/update";
              this.post(formName,url,this.ruleForm);
              localStorage.removeItem('user');
              localStorage.removeItem('islogin');
              this.$router.push('/');
              alert("请重新登录！！");
            }
          },{userName:this.ruleForm.userName});
        }
      }

    }
  };

</script>

<style scoped>

</style>
