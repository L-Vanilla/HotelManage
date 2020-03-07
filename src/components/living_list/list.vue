<template>
  <div>
    <div style="margin-top: 15px;margin-bottom: 10px">
      <el-row>
        <el-col :span="2">
        </el-col>
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
          <el-input placeholder="请输入房间号" v-model="search.currentRoomName" class="input-with-select" style="width: 200px">
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
        prop="currentRoomName"
        label="客房编号">
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
      <el-table-column
        prop="arrivalTime"
        width="200"
        label="抵店时间">
      </el-table-column>
      <el-table-column
        prop="leaveTime"
        width="200"
        label="离店时间">
      </el-table-column>
      <el-table-column
        prop="phone"
        width="140"
        label="联系人电话">
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
  import EditOrderManage from '@/components/orderManage/edit'
  import DetailOrderManage from '@/components/orderManage/details'

  export default {
    inject:['reload'],
    name:"living_list",
    data () {
      return {
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
        orderManages:{}
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
        this.get("orderManage/getlistLived",(data)=>{
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
