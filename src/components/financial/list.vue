<template>
  <div>
    <div style="margin-top: 15px;margin-bottom: 10px">
      <el-row>
        <el-col :span="22">
          <el-date-picker
            v-model="search.arrivalTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择起始日期">
          </el-date-picker>
          <el-date-picker
            v-model="search.leaveTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择结束日期">
          </el-date-picker>
          <el-input placeholder="请输入房间编号" v-model="search.currentRoomName" class="input-with-select" style="width: 200px">
            <el-button slot="append" icon="el-icon-search" @click="findData"></el-button>
          </el-input>

        </el-col>
      </el-row>
    </div>

    <el-table
      :data="tableData.list"
      border
      :summary-method="getTotalPrice"
      show-summary
      style="width: 100%;">
      <el-table-column
        prop="id"
        width="100"
        label="入住单号">
      </el-table-column>
      <el-table-column
        prop="currentRoomName"
        label="房间编号">
      </el-table-column>

      <el-table-column
        prop="roomsTypeName"
        label="客房类型">
      </el-table-column>
      <el-table-column
        prop="residents"
        label="入住人">
      </el-table-column>
      <el-table-column
        prop="memberId"
        label="会员编号">
      </el-table-column>
      <!--设置状态，根据不同状态显示不同数据-->
      <el-table-column
        prop="deposit"
        label="付款金额(元)">
        <template slot-scope="scope">
          <span v-if="scope.row.bookStatus==0">{{scope.row.deposit}}</span>
          <span v-if="scope.row.bookStatus==2 ">{{scope.row.deposit}}</span>
          <span v-if="scope.row.bookStatus==3 ">{{scope.row.orderForm.totalBill}}</span>
          <span v-if="scope.row.bookStatus==4 ">{{scope.row.deposit}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="orderForm.payStyle"
        label="进账方式">
      </el-table-column>

      <el-table-column
        prop="bookStatus"
        label="进账类型"
        :formatter="bookStatusformat">
      </el-table-column>
      <!--如果是押金，显示订单创建时间、如果是结账，显示结账时间-->
      <el-table-column
        prop="bookStatus"
        width="170"
        label="进账时间">
        <template slot-scope="scope">
          <span v-if="scope.row.bookStatus==0">{{scope.row.createDate}}</span>
          <span v-if="scope.row.bookStatus==2 ">{{scope.row.createDate}}</span>
          <span v-if="scope.row.bookStatus==3 ">{{scope.row.orderForm.createDate}}</span>
          <span v-if="scope.row.bookStatus==4 ">{{scope.row.createDate}}</span>
        </template>
      </el-table-column>
      <!--<el-table-column label="操作" width="70">-->
      <!--<template slot-scope="scope">-->
      <!--<el-button @click="detail(scope.row)" type="text" size="small">详情</el-button>-->
      <!--</template>-->
      <!--</el-table-column>-->
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
//  import DetailFinancial from '@/components/financial/detail'
  export default {
    inject:['reload'],
    name:"orderlist",
    data () {
      return {
        deposits:"",
        totalBills:"",
        search:{
          currentRoomName:"",
          arrivalTime:"",
          leaveTime:""

        },
        queryParams:{
          pageNo:1,
          pageSize:10,
          currentRoomName:"",
          arrivalTime:"",
          leaveTime:""
        },
        tableData:{},
        orderForm:{},
        order:[]
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
      getTotalPrice(param){
        const {columns ,data}=param;
        const sums = [];
        columns.forEach((column ,index) =>{
          if (index === 0){
            sums[index] = '总计';
            return;
          }
          if (column.property === 'deposit') {
            sums[index]=this.totalBills+this.deposits;
          }
          else {
            sums[index] = '';
          }

        });
        return sums
      },
      getData(){
        //查询所有0、2、3、4状态的
        this.get("orderManage/financial",(data)=>{
          console.log("订单表所有信息",data);
          this.tableData=data;
          this.order=data.list;
          let deposits = 0;
          this.order.forEach((order) => {
            //遍历dcPrice这个字段，并累加
            if(order.bookStatus===0||order.bookStatus===2){
              deposits += order.deposit;
            }
          });
          this.deposits=deposits;
        },this.queryParams);
        //查询结账（只有3退房状态才会结账）信息
        this.get("orderManage/orderForm",(data)=>{
          console.log("结账信息",data);
          this.orderForm=data;
          let totalBills = 0;
          this.orderForm.forEach((order) => {
            //遍历dcPrice这个字段，并累加
            totalBills += order.totalBill;
          });
          this.totalBills=totalBills;
        });
      },

      bookStatusformat(row, column, cellValue, index){
        if(cellValue==0)
          return "押金";
        else if(cellValue==1)
          return "已取消";
        else if(cellValue==2)
          return "押金";
        else if(cellValue==4)
          return "押金";
        else if(cellValue==3)
          return "结账";
      },
      changePageNo(i){
        this.queryParams.pageNo=i;
      },
      findData(){
        this.queryParams.pageNo=1;
        this.merge(this.search,this.queryParams);
      },
//      detail(row){
//        this.$layer.iframe({
//          content: {
//            content: DetailFinancial, //传递的组件对象
//            parent: this,//当前的vue对象
//            data:{
//              id:row.id,
//              totalBill:row.orderForm.totalBill,
//              createDate1:row.createDate,
//              createDate2:row.orderForm.createDate,
//              deposit:row.deposit}//props
//          },
//          area:['800px','600px'],
//          title: '入住信息详情',
//          shadeClose: false,
//          shade :true
//        });
//      },
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
