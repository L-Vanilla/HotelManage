<template>
  <div>
    <div style="margin-top: 15px;margin-bottom: 10px">
      <el-row>
        <el-col :span="2">
<!--          <el-button type="primary" @click="add">添加</el-button>-->
        </el-col>
        <el-col :span="22">
          <el-select v-model="search.bookStatus" filterable placeholder="请选择预定状态" style="width: 200px"  @change="findData">
            <el-option label="全部" value="5">全部</el-option>
            <el-option  label="已预定" value="0">已预定</el-option>
            <el-option  label="已取消" value="1">已取消</el-option>
<!--            <el-option  label="已入住" value="2">已入住</el-option>-->
<!--            <el-option  label="已退房" value="3">已退房</el-option>-->
          </el-select>
          <el-input placeholder="请输入预定编号" v-model="search.id" class="input-with-select" style="width: 200px">
            <el-button slot="append" icon="el-icon-search" @click="findData"></el-button>
          </el-input>
          <el-input placeholder="请输入房间号" v-model="search.currentRoomName" class="input-with-select" style="width: 200px">
            <el-button slot="append" icon="el-icon-search" @click="findData"></el-button>
          </el-input>
          <el-input placeholder="请输入预定人姓名" v-model="search.residents" class="input-with-select" style="width: 200px">
            <el-button slot="append" icon="el-icon-search" @click="findData"></el-button>
          </el-input>
          <el-input placeholder="请输入客房类型名称" v-model="search.roomsTypeName" class="input-with-select" style="width: 200px">
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
        label="入住单号">
      </el-table-column>
      <el-table-column
        width="150"
        prop="currentRoomName"
        label="预定房间编号">
      </el-table-column>
      <el-table-column
        prop="roomsTypeName"
        label="房间类型">
      </el-table-column>
<!--      <el-table-column-->
<!--        prop="rooms.normalPrice"-->
<!--        label="标准价">-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--        prop="rooms.discountPrice"-->
<!--        label="折后价">-->
<!--      </el-table-column>-->
      <el-table-column
        prop="deposit"
        label="押金(元)">
      </el-table-column>
      <el-table-column
        prop="residents"
        label="预定人">
      </el-table-column>
<!--      <el-table-column-->
<!--        prop="credentialsType"-->
<!--        label="证件类型">-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--        prop="credentialsNum"-->
<!--        label="证件号">-->
<!--      </el-table-column><el-table-column-->
<!--        prop="phone"-->
<!--        label="联系方式">-->
<!--      </el-table-column>-->
      <el-table-column
        prop="arrivalTime"
        width="170"
        label="抵店时间">
      </el-table-column>
      <el-table-column
        width="170"
        prop="leaveTime"
        label="离店时间">
      </el-table-column>
      <el-table-column
        prop="personNum"
        label="入住人数">
      </el-table-column>
<!--      <el-table-column-->
<!--        prop="操作员"-->
<!--        label="userId">-->
<!--      </el-table-column>-->
      <el-table-column
        prop="memberId"
        label="会员编号">
      </el-table-column>
<!--      <el-table-column-->
<!--        prop="会员价"-->
<!--        label="memberId">-->
<!--      </el-table-column>-->

      <el-table-column
        prop="bookStatus"
        label="预定状态">
        <template slot-scope="scope">
          <span v-if="scope.row.bookStatus==0 " style="color: green" >
              已预定
             <el-button type="primary" @click="cancel(scope.row)" round size="mini">取消</el-button>
          </span>
          <span v-if="scope.row.bookStatus==1 " style="color: red">已取消</span>
          <span v-if="scope.row.bookStatus==2 " style="color: orange">已入住</span>
          <span v-if="scope.row.bookStatus==3 " style="color: gray">已退房</span>
          <span v-if="scope.row.bookStatus==4 " style="color: orangered">已换房</span>
        </template>
      </el-table-column>
<!--      <el-table-column-->
<!--        prop="remarks"-->
<!--        label="备注">-->
<!--      </el-table-column>-->
      <!--<el-table-column-->
      <!--prop="active"-->
      <!--label="是否有效"-->
      <!--:formatter="activeformat">-->
      <!--</el-table-column>-->
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button @click="detail(scope.row)" type="text" size="small" icon="el-icon-document">详情</el-button>
          <el-button @click="edit(scope.row)" style="color:#17B3A3 " type="text" size="small" v-if="scope.row.bookStatus==0"  icon="el-icon-edit">修改</el-button>
          <el-button @click="edit(scope.row)" style="color:gray " type="text" size="small" v-if="scope.row.bookStatus!=0"  icon="el-icon-edit" disabled>修改</el-button>
<!--          <el-button @click="edit(scope.row)" type="text" size="small">{{edittext(scope.row.bookStatus)}}</el-button>-->
<!--          <el-button @click="detail(scope.row)" type="text" size="small">详情</el-button>-->
          <!--<el-button type="text" size="small" @click="del(scope.row)">{{deltext(scope.row.bookStatus)}}</el-button>-->
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
  import EditOrderManage from '@/components/orderManage/edit'
  import DetailOrderManage from '@/components/orderManage/details'

  export default {
    inject:['reload'],
    name:"orderManage",
    data () {
      return {
        search:{
          id:"",
          bookStatus:"",
          residents:"",
          roomsTypeName:"",
          currentRoomName:""
        },
        queryParams:{
          pageNo:1,
          pageSize:10,
          id:"",
          residents:"",
          roomsTypeName:"",
          currentRoomName:"",
          bookStatus:0,
        },
        tableData:{},
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
        this.get("rooms/getAllGuestType",(data)=>{
          this.guestTypes=data;
        });
      },
      // bookStatusformat(row, column, cellValue, index){
      //   if(cellValue==0)
      //     return "已预定";
      //   else if(cellValue==1)
      //     return "已取消";
      //   else if(cellValue==2)
      //     return "已入住";
      //   else if(cellValue==1)
      //     return "已退房";
      // },

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
      //       content: EditOrderManage, //传递的组件对象
      //       parent: this,//当前的vue对象
      //       data:{}//props
      //     },
      //     area:['800px','600px'],
      //     title: '添加预定信息',
      //     shadeClose: false,
      //     shade :true
      //   });
      // },
      edit(row){
        this.$layer.iframe({
          content: {
            content: EditOrderManage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{id:row.id}//props
          },
          area:['800px','600px'],
          title: '修改预定信息',
          shadeClose: false,
          shade :true
        });
      },
      detail(row){
        this.$layer.iframe({
          content: {
            content: DetailOrderManage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{id:row.id}//props
          },
          area:['800px','600px'],
          title: '预定信息详情',
          shadeClose: false,
          shade :true
        });
      },
      del(row){
        this.delete("orderManage/del",row.id,row.active);
      },
      cancel(row){
        this.$confirm('确定要取消码?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          row.bookStatus=1;
          this.get("orderManage/updateBookStutas",(data)=>{
            if(data>0){
              this.$message({
                type: 'success',
                message: '取消成功!'
              });
            }
          },{id:row.id,bookStatus: 1,currentRoomId:row.currentRoomId});
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '在预定中'
          });
        });
      },
      edittext(bookstatus){
        if(bookstatus==0||bookstatus==2)
        return "修改";
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
