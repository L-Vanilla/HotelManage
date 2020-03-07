<template>
  <div style="margin-top: 15px;">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
      <el-form-item label="房间号" prop="roomId" >
        <el-input  v-model="ruleForm.roomId" disabled></el-input>
      </el-form-item>
      <el-form-item label="客房类型" prop="roomTypeid">
        <el-select v-model="ruleForm.roomTypeid" placeholder="客房类型" disabled>
          <el-option v-for="entry in guestTypes" :label="entry.typeName" :value="entry.id" :key="entry.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="客房状态" prop="status">
        <el-input   v-model="ruleForm.status" disabled></el-input>
      </el-form-item>
      <el-form-item label="楼层" prop="floorId" >
        <el-select v-model="ruleForm.floorId" disabled>
          <el-option v-for="entry in floors" :label="entry.floorName" :value="entry.id" :key="entry.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标准价格(元)" prop="normalPrice">
        <el-input   v-model="ruleForm.normalPrice" disabled></el-input>
      </el-form-item>
      <el-form-item label="折后价(元)" prop="discountPrice">
        <el-input   v-model="ruleForm.discountPrice" disabled></el-input>
      </el-form-item>
      <el-form-item label="普通会员价(元)" prop="gvipPrice">
        <el-input   v-model="ruleForm.gvipPrice" disabled></el-input>
      </el-form-item>
      <el-form-item label="Vip会员价(元)" prop="svipPrice">
        <el-input   v-model="ruleForm.svipPrice" disabled></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remarks">
        <el-input type="textarea"  v-model="ruleForm.remarks" disabled></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    inject:['reload'],
    props:["id"],
    data () {
      name:"roomsdetails"
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
          svipPrice:null,
          remarks:""
        },
        rules: {
        },

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
        url="rooms/update";
        this.post(formName,url,this.ruleForm);

      }
    }
  }
</script>

<style scoped>


</style>
