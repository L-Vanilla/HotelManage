<template>
  <div>
    <div style="margin-top: 15px;margin-bottom: 10px">
      <el-row>
        <el-col :span="22">
          <el-input placeholder="请输入入住单号" v-model="search.id" class="input-with-select" style="width: 200px">
            <el-button slot="append" icon="el-icon-search" @click="findData"></el-button>
          </el-input>
          <el-input placeholder="请输入房间号" v-model="search.roomId" class="input-with-select" style="width: 200px">
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
        width="100"
        label="入住单号">
      </el-table-column>
      <el-table-column
        prop="roomId"
        label="房间号">
      </el-table-column>
      <!--<el-table-column-->
      <!--prop="roomPrice"-->
      <!--label="房价">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
      <!--prop="deposit"-->
      <!--label="押金">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
      <!--prop="livedDays"-->
      <!--label="住宿天数">-->
      <!--</el-table-column>-->
      <el-table-column
        prop="livedPrice"
        label="住宿费(元)">
      </el-table-column>
      <!--<el-table-column-->
      <!--prop="roomBill"-->
      <!--label="店内消费">-->
      <!--</el-table-column>-->

      <!--<el-table-column-->
      <!--prop="foodBill"-->
      <!--label="餐费">-->
      <!--</el-table-column>-->

      <!--<el-table-column-->
      <!--prop="telBill"-->
      <!--label="电话费">-->
      <!--</el-table-column>-->

      <el-table-column
        prop="totalBill"
        label="实际应收(元)">
      </el-table-column>
      <!--<el-table-column-->
      <!--prop="rebackDeposit"-->
      <!--label="应退押金">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
      <!--prop="payStyle"-->
      <!--label="付款方式">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
      <!--prop="realWages"-->
      <!--label="实收">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
      <!--prop="oddChange"-->
      <!--label="找零">-->
      <!--</el-table-column>-->
      <el-table-column
        prop="user"
        label="操作员">
      </el-table-column>
      <!--<el-table-column-->
      <!--prop="remarks"-->
      <!--label="备注">-->
      <!--</el-table-column>-->

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="detail(scope.row)" type="text" size="small">详情</el-button>
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
  import DetailCheckout from '@/components/checkout/detail'
  export default {
    inject:['reload'],
    name:"livedlist",
    data () {
      return {
        search:{
          id:"",
          roomId:"",
          residents:"",

        },
        queryParams:{
          pageNo:1,
          pageSize:10,
          id:"",
          roomId:"",
          residents:"",

        },
        tableData:{}
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
        this.get("checkout/list",(data)=>{
          this.tableData=data;
        },this.queryParams);
      },
      changePageNo(i){
        this.queryParams.pageNo=i;
      },
      findData(){
        this.queryParams.pageNo=1;
        this.merge(this.search,this.queryParams);
      },
      detail(row){
        this.$layer.iframe({
          content: {
            content: DetailCheckout, //传递的组件对象
            parent: this,//当前的vue对象
            data:{id:row.id,}//props
          },
          area:['800px','600px'],
          title: '结账详情',
          shadeClose: false,
          shade :true
        });
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
