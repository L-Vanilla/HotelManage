<template>
  <div>
    <div style="margin-top: 15px;margin-bottom: 10px">
      <el-row>
        <el-col :span="2"></el-col>
        <el-col :span="22">
          <el-date-picker
            v-model="search.time1"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择起始日期">
          </el-date-picker>
          <el-date-picker
            v-model="search.time2"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择结束日期">
          </el-date-picker>
          <el-input placeholder="用户名" v-model="search.userName" class="input-with-select" style="width: 200px">
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
        prop="userName"
        width="70"
        label="操作员">
      </el-table-column>
<!--      <el-table-column-->
<!--        prop="params.userName"-->
<!--        width="70"-->
<!--        label="操作数据">-->
<!--      </el-table-column>-->
      <el-table-column
        prop="operation"
        label="操作">
      </el-table-column>
      <!--      <el-table-column-->
      <!--        prop="goodsType.goodsTypename"-->
      <!--        label="商品类别">-->
      <!--      </el-table-column>-->
      <el-table-column
        prop="ip"
        label="ip">
      </el-table-column>
      <el-table-column
        prop="createDate"
        label="操作时间">
      </el-table-column>
      <!--<el-table-column-->
      <!--prop="createTime"-->
      <!--label="创建日期">-->
      <!--</el-table-column>-->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!--<el-button size="small" @click="del(scope.row)" type="danger" icon="el-icon-delete">删除</el-button>-->
          <el-button type="text" size="small" style="color:red;" @click="del(scope.row)" icon="el-icon-delete">{{deltext(scope.row.active)}}</el-button>
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

  export default {
    inject:['reload'],
    name:"list",
    data () {
      return {
        search:{
          userName:"",
          time1:"",
          time2:""
        },
        queryParams:{
          pageNo:1,
          pageSize:10,
          userName:"",
          time1:"",
          time2:""
        },
        tableData:{
          order_data:[],
        },

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
        this.get("logManagement/list",(data)=>{
          this.tableData=data;
          console.log(this.tableData);
          // this.tableData.order_data=JSON.parse(data.params);
          // console.log(this.tableData.order_data);
          // for (var i = 0; i < data.params.length; i++) {
          //   //data[i]表示获得第i个json对象即JSONObject
          //   //data[i]通过.字段名称即可获得指定字段的值
          //   this.userNamedata[i].userName;
          // }

        },this.queryParams);
      },
//        activeformat(row, column, cellValue, index){
//          return cellValue==0?"失效":"有效";
//        },
      changePageNo(i){
        this.queryParams.pageNo=i;
      },
      findData(){
        this.queryParams.pageNo=1;
        this.merge(this.search,this.queryParams);
      },
      // add(){
      //   this.$layer.iframe({
      //     content: {
      //       content: EditGoods, //传递的组件对象
      //       parent: this,//当前的vue对象
      //       data:{}//props
      //     },
      //     area:['800px','600px'],
      //     title: '添加商品类型',
      //     shadeClose: false,
      //     shade :true
      //   });
      // },
      // edit(row){
      //   this.$layer.iframe({
      //     content: {
      //       content: EditGoods, //传递的组件对象
      //       parent: this,//当前的vue对象
      //       data:{id:row.id}//props
      //     },
      //     area:['800px','600px'],
      //     title: '修改商品',
      //     shadeClose: false,
      //     shade :true
      //   });
      // },
      del(row){
        this.delete("logManagement/del",row.id,row.active);
      },
      deltext(active){
        return active==1?"删除":"恢复"
      }
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
