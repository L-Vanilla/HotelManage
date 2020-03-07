<template>
  <div>
    <div style="margin-top: 15px;margin-bottom: 10px">
      <el-row>
        <el-col :span="22">
          <el-select v-model="search.goodsTypeid" filterable placeholder="请选择商品类型" style="width: 200px"  @change="findData">
            <el-option label="" value="">全部</el-option>
            <el-option
              v-for="item in goodsTypes"
              :key="item.id"
              :label="item.goodsTypename"
              :value="item.id">
            </el-option>
          </el-select>
          <el-input placeholder="请输入商品名称" v-model="search.goodsName" class="input-with-select" style="width: 200px">
            <el-button slot="append" icon="el-icon-search" @click="findData"></el-button>
          </el-input>
        </el-col>

      </el-row>
    </div>
    <el-table
      :data="tableData.list"
      border
      style="width: 100%;">
      <el-table-column
        prop="id"
        width="70"
        label="编号">
      </el-table-column>
      <el-table-column
        prop="goodsType.goodsTypename"
        label="商品类别">
      </el-table-column>
      <el-table-column
        prop="goodsName"
        label="商品名称">
      </el-table-column>
      <el-table-column
        prop="goodsPrice"
        label="单价(元)">
      </el-table-column>


      <el-table-column label="消费信息">
        <template slot-scope="scope">
          <!--<el-col :span="2"><el-button type="primary" @click="add">添加</el-button></el-col>-->
          <el-button @click="edit(scope.row)" type="text" size="small">附加消费入账</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="tableData.total"
      :current-page="this.queryParams.pageNo"
      :page-size="this.queryParams.pageSize"
      @current-change="changePageNo">
    </el-pagination>
  </div>
</template>

<script>
  import AddConsume from '@/components/account/add'
  export default {
    inject:['reload'],
    name:"goods",
    data () {
      return {
        search:{
          goodsName:"",
          goodsTypeid:""
        },
        queryParams:{
          pageNo:1,
          pageSize:10,
          goodsName:"",
          goodsTypeid:""
        },
        tableData:{},
        goodsTypes:{}
      }
    },
    created(){
      this.getData();
    },
    watch:{
      queryParams:{
        handler:function(){
          this.getData();
        },
        deep:true
      }
    },
    mounted(){},
    methods:{
      getData(){
        this.get("goods/list",(data)=>{
          this.tableData=data;
        },this.queryParams);
        this.get("goods/getAllGoodsType",(data)=>{
          this.goodsTypes=data;
        });
      },
      changePageNo(i){
        this.queryParams.pageNo=i;
      },
      findData(){
        this.queryParams.pageNo=1;
        this.merge(this.search,this.queryParams);
      },
      edit(row){
        console.log("获取页面数据"+row.id);
        console.log("获取页面数据"+row.goodsName);
        console.log("获取页面单价数据"+row.goodsPrice);
        this.$layer.iframe({
          content: {
            content: AddConsume, //传递的组件对象
            parent: this,//当前的vue对象
            data:{
                  goodId:row.id,
                  goodsName:row.goodsName,
                  goodsPrice:row.goodsPrice
                 }//props
          },
          area:['800px','600px'],
          title: '附加消费入账',
          shadeClose: false,
          shade :true
        });
      },
    }
  }
</script>

<style>
  .el-table .cell {
    text-align: center;
  }
  .el-table__header th, .el-table__header tr {
    background-color: #17B3A3;
    color: black;
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #17B3A3;
    color: #FFF;
  }
</style>
