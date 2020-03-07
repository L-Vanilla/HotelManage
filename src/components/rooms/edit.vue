<template>
  <div style="margin-top: 15px;">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">
      <el-form-item label="房间号" prop="roomId">
        <el-input  v-model="ruleForm.roomId" ></el-input>
      </el-form-item>
      <el-form-item label="客房类型" prop="roomTypeid">
        <el-select v-model="ruleForm.roomTypeid" filterable placeholder="客房类型">
          <el-option v-for="entry in guestTypes" :label="entry.typeName" :value="entry.id" :key="entry.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="客房状态" prop="status">
        <el-select v-model="ruleForm.status" filterable placeholder="请选择状态">
          <el-option label="空房" :value="0"></el-option>
          <el-option label="已预订" :value="1"></el-option>
          <el-option label="入住" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="楼层" prop="floorId">
        <el-select v-model="ruleForm.floorId" filterable placeholder="请选择楼层信息">
          <el-option v-for="entry in floors" :label="entry.floorName" :value="entry.id" :key="entry.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标准价格(元)" prop="normalPrice">
        <el-input  v-model.number="ruleForm.normalPrice" @input="oninput" :min="0"  size="medium" type="number" @keyup.native="getNormalPrice"></el-input>
      </el-form-item>
      <el-form-item label="折后价(元)" prop="discountPrice">
        <el-input   v-model.number="ruleForm.discountPrice" :min="0"  size="medium" type="number"></el-input>
      </el-form-item>
      <el-form-item label="普通会员价(元)" prop="gvipPrice">
        <el-input   v-model.number="ruleForm.gvipPrice" :min="0"  size="medium" type="number"></el-input>
      </el-form-item>
      <el-form-item label="Vip会员价(元)" prop="svipPrice">
        <el-input   v-model.number="ruleForm.svipPrice" :min="0"  size="medium" type="number"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remarks">
        <el-input type="textarea"  v-model="ruleForm.remarks"></el-input>
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
      name:"roomsedit"
      return {
        floors:[],
        guestTypes:[],
        ruleForm:{
          id:"",
          roomId:"",
          roomTypeid:"",
          status:"",
          floorId:"",
          normalPrice:"",
          discountPrice:"",
          gvipPrice:"",
          svipPrice:"",
          remarks:""
        },
        rules: {
          roomId: [
            { required: true, message: '请输入房间号', trigger: 'blur' },
          ],
          roomTypeid: [
            { required: true, message: '请选择客房类型', trigger: 'blur' },
          ],
          status: [
            { required: true, message: '请选择客房状态', trigger: 'blur' },
          ],
          floorId: [
            { required: true, message: '请选择客房楼层', trigger: 'blur' },
          ],
          normalPrice: [
            { required: true,type: 'number',message: '请填写标准价格,只能输入数字', trigger: 'blur' },
          ],
//          discountPrice: [
//            { required: true,type: 'number',message: '请填写折后价,只能输入数字', trigger: 'blur' },
//          ],
//          gvipPrice: [
//            { required: true,type: 'number', message: '请填写普通会员价,只能输入数字', trigger: 'blur' },
//          ],
//          svipPrice: [
//            { required: true,type: 'number', message: '请填写VIP会员价,只能输入数字', trigger: 'blur' },
//          ],
        },
        buttonText:"创建"

      }
    },
    created(){
      this.get("rooms/getAllFloor",(data)=>{
        this.floors=data;
      });
      this.get("rooms/getAllGuestType",(data)=>{
        this.guestTypes=data;
      });
      if(this.id){
        this.get("rooms/getOne",(data)=>{
          this.ruleForm=data;
          console.log(this.ruleForm);
        },{id:this.id});
        this.buttonText="修改"
      }
    },
    components: {

    },
    methods:{
      //限制只能输入两位小数
      oninput(e) {
        // 通过正则过滤小数点后两位
        e.target.value = (e.target.value.match(/^\d*(\.?\d{0,2})/g)[0]) || null;
        console.log('e',e.target.value)
      },
      //实时价格数据监控
      getNormalPrice(){
        //设置其他加个默认和普通加个相同
        let normalPrice = this.ruleForm.normalPrice;
        console.log(normalPrice);
        this.ruleForm.discountPrice = normalPrice.toFixed(2);
        this.ruleForm.gvipPrice = normalPrice.toFixed(2);
        this.ruleForm.svipPrice = normalPrice.toFixed(2);
      },
      resetForm(formName){
        this.$refs[formName].resetFields();
      },
      submitForm(formName){
        let url="";
        if(this.id){
          url="rooms/update";
          this.post(formName,url,this.ruleForm);
        }
        else{
          url="rooms/add";
          this.post(formName,url,this.ruleForm);
        }
      },

    }
  }
</script>

<style scoped>


</style>
