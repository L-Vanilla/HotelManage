<template>
  <div style="margin-top: 10px">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="会员姓名" prop="leaguerName">
            <el-input v-model="ruleForm.leaguerName"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="leaguerSex">
          <el-select v-model="ruleForm.leaguerSex" placeholder="请选择性别">
            <el-option label="女" :value="0"></el-option>
            <el-option label="男" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="密码" prop="leaguerPwd">
          <el-input   v-model="ruleForm.leaguerPwd" show-password></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="leaguerTel">
          <el-input   v-model="ruleForm.leaguerTel"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="leaguerAddress">
          <el-input   v-model="ruleForm.leaguerAddress"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="leaguerEmail">
          <el-input   v-model="ruleForm.leaguerEmail"></el-input>
        </el-form-item>
<!--        <el-form-item label="积分" prop="leaguerScore">-->
<!--          <el-input   v-model.number="ruleForm.leaguerScore" size="medium" type="number" :max="99999999" ></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="级别" prop="leaguerRank">-->
<!--          <el-select v-model="ruleForm.leaguerRank" placeholder="请选择级别">-->
<!--            <el-option label="普通" :value="0"></el-option>-->
<!--            <el-option label="VIP" :value="1"></el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
        <!--<el-form-item label="最后一次入住时间" prop="timeLastlive">-->
          <!--<el-date-picker-->
            <!--v-model="ruleForm.timeLastlive"-->
            <!--type="datetime"-->
            <!--value-format="yyyy-MM-dd HH:mm"-->
            <!--placeholder="选择日期">-->
          <!--</el-date-picker>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="最后一次预定时间" prop="timeLastorder">-->
          <!--<el-date-picker-->
            <!--v-model="ruleForm.timeLastorder"-->
            <!--type="datetime"-->
            <!--value-format="yyyy-MM-dd HH:mm"-->
            <!--placeholder="选择日期">-->
          <!--</el-date-picker>-->
        <!--</el-form-item>-->

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
        name:"leagueredit"
    // 手机号码校验
      let checkPhone = (rule, value, callback) => {
        const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
        if (!value) {
          return callback(new Error("电话号码不能为空"))
        }
        setTimeout(() => {
          // Number.isInteger是es6验证数字是否为整数的方法,但是我实际用的时候输入的数字总是识别成字符串
          // 所以在前面加了一个+实现隐式转换
          if (!Number.isInteger(+value)) {
            callback(new Error("请输入数字值"))
          } else {
            if (phoneReg.test(value)) {
              callback()
            } else {
              callback(new Error("电话号码格式不正确"))
            }
          }
        }, 100)
      };
        //邮箱校验
      let checkEmail = (rule, value, callback) => {
        const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
        if (!value) {
          return callback(new Error("邮箱不能为空"))
        }
        setTimeout(() => {
          if (mailReg.test(value)) {
            callback()
          } else {
            callback(new Error("请输入正确的邮箱格式"))
          }
        }, 100)
      }
      return {
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
          rules: {
            leaguerName: [
                { required: true, message: '请输入会员名称', trigger: 'blur' },
                { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
            ],
            leaguerSex: [
                { required: true, message: '请选择性别', trigger: 'blur' }
            ],
            leaguerPwd: [
              { required: true, message: '请输入密码', trigger: 'blur' }
            ],
            leaguerTel: [
              { required: true, trigger: 'blur',validator: checkPhone }//设置全局变量
            ],
            leaguerEmail: [
              { required: true, trigger: 'blur',validator: checkEmail }//设置全局变量
            ],
            leaguerScore: [
              {  type: 'number', message: '只能输入数字', trigger: 'blur' }
            ]
        },
        buttonText:"创建"

      }
    },
    created(){
        if(this.id){
             this.get("leaguer/getOne",(data)=>{
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
                url="leaguer/update";
            else
                url="leaguer/add";
            this.post(formName,url,this.ruleForm);
        }

    }
  };

</script>

<style scoped>

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  input[type="number"]{
    -moz-appearance: textfield;
  }

</style>
