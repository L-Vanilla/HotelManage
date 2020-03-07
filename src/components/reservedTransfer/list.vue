<template>

  <div>
    <div style="margin-top: 15px;">
      <el-row>
        <el-col :span="22">
          <el-select v-model="search.bookStatus" filterable placeholder="请选择预定状态" style="width: 200px"  @change="findData">
            <el-option label="全部" value="6" >全部</el-option>
            <el-option  label="已预定" value="0">已预定</el-option>
            <el-option  label="已取消" value="1">已取消</el-option>
            <el-option  label="已入住" value="2">已入住</el-option>
            <!--            <el-option  label="已退房" value="3">已退房</el-option>-->
          </el-select>
          <el-input placeholder="请输入预定单号" v-model="search.id" class="input-with-select" style="width: 200px">
            <el-button slot="append" icon="el-icon-search" @click="findData"></el-button>
          </el-input>
          <!--<el-select v-model="search.roomsTypeName" filterable placeholder="请选择类型信息" style="width: 200px"  @change="findData">-->
          <!--<el-option-->
          <!--v-for="item in guestTypes"-->
          <!--:key="item.id"-->
          <!--:label="item.typeName"-->
          <!--:value="item.id">-->
          <!--</el-option>-->
          <!--</el-select>-->
          <el-input placeholder="请输入客房类型名称" v-model="search.roomsTypeName" class="input-with-select" style="width: 200px">
            <el-button slot="append" icon="el-icon-search" @click="findData"></el-button>
          </el-input>
          <el-input placeholder="请输入房间编号" v-model="search.currentRoomName" class="input-with-select" style="width: 200px">
            <el-button slot="append" icon="el-icon-search" @click="findData"></el-button>
          </el-input>
          <el-input placeholder="请输入预定人姓名" v-model="search.residents" class="input-with-select" style="width: 200px">
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
        label="预定单号">
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
        width="170"
        prop="arrivalTime"
        label="抵店时间">
      </el-table-column>
      <el-table-column
        prop="leaveTime"
        width="170"
        label="离店时间">
      </el-table-column>
      <el-table-column
        prop="bookStatus"
        label="登记入住"
        width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.bookStatus==0 " style="color: green" >
            已预定
            <el-button type="primary" @click="house(scope.row)" round size="mini">点击入住</el-button>
          </span>
          <span v-if="scope.row.bookStatus==1 " style="color: red">已取消</span>
          <span v-if="scope.row.bookStatus==2 " style="color: orange">已入住</span>
          <span v-if="scope.row.bookStatus==3 " style="color: gray">已退房</span>
          <span v-if="scope.row.bookStatus==4 " style="color: orangered">已换房</span>
        </template>
      </el-table-column>
      <el-table-column prop="timedWakeup" label="服务唤醒" width="100" >
        <template slot-scope="scope">
          <el-checkbox true-label="1" false-label="0" v-model="scope.row.breakfast" @change="breakfast_Edit(scope.row)">提供早餐</el-checkbox>
          <el-checkbox true-label="2" false-label="0" v-model="scope.row.timedWakeup" @change="timedWakeup_Edit(scope.row)" >定时叫醒</el-checkbox>
        </template>
      </el-table-column>


      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button @click="detail(scope.row)" type="text" size="small" icon="el-icon-document">详情</el-button>
          <el-button @click="edit(scope.row)" style="color:#17B3A3 " type="text" size="small" v-if="scope.row.bookStatus==0"  icon="el-icon-edit">修改</el-button>
          <el-button @click="edit(scope.row)" style="color:gray " type="text" size="small" v-if="scope.row.bookStatus!=0"  icon="el-icon-edit" disabled>修改</el-button>
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
  import EditReservedTransfer from '@/components/reservedTransfer/edit'
  import DetailReservedTransfer from '@/components/reservedTransfer/details'

  export default {
    inject:['reload'],
    name:"reservedTransfer",
    data () {
      return {
        checked:true,
        search:{
          id:"",
          originalRoomId:"",
          currentRoomId:"",
          currentRoomName:"",
          residents:"",
          roomsTypeName:"",
          roomTypeid:"",
          bookStatus:"",

        },

        queryParams:{
          pageNo:1,
          pageSize:10,
          id:"",
          originalRoomId:"",
          currentRoomId:"",
          currentRoomName:"",
          residents:"",
          roomsTypeName:"",
          roomTypeid:"",
          bookStatus:6,
        },
        tableData:{},
        floors:{},
        guestTypes:{}
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
        this.get("orderManage/list",(data)=>{
          this.tableData=data;
        },this.queryParams);

        this.get("rooms/getAllFloor",(data)=>{
          this.floors=data;
        });
        this.get("rooms/getAllGuestType",(data)=>{
          this.guestTypes=data;
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
        this.$layer.iframe({
          content: {
            content: EditReservedTransfer, //传递的组件对象
            parent: this,//当前的vue对象
            data:{id:row.id}//props
          },
          area:['800px','600px'],
          title: '可修改部分信息',
          shadeClose: false,
          shade :true
        });
      },

      detail(row){
        this.$layer.iframe({
          content: {
            content: DetailReservedTransfer, //传递的组件对象
            parent: this,//当前的vue对象
            data:{id:row.id}//props
          },
          area:['800px','600px'],
          title: '入住信息详情',
          shadeClose: false,
          shade :true
        });
      },


      house(row){
        this.$confirm('确定要入住吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          row.bookStatus=2;
          this.get("orderManage/updateBookStutas1",(data)=>{
            if(data>0){
              this.$message({
                type: 'success',
                message: '入住成功!'
              });
              this.getData();
            }
          },{id:row.id,bookStatus: 2,currentRoomId:row.currentRoomId,memberId:row.memberId});

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '在预定中'
          });
        });
      },


      timedWakeup_Edit(row){
        this.get("orderManage/updatetimedWakeup",(data)=>{
          if(data>0){
            if(row.timedWakeup==0){
              this.$message({
                type: 'warning',
                message: '取消唤醒服务!'
              });
            }else{
              this.$message({
                type: 'success',
                message: '成功唤醒服务!'
              });
            }

          }
        },{id:row.id,timedWakeup: row.timedWakeup});
      },
      breakfast_Edit(row){
        this.get("orderManage/updatetimedWakeup",(data)=>{
          if(data>0){
            if(row.breakfast==0){
              this.$message({
                type: 'warning',
                message: '取消唤醒服务!'
              });
            }else{
              this.$message({
                type: 'success',
                message: '成功唤醒服务!'
              });
            }
          }
        },{id:row.id,breakfast: row.breakfast});
      },

    }
  }
</script>

<style>
  .el-table .cell {
    text-align: center;
  }
</style>
