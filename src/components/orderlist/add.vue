
<template>

  <div style="margin-top: 15px;">
    <el-form :inline="true" :model="filters">
<!--      <el-form-item>-->
<!--        <el-button type="primary" size="medium" @click="fetchData('filters')"  icon="el-icon-search">查询</el-button>-->
<!--      </el-form-item>-->
    </el-form>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

        <el-form-item label="房间类型" prop="roomTypeId">
          <el-select v-model="ruleForm.roomsTypeName" placeholder="请选择" @change="getRole($event)">
<!--            <el-option v-for="entry in guestTypes" :label="entry.typeName" :value="entry.id" :key="entry.id"></el-option>-->
            <el-option
              v-for="item in select1"
              :key="item.id"
              :label="item.typeName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="房间编号" prop="currentRoomName" >
<!--          <el-input   v-model="ruleForm.currentRoomName"></el-input>-->
          <el-select v-model="ruleForm.currentRoomName" placeholder="请选择" @change="getList($event)">
          <el-option
            v-for="item in select2"
            :key="item.roomId"
            :label="item.roomId"
            :value="item.roomId">
          </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="id" prop="id" hidden>
          <el-input   v-model="ruleForm.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="房间id" prop="currentRoomId" hidden>
          <el-input   v-model="ruleForm.currentRoomId" disabled></el-input>
        </el-form-item>
        <el-form-item label="标准价" prop="normalPrice">
          <el-input   v-model="ruleForm.normalPrice" disabled></el-input>
        </el-form-item>
        <el-form-item label="折后价" prop="discountPrice">
          <el-input   v-model="ruleForm.discountPrice" disabled></el-input>
        </el-form-item>



        <el-form-item label="会员编号" prop="memberId">
          <el-select v-model="ruleForm.memberId" filterable placeholder="请选择会员编号" style="width: 200px" @change="getMemberPrice($event)" >
            <el-option
              v-for="item in leaguers"
              :key="item.id"
              :label="item.id"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入住人" prop="residents">
          <el-input   v-model="ruleForm.residents" placeholder="根据会员编号自动获取" disabled></el-input>
        </el-form-item>
        <el-form-item label="会员价" prop="memberPrice" >
          <el-input  v-model="ruleForm.memberPrice" disabled></el-input>
        </el-form-item>
        <el-form-item label="押金" prop="deposit">
          <el-input  v-model="ruleForm.deposit"  disabled></el-input>
        </el-form-item>
