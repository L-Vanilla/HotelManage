<!--zyp 2019-6-18  添加附加消费信息-->
<template>
  <div style="margin-top: 15px;" >
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">
      <el-form-item label="入住单号" prop="liveId">
        <el-select v-model="ruleForm.liveId" filterable placeholder="请选择入住单号" @change="getRoomId($event)">
          <el-option
            v-for="item in orderManage"
            :key="item.id"
            :label="item.id"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="客房编号" prop="roomId">
        <el-input v-model="ruleForm.roomId" disabled></el-input>
      </el-form-item>
      <el-form-item label="商品名" prop="goodName">
        <el-input v-model="ruleForm.goodName"  disabled></el-input>
      </el-form-item>
      <el-input v-model="ruleForm.goodId"  type="hidden"></el-input>
      <el-form-item label="数量" prop="num">
        <el-input v-model.number="ruleForm.num" :min="1"  size="medium" type="number"  @keyup.native="getConsumePrice"></el-input>
      </el-form-item>
      <el-form-item label="单价(元)" prop="price">
        <el-input v-model="ruleForm.price"  disabled></el-input>
      </el-form-item>
      <el-form-item label="消费金额(元)" prop="consumePrice">
        <el-input v-model="ruleForm.consumePrice" disabled></el-input>
      </el-form-item>
      <el-form-item label="折扣率(%)" prop="discount">
        <el-input v-model="ruleForm.discount" :min="1" :max="10" size="medium"  @keyup.native="getDcPrice"></el-input>
      </el-form-item>
      <el-form-item label="折后金额(元)" prop="dcPrice">
        <el-input v-model="ruleForm.dcPrice" disabled></el-input>
      </el-form-item>
      <!--<el-form-item label="合计" prop="totalPrice">-->
      <!--<el-input v-model="ruleForm.totalPrice"></el-input>-->
      <!--</el-form-item>-->
      <el-form-item label="操作员" prop="user">
        <el-input v-model="ruleForm.user" disabled></el-input>
      </el-form-item>
      <el-form-item label="消费时间" prop="consumeTime">
        <el-date-picker
          v-model="ruleForm.consumeTime"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm"
          placeholder="选择时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="备注" prop="remarks">
        <el-input type="textarea" v-model="ruleForm.remarks"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">附加消费入账</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    inject:['reload'],
    props:["goodId","goodsName","goodsPrice"],//获取父组件的字段
    data () {
      name:"consumeedit"
      return {
        rooms:[],
        orderManage:[],//获取订单的订单号
        ruleForm:{
          id:"",
          liveId:"",
          goodId:this.goodId,
          roomId:"",
          goodTypeid:"",
          goodName:this.goodsName,
          num:"",
          price:this.goodsPrice,
          consumePrice:"",
          discount:"",
          dcPrice:"",
          totalPrice:"",
          user:"",
          consumeTime:"",
          remarks:""
        },
        rules: {
          roomId: [
            { required: true, message: '请输入客房编号', trigger: 'blur' },
          ],
          num: [
            { required: true,type: 'number',message: '请填写数量,只能输入数字', trigger: 'blur' },
          ]
        },
        buttonText:"创建"

      }
    },

    created(){
      this.loadUser();
      //获取所有订单号（状态为已入住2和已换房4）
      this.get("orderManage/listLived",(data)=>{
        console.log(data);
        this.orderManage=data.list;
      });
    },

    components: {

    },
    methods:{
      //获取登录用户信息
      loadUser(){
        var list = JSON.parse(localStorage.getItem("user") || '[]');
        this.ruleForm.user=list.userName;
      },
      //  实现实时计算
      getConsumePrice(value){
        console.log(value);
        //   实现计算
        let consumePrice = this.ruleForm.num * this.ruleForm.price;
        console.log(consumePrice);
        this.ruleForm.consumePrice = consumePrice.toFixed(2);
      },
      getDcPrice(){
        let dcPrice =(this.ruleForm.discount/100) * this.ruleForm.consumePrice;
        this.ruleForm.dcPrice = dcPrice.toFixed(2);
      },
      //关联查询不同订单号对应的房间号
      getRoomId (prov) {
        console.log(this.orderManage);
        for (let val of this.orderManage) {
          if (prov===val.id) {
            this.ruleForm.roomId = val.currentRoomName
          }
        }
      },
      resetForm(formName){
        this.$refs[formName].resetFields();
      },
      submitForm(formName){
        let url="";
        url="consume/add";
        this.post(formName,url,this.ruleForm);
        //跳转页面
        this.$router.push({path:'consume'});
      }

    }
  }
</script>

<style scoped>


</style>
