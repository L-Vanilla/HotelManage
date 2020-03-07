<template>
  <div>
    <div style="margin-top: 15px;;margin-bottom: 10px">
      <el-row>
        <el-col :span="2"><el-button style="background-color: #17B3A3;color: #fff" @click="add">添加</el-button></el-col>
        <el-col :span="22">
          <el-input placeholder="请输入房间编号" v-model="search.currentRoomName" class="input-with-select" style="width: 200px">
            <el-button slot="append" icon="el-icon-search" @click="findData"></el-button>
          </el-input>
          <el-input placeholder="请输入住人姓名" v-model="search.residents" class="input-with-select" style="width: 200px">
            <el-button slot="append" icon="el-icon-search" @click="findData"></el-button>
          </el-input>


<!--          <el-select v-model="search.bookStatus" filterable placeholder="请选择状态" style="width: 200px"  @change="findData">-->
<!--            <el-option  label="请选择状态" value="">请选择状态</el-option>-->
<!--            <el-option  label="已预定" value="0">已预定</el-option>-->
<!--            <el-option  label="已取消" value="1">已取消</el-option>-->
<!--            <el-option  label="已入住" value="2">已入住</el-option>-->
<!--            <el-option  label="已退房" value="3">已退房</el-option>-->
<!--          </el-select>-->


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
        prop="currentRoomName"
        label="房间编号">
      </el-table-column>
      <el-table-column
        prop="bookStatus"
        label="状态"
        :formatter="bookStatusformat">
      </el-table-column>

      <el-table-column
        prop="roomsTypeName"
        label="房间类型">
      </el-table-column>

<!--      <el-table-column-->
<!--        prop="normalPrice"-->
<!--        label="标准价">-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--        prop="discountPrice"-->
<!--        label="折后价">-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--        prop="deposit"-->
<!--        label="押金">-->
<!--      </el-table-column>-->
      <el-table-column
        prop="residents"
        label="入住人">
      </el-table-column>
<!--      <el-table-column-->
<!--        prop="credentialsType"-->
<!--        label="证件类别"-->
<!--        :formatter="credentialsTypeformat">-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--        prop="credentialsNum"-->
<!--        label="证件号码">-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--        prop="phone"-->
<!--        label="联系电话">-->
<!--      </el-table-column>-->
      <el-table-column
        width="170"
        prop="arrivalTime"
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
<!--        prop="userId"-->
<!--        label="操作员">-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--        prop="memberId"-->
<!--        label="会员编号">-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--        prop="memberPrice"-->
<!--        label="会员价">-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--        prop="breakfast"-->
<!--        label="提供早餐"-->
<!--      :formatter="breakfastStatusformat">-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--        prop="timedWakeup"-->
<!--        label="定时叫醒">-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--        prop="remarks"-->
<!--        label="备注">-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--        prop="active"-->
<!--        label="删除状态">-->
<!--      </el-table-column>-->
      <el-table-column
        width="170"
        prop="createDate"
        label="创建时间">
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" type="text" size="small">修改</el-button>
<!--          <el-button type="text" size="small" @click="del(scope.row)">{{deltext(scope.row.active)}}</el-button>-->
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
  import EditOrderlist from '@/components/orderlist/edit'
  import DetailOrderlist from '@/components/orderlist/details'
  import AddOrderlist from '@/components/orderlist/add'
  export default {
    inject:['reload'],
    name:"orderlist",
    data () {
      return {
        search:{
          id:"",
          originalRoomId:"",
          currentRoomId:"",
          bookStatus:2,
          roomTypeId:"",
          normalPrice:"",
          discountPrice:"",
          deposit:"",
          residents:"",
          credentialsType:"",
          credentialsNum:"",
          phone:"",
          arrivalTime:"",
          leaveTime:"",
          personNum:"",
          userId:"",
          memberId:"",
          memberPrice:"",
          breakfast:"",
          timedWakeup:"",
          remarks:"",
          active:"",
          createDate:"",
          roomsTypeName:"",
          originalRoomName:"",
          currentRoomName:""
          // rooms:"",
          // leaguer:""
        },
        queryParams:{
          pageNo:1,
          pageSize:10,
          id:"",
          originalRoomId:"",
          currentRoomId:"",
          bookStatus:2,
          roomTypeId:"",
          normalPrice:"",
          discountPrice:"",
          deposit:"",
          residents:"",
          credentialsType:"",
          credentialsNum:"",
          phone:"",
          arrivalTime:"",
          roomsTypeName:"",
          leaveTime:"",
          personNum:"",
          userId:"",
          memberId:"",
          memberPrice:"",
          breakfast:"",
          timedWakeup:"",
          remarks:"",
          active:"",
          createDate:"",
          originalRoomName:"",
          currentRoomName:""
          // rooms:"",
          // leaguer:""
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
          console.log(data)
          this.tableData=data;
        },this.queryParams);
        // this.get("orderManage/getAll",(data)=>{
        //   this.goodsTypes=data;
        // });
        this.get("rooms/getAllGuestType",(data)=>{
          console.log("l1213213")
          console.log(data)
          this.guestTypes=data;
        });
      },
      // guestTypeformat(row, column, cellValue, index){
      //   console.log(cellValue)
      //   let i=0;
      //   for (i;i<this.guestTypes.length;i++){
      //
      //     if(cellValue==this.guestTypes[i].id){
      //       return this.guestTypes[i].typeName;
      //
      //     }
      //   }
      // },
      bookStatusformat(row, column, cellValue, index){
        if(cellValue==0)
          return "已预定";
        else if(cellValue==1)
          return "已取消";
        else if(cellValue==2)
          return "已入住";
        else if(cellValue==3)
          return "已退房";
      },
      credentialsTypeformat(row, column, cellValue, index){
        if(cellValue==1)
          return "身份证";
        else if(cellValue==2)
          return "护照";
        else if(cellValue==3)
          return "港澳通行证";
        else if(cellValue==4)
          return "其他";
      },
      breakfastStatusformat(row, column, cellValue, index){
        if(cellValue==0)
          return "否";
        else if(cellValue==1)
          return "是";
      },
      // roomTypeformat(row, column, cellValue, index){
      //   let i=0;
      //  for (i;i<guestTypes.length;i++){
      //    if(cellValue==guestTypes.)
      //  }
      // },

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
      add(){
        this.$layer.iframe({
          content: {
            content: AddOrderlist, //传递的组件对象
            parent: this,//当前的vue对象
            data:{}//props
          },
          area:['800px','600px'],
          title: '添加登记信息',
          shadeClose: false,
          shade :true
        });
      },
      edit(row){
        this.$layer.iframe({
          content: {
            content: EditOrderlist, //传递的组件对象
            parent: this,//当前的vue对象
            data:{id:row.id}//props
          },
          area:['800px','600px'],
          title: '修改登记信息',
          shadeClose: false,
          shade :true
        });
      },
      detail(row){
        this.$layer.iframe({
          content: {
            content: DetailOrderlist, //传递的组件对象
            parent: this,//当前的vue对象
            data:{id:row.id}//props
          },
          area:['800px','600px'],
          title: '入住信息详情',
          shadeClose: false,
          shade :true
        });
      },
      del(row){
        this.delete("orderManage/updateBookStutas",row.id,row.active);
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
