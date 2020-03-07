<template>
  <div>
    <div style="margin-top: 15px;margin-bottom: 10px">
      <el-row>
        <el-col :span="22">
          <el-input placeholder="请输入入住单号" v-model="search.id" class="input-with-select" style="width: 200px">
            <el-button slot="append" icon="el-icon-search" @click="findData"></el-button>
          </el-input>
          <el-input placeholder="请输入房间号" v-model="search.currentRoomName" class="input-with-select" style="width: 200px">
            <el-button slot="append" icon="el-icon-search" @click="findData"></el-button>
          </el-input>
          <el-input placeholder="请输入入住人" v-model="search.residents" class="input-with-select" style="width: 200px">
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
        label="房间号">
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
        prop="personNum"
        label="入住人数">
      </el-table-column>

      <el-table-column
        prop="memberId"
        label="会员编号">
      </el-table-column>
      <el-table-column
        prop="memberPrice"
        label="会员价(元)">
      </el-table-column>
      <el-table-column
        prop="remarks"
        label="备注">
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="add(scope.row)" type="text" size="small">退房结账</el-button>
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
  import AddCheckout from '@/components/checkout/add'
  export default {
    inject:['reload'],
    name:"ordermanage",
    data () {
      return {
        search:{
          id:"",
          residents:"",
          currentRoomName:""

        },
        queryParams:{
          pageNo:1,
          pageSize:10,
          id:"",
          residents:"",
          currentRoomName:""

        },
        tableData:{},
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
        this.get("orderManage/listLived",(data)=>{
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
      add(row){
        this.$layer.iframe({
          content: {
            content: AddCheckout, //传递的组件对象
            parent: this,//当前的vue对象
            data:{
              id:row.id,
              currentRoomId:row.currentRoomId,//用来更改房间状态
              currentRoomName:row.currentRoomName,
              discountPrice:row.discountPrice,
              deposit:row.deposit,
              memberId:row.memberId,//用来更新会员积分
            }//props
          },
          area:['800px','600px'],
          title: '客房结账',
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
