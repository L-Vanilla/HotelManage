<template>
  <div style="margin-top: 15px;">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="入住单号" prop="id">
        <el-input  v-model="ruleForm.id" disabled></el-input>
      </el-form-item>
      <el-form-item label="入住房间名称" prop="currentRoomName">
        <el-input  v-model="ruleForm.currentRoomName" disabled></el-input>
      </el-form-item>
      <el-form-item label="房间类型" prop="roomsTypeName">
        <el-input  v-model="ruleForm.roomsTypeName" disabled></el-input>
      </el-form-item>
      <el-form-item label="标准价(元)" prop="normalPrice">
        <el-input  v-model="ruleForm.normalPrice" disabled></el-input>
      </el-form-item>
      <el-form-item label="折后价(元)" prop="discountPrice">
        <el-input  v-model="ruleForm.discountPrice" disabled></el-input>
      </el-form-item>
      <el-form-item label="押金(元)" prop="deposit">
        <el-input   v-model.number="ruleForm.deposit" size="medium" type="number" :max="99999999" ></el-input>
      </el-form-item>
      <el-form-item label="入住人" prop="residents">
        <el-input  v-model="ruleForm.residents"></el-input>
      </el-form-item>
      <el-form-item label="证件类型:" prop="credentialsType">
        <el-radio-group v-model="ruleForm.credentialsType">
          <el-radio  label="0">身份证</el-radio>
          <el-radio label="1">护照</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="证件号码" prop="credentialsNum">
        <el-input  v-model="ruleForm.credentialsNum"></el-input>
      </el-form-item>
      <el-form-item label="联系方式" prop="phone">
        <el-input  v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="抵店时间" prop="arrivalTime">
        <el-date-picker
          v-model="ruleForm.arrivalTime"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          :picker-options="pickerOptions0"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="离店时间" prop="leaveTime">
        <el-date-picker
          v-model="ruleForm.leaveTime"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          :picker-options="pickerOptions1"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="入住人数" prop="personNum">
        <el-input v-model.number="ruleForm.personNum" size="medium" type="number" :max="9999" ></el-input>
      </el-form-item>
      <el-form-item label="操作人id" prop="userId" hidden>
        <el-input  v-model="ruleForm.userId" disabled></el-input>
      </el-form-item>
      <el-form-item label="操作人" prop="userName">
        <el-input  v-model="ruleForm.userName" disabled></el-input>
      </el-form-item>
      <el-form-item label="会员编号" prop="memberId">
        <el-select v-model="ruleForm.memberId" size="medium" type="number" :max="9999" filterable placeholder="请选择预定会员编号" style="width: 200px"  >
          <el-option
            v-for="item in leaguers"
            :key="item.id"
            :label="item.id"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="会员价(元)" prop="memberPrice">
        <el-input  v-model="ruleForm.memberPrice" ></el-input>
      </el-form-item>

      <!--<el-form-item label="会员价" prop="rooms.gvipPrice">-->
        <!--<el-input v-model.number="ruleForm.rooms.gvipPrice" size="medium" type="number" :max="9999" ></el-input>-->
      <!--</el-form-item>-->
      <el-form-item label="备注" prop="remarks">
        <el-input  v-model="ruleForm.remarks"></el-input>
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
      name:"reservedTransferedit"
      /*验证手机号*/
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
      /*验证身份证号和护照*/
      let checkcredentialsNum = (rule, value, callback) => {
        const credentialsNumReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
        const passportNumReg = /(^[EeKkGgDdSsPpHh]\d{8}$)|(^(([Ee][a-fA-F])|([DdSsPp][Ee])|([Kk][Jj])|([Mm][Aa])|(1[45]))\d{7}$)/
        if(this.ruleForm.credentialsType==0){
          if (!value) {
            return callback(new Error("身份证编号不能为空"))
          }
          setTimeout(() => {

            if (credentialsNumReg.test(value)) {
              callback()
            } else {
              callback(new Error("身份证编号格式不正确"))
            }

          }, 100)
        }
        else{
          if (!value) {
            return callback(new Error("护照编号不能为空"))
          }
          setTimeout(() => {
            if (passportNumReg.test(value)) {
              callback()
            } else {
              callback(new Error("护照编号格式不正确"))
            }
          }, 100)
        }

      };
      return {
        rooms:[],
        leaguers:[],
        ruleForm:{
          id:"",
          currentRoomId:"",
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
          remarks:"",
          userId:"",
          userName:""
        },
        /*时间选择 */
        // pickerOptions0: {
        //   disabledDate(time) {
        //     return time.getTime() < Date.now();
        //   }
        // },
        pickerOptions0: {
          disabledDate: (time) => {
            if (this.ruleForm.leaveTime != "") {
              return  time.getTime() >(new Date(this.ruleForm.leaveTime).getTime())- 8.64e7||Date.now()>time.getTime() ;
            }else{
              return time.getTime()<Date.now();
            }
          },
        },
        pickerOptions1: {
          disabledDate: (time) => {
            if (this.ruleForm.arrivalTime !== "") {
              return time.getTime() < (new Date(this.ruleForm.arrivalTime).getTime())+24 * 3600 * 1000;
            }else{
              return time.getTime()<Date.now();
            }
          }
        },


        rules: {
          /*验证手机号*/
          phone: [
            { required: true, trigger: 'blur',validator: checkPhone }//设置全局变量
          ],
          credentialsNum: [
            { required: true, trigger: 'blur',validator: checkcredentialsNum }//设置全局变量
          ],

        },
        buttonText:"创建"

      }
    },
    created(){
      /*获取所有的房间编号*/
      this.get("orderManage/getAllRoomsAndLeaguers",(data)=>{
        this.rooms=data.rooms;
        this.leaguers=data.leaguers;
      });
      if(this.id){
        this.get("orderManage/getOne",(data)=>{
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
          url="orderManage/update";
        else
          url="orderManage/add";
        this.post(formName,url,this.ruleForm);
      }

    }
  }
</script>

<style scoped>



</style>
