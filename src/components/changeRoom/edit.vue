<template>
  <div style="margin-top: 15px;">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="原房间编号" prop="originalRoomName">
          <el-input   v-model="ruleForm.originalRoomName" disabled=""></el-input>
        </el-form-item>
        <el-form-item label="现房间类型" prop="roomsTypeName">
          <el-input   v-model="ruleForm.roomsTypeName" disabled></el-input>
        </el-form-item>

        <el-form-item label="现房间id" prop="originalRoomId" hidden>
          <el-input   v-model="ruleForm.originalRoomId"></el-input>
        </el-form-item>

        <el-form-item label="房间编号" prop="currentRoomName" >
          <!--          <el-input   v-model="ruleForm.currentRoomName"></el-input>-->
          <el-select v-model="ruleForm.currentRoomName" placeholder="请选择" @change="getList($event)">
            <el-option
              v-for="item in allrole"
              :key="item.roomId"
              :label="item.roomId"
              :value="item.roomId">
            </el-option>
          </el-select>

        </el-form-item>
        <el-form-item label="标准价(元)" prop="normalPrice">
          <el-input   v-model="ruleForm.normalPrice" disabled></el-input>
        </el-form-item>
        <el-form-item label="折后价(元)" prop="discountPrice">
          <el-input   v-model="ruleForm.discountPrice" disabled></el-input>
        </el-form-item>
        <el-form-item label="押金(元)" prop="deposit">
          <el-input  v-model="ruleForm.deposit" disabled> </el-input>
        </el-form-item>
        <el-form-item label="会员编号" prop="memberId">
          <el-input  v-model="ruleForm.memberId"></el-input>
        </el-form-item>
        <el-form-item label="会员价(元)" prop="memberPrice">
          <el-input   v-model="ruleForm.memberPrice"></el-input>
        </el-form-item>
        <el-form-item label="入住人" prop="residents">
          <el-input   v-model="ruleForm.residents"></el-input>
        </el-form-item>

        <el-form-item label="证件类型:" prop="credentialsType" >
          <el-radio-group v-model="ruleForm.credentialsType" disabled>
            <el-radio  label="0">身份证</el-radio>
            <el-radio label="1">护照</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="证件号码" prop="credentialsNum">
          <el-input  v-model="ruleForm.credentialsNum" disabled></el-input>
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

<!--        <el-form-item label="提供早餐" prop="breakfast">-->
<!--          <el-select v-model="ruleForm.breakfast" placeholder="请选择" >-->
<!--            <el-option label="是" :value="1"></el-option>-->
<!--            <el-option label="否" :value="0"></el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="定时叫醒" prop="timedWakeup">-->
<!--          <el-input  v-model="ruleForm.timedWakeup"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item prop="timedWakeup" label="服务唤醒" >
          <el-checkbox true-label="1" false-label="0" v-model="ruleForm.breakfast" @change="breakfast_Edit(scope.row)">提供早餐</el-checkbox>
          <el-checkbox true-label="2" false-label="0" v-model="ruleForm.timedWakeup" @change="timedWakeup_Edit(scope.row)" >定时叫醒</el-checkbox>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input   v-model="ruleForm.remarks"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">{{buttonText}}</el-button>
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
      /*验证身份证号*/
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
        select2:[],
        guestTypes:[],
        allrole:[],
        leaguers:[],
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
            roomsTypeName:"",
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
            { required: true, trigger: 'blur',validator: checkcredentialsNum }]
        }
      }
    },
    created(){
      /*获取所有的房间编号*/
      this.get("orderManage/getAllRoomsAndLeaguers", (data) => {
        // this.rooms=data.rooms;
        this.leaguers = data.leaguers;
      });
        this.get("rooms/getAllGuestType",(data)=>{
          this.guestTypes=data;
        });
        // this.get("orderManage/getAllGoodsType",(data)=>{
        //   this.goodsTypes=data;
        // });
      this.get("rooms/getUsefulAll",(data)=>{
        this.allrole=data;
      });
        if(this.id){
             this.get("orderManage/getOne",(data)=>{
               let roles = [];
               this.select2= [];
               data.originalRoomId=data.currentRoomId;
               data.originalRoomName=data.currentRoomName;
               data.currentRoomName="";
               data.currentRoomId="";
                this.ruleForm=data;
               let j;
               for (var val of this.guestTypes) {
                 // console.log("类型比较");
                 // console.log(val.id);
                 // console.log(data.roomsTypeName);
                  j= parseInt(data.roomsTypeName);
                 if (j==val.id) {
                   // console.log("成功了");
                   // console.log(val);
                   console.log(j);
                   this.ruleForm.roomsTypeName=val.typeName;
                   // console.log(this.ruleForm.roomsTypeName);
                 }
                 console.log(j);
               }
               //找房间
               for (var val of this.allrole) {
                 console.log(val.roomTypeid);
                 console.log(val.roomId);
                 console.log(j);
                 if (j===val.roomTypeid) {
                   roles.push({roomId: val.roomId,normalPrice:val.normalPrice,gvipPrice:val.gvipPrice})
                 }
                 this.select2 = roles
               }
            },{id:this.id});
            this.buttonText="提交"
        };

    },
    components: {

    },
    methods:{
      timedWakeup_Edit(row){
        this.get("orderManage/updatetimedWakeup",(data)=>{
          if(data>0){
            this.$message({
              type: 'success',
              message: '成功唤醒服务!'
            });
          }
        },{id:row.id,timedWakeup: row.timedWakeup});
      },
      breakfast_Edit(row){
        this.get("orderManage/updatetimedWakeup",(data)=>{
          if(data>0){
            this.$message({
              type: 'success',
              message: '成功唤醒服务!'
            });
          }
        },{id:row.id,breakfast: row.breakfast});
      },
        getList (opt) {
        for (var val of this.allrole) {
          if (opt===val.roomId) {
            this.ruleForm.normalPrice=val.normalPrice;
            this.ruleForm.discountPrice=val.discountPrice;
            this.ruleForm.gvipPrice=val.gvipPrice;
            this.ruleForm.svipPrice=val.svipPrice;
            this.ruleForm.deposit=val.normalPrice*0.5;
            this.ruleForm.currentRoomId=val.id;
          }
        }
          for (var val of this.leaguers) {
            if (this.ruleForm.memberId===val.id) {
              console.log("找到会员");
              console.log(val.id);
              //小于5000积分，普通会员，大于等于500积分vip会员
              if(val.leaguerScore<5000){
                this.ruleForm.memberPrice=this.ruleForm.gvipPrice;
              }else{
                this.ruleForm.memberPrice=this.ruleForm.svipPrice;
              }
            }
          }


      },
        handleChange(value) {
          console.log(value);
        },
        resetForm(formName){
             this.$refs[formName].resetFields();
        },
        submitForm(formName){
            let url="";
            if(this.id){
              url="orderManage/change";
              this.post(formName,url,this.ruleForm);
            }
        }
    }
  }
</script>

<style scoped>


</style>