<!--        <el-form-item label="证件类别" prop="credentialsType">-->
<!--          <el-form-item label="证件类型" prop="credentialsType" v-if="ruleForm.credentialsType==0">-->
<!--            <el-input value="身份证" disabled></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="证件类型" prop="credentialsType" v-if="ruleForm.credentialsType==1">-->
<!--            <el-input value="护照" disabled></el-input>-->
<!--          </el-form-item>-->
<!--          <el-select v-model="ruleForm.credentialsType" placeholder="请选择">-->
<!--            <el-option label="居民身份证" :value="1"></el-option>-->
<!--            <el-option label="士官证" :value="2"></el-option>-->
<!--            <el-option label="护照" :value="3"></el-option>-->
<!--            <el-option label="港澳通行证" :value="4"></el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
        <el-form-item label="证件类型:" prop="credentialsType">
          <el-radio-group v-model="ruleForm.credentialsType">
            <el-radio  label="0">身份证</el-radio>
            <el-radio label="1">护照</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="证件号码" prop="credentialsNum">
          <el-input  v-model="ruleForm.credentialsNum"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input   v-model="ruleForm.phone"></el-input>
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
        <el-form-item label="入住人数" >
        <el-input-number v-model="ruleForm.personNum" @change="handleChange" :min="1" :max="10">
        </el-input-number>
          </el-form-item>
        <el-form-item label="操作人id" prop="userId" hidden>
          <el-input  v-model="ruleForm.userId" disabled></el-input>
        </el-form-item>
        <el-form-item label="操作人" prop="userName">
          <el-input  v-model="ruleForm.userName" disabled></el-input>
        </el-form-item>
        <el-form-item prop="timedWakeup" label="服务唤醒" >
          <el-checkbox true-label="1" false-label="0" v-model="ruleForm.breakfast">提供早餐</el-checkbox>
          <el-checkbox true-label="2" false-label="0" v-model="ruleForm.timedWakeup" >定时叫醒</el-checkbox>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input   v-model="ruleForm.remarks"></el-input>
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


      let select1= [];
      let allrole= [];

        name:"orderlistedit"
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

        select1: select1,
        loading: false,
        filters: {
          value1: '',
          value2: ''
        },
        select2:[],
        allrole:allrole,
        leaguers:[],


          guestTypes:{},
          ruleForm:{
            id:"",
            originalRoomId:"",
            currentRoomId:"",
            originalRoomName:"",
            currentRoomName:"",
            bookStatus:2,
            roomTypeId:"",
            normalPrice:"",
            discountPrice:"",
            deposit:"",
            residents:"",
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
        buttonText:"创建",
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
            { required: true, trigger: 'blur',validator: checkcredentialsNum }],
          // residents: [
          //   { required: true, message: '请输入预定人姓名', trigger: 'blur' },
          //   { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
          // ],
          // credentialsType: [
          //   { required: true, message: '请选择证件类型', trigger: 'blur' }
          // ],
          // roomTypeId: [
          //   { required: true, message: '请选择房间类型', trigger: 'blur' }
          // ],
          currentRoomName: [
            { required: true, message: '请选择房间编号', trigger: 'blur' }
          ],
          memberId: [
            { required: true, message: '请选择会员编号', trigger: 'blur' }
          ],
          arrivalTime: [
            { required: true, message: '请选择抵店时间', trigger: 'blur' }
          ],
          leaveTime: [
            { required: true, message: '请选择离店时间', trigger: 'blur' }
          ],


        }

      }
    },
    created(){
      //获取当前操作 用户 Vanilla
      this.loadUser();
      /*获取所有的房间编号*/
      this.get("orderManage/getAllRoomsAndLeaguers", (data) => {
        // this.rooms=data.rooms;
        this.leaguers = data.leaguers;
      });
        this.get("rooms/getAllGuestType",(data)=>{
          this.select1=data;
        });
        this.get("rooms/getUsefulAll",(data)=>{
          this.allrole=data;
        });
        // this.get("orderManage/getAllGoodsType",(data)=>{
        //   this.goodsTypes=data;
        // });
        if(this.id){
             this.get("orderManage/getOne",(data)=>{
                this.ruleForm=data;
            },{id:this.id});
            this.buttonText="修改"
        }
    },
    components: {

    },
    methods:{
        //操作员信息-Vanilla
      loadUser(){
        var list = JSON.parse(localStorage.getItem("user") || '[]');
        this.user = list;
        this.ruleForm.userName=list.userName;
        this.ruleForm.userId=list.id;
      },
      // timedWakeup_Edit(row){
      //   this.get("orderManage/updatetimedWakeup",(data)=>{
      //     if(data>0){
      //       this.$message({
      //         type: 'success',
      //         message: '成功唤醒服务!'
      //       });
      //     }
      //   },{id:row.id,timedWakeup: row.timedWakeup});
      // },
      // breakfast_Edit(row){
      //   this.get("orderManage/updatetimedWakeup",(data)=>{
      //     if(data>0){
      //       this.$message({
      //         type: 'success',
      //         message: '成功唤醒服务!'
      //       });
      //     }
      //   },{id:row.id,breakfast: row.breakfast});
      // },
        handleChange(value) {
          console.log(value);
        },
        resetForm(formName){
             this.$refs[formName].resetFields();
        },
        submitForm(formName){
            let url="";
            if(this.id){
              url="orderManage/update";
              this.post(formName,url,this.ruleForm);
            }
            else{
              url="orderManage/addTo";
              this.post(formName,url,this.ruleForm);
            }

        },

        getRole (prov) {
          let roles = []
          this.select2= []
          for (var val of this.allrole) {
            if (prov===val.roomTypeid) {
              roles.push({roomId: val.roomId,normalPrice:val.normalPrice,gvipPrice:val.gvipPrice})
            }
            this.select2 = roles
          }
        },
        getList (opt) {
          for (var val of this.allrole) {
            if (opt===val.roomId) {
              this.ruleForm.normalPrice=val.normalPrice;
                this.ruleForm.discountPrice=val.discountPrice;
              this.ruleForm.gvipPrice=val.gvipPrice;
              this.ruleForm.svipPrice=val.svipPrice
              this.ruleForm.deposit=val.normalPrice*0.5;
              this.ruleForm.currentRoomId=val.id;
            }
          }
        },
      getMemberPrice(ouid) {
        for (var val of this.leaguers) {
          if (ouid===val.id) {
            // console.log("找到会员");
            // console.log(val.id);
            //小于5000积分，普通会员，大于等于500积分vip会员
            this.ruleForm.residents=val.leaguerName;
            if(val.leaguerRank==="普通"){
              this.ruleForm.memberPrice=this.ruleForm.gvipPrice;
            }else{
              this.ruleForm.memberPrice=this.ruleForm.svipPrice;
            }
          }
        }
      },
    }
  }
</script>

<style scoped>


</style>
