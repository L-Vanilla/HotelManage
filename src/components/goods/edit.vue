<template>
  <div style="margin-top: 15px;">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="商品名称" prop="goodsName">
            <el-input v-model="ruleForm.goodsName"></el-input>
        </el-form-item>
        <el-form-item label="类别" prop="goodsTypeid">
          <el-select v-model="ruleForm.goodsTypeid" placeholder="请选择类型">
            <el-option v-for="entry in goodsTypes" :label="entry.goodsTypename" :value="entry.id" :key="entry.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="价格(元)" prop="goodsPrice">
            <el-input   v-model="ruleForm.goodsPrice"></el-input>
        </el-form-item>
        <el-form-item label="单位" prop="unit">
            <el-input   v-model="ruleForm.unit"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="notes">
            <el-input type="textarea"  v-model="ruleForm.notes"></el-input>
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
        name:"goodsedit"
      return {
          goodsTypes:[],
          ruleForm:{
            id:"",
            goodsName:"",
            goodsTypeid:"",
            goodsPrice:null,
            unit:"",
            notes:""
          },
          rules: {
            goodsName: [
                { required: true, message: '请输入商品名称', trigger: 'blur' },
                { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
            ]
        },
        buttonText:"创建"

      }
    },
    created(){
        this.get("goods/getAllGoodsType",(data)=>{
          this.goodsTypes=data;
        });
        if(this.id){
             this.get("goods/getOne",(data)=>{
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
            if(this.id){
              url="goods/update";
              this.post(formName,url,this.ruleForm);
            }
            else{
              url="goods/add";
              this.post(formName,url,this.ruleForm);
            }

        }
    }
  }
</script>

<style scoped>


</style>
