<template>
  <div>
    <div style="margin-top: 15px;margin-bottom: 10px">
      <el-row>
        <el-col :span="22">
          <el-input placeholder="请输入原房间编号" v-model="search.originalRoomName" class="input-with-select" style="width: 200px">
            <el-button slot="append" icon="el-icon-search" @click="findData"></el-button>
          </el-input>

          <el-input placeholder="请输入现房间编号" v-model="search.currentRoomName" class="input-with-select" style="width: 200px">
            <el-button slot="append" icon="el-icon-search" @click="findData"></el-button>
          </el-input>

          <el-input placeholder="请输入住人姓名" v-model="search.residents" class="input-with-select" style="width: 200px">
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
        prop="originalRoomName"
        label="原房间编号">
      </el-table-column>
      <el-table-column
        prop="currentRoomName"
        label="现房间编号">
      </el-table-column>

      <!--<el-table-column-->
        <!--prop="bookStatus"-->
        <!--label="状态"-->
        <!--:formatter="bookStatusformat">-->
      <!--</el-table-column>-->

      <el-table-column
        prop="roomsTypeName"
        label="客房类型">
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
        prop="arrivalTime"
        width="170"
        label="抵店时间">
      </el-table-column>
      <el-table-column
        prop="leaveTime"
        width="170"
        label="离店时间">
      </el-table-column>
      <el-table-column
        prop="bookStatus"
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
        prop="createDate"
        width="170"
        label="创建时间">
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" type="text" size="small" v-if="scope.row.bookStatus==2">换房</el-button>
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
  import EditChangeroom from '@/components/changeroom/edit'
  import DetailChangeRoom from '@/components/changeroom/details'
  export default {
    inject:['reload'],
    name:"changeroom",
    data () {
      return {
        search:{
          id:"",
          originalRoomName:"",
          currentRoomName:"",
          bookStatus:"",
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
          // rooms:"",
          // leaguer:""
        },
        queryParams:{
          pageNo:1,
          pageSize:10,
          id:"",
          originalRoomName:"",
          currentRoomName:"",
          bookStatus:"",
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
        this.get("orderManage/listLived",(data)=>{
          console.log(data.list.roomTypeId)
          this.tableData=data;
        },this.queryParams);

        // this.get("orderManage/getAll",(data)=>{
        //   this.goodsTypes=data;
        // });
        this.get("rooms/getAllGuestType",(data)=>{
          console.log(data)
          this.guestTypes=data;
        });
      },
      Statusformat(row, column, cellValue, index){
        let i=0;
        if(cellValue==null)return "无";
        else  return cellValue;
      },
      guestTypeformat(row, column, cellValue, index){
        console.log(cellValue)
        let i=0;
        for (i;i<this.guestTypes.length;i++){

          if(cellValue==this.guestTypes[i].id){
            return this.guestTypes[i].typeName;

          }
        }
      },
      findData(){
        this.queryParams.pageNo=1;
        this.merge(this.search,this.queryParams);
      },
      bookStatusformat(row, column, cellValue, index){
        if(cellValue==0)
          return "已预定";
        else if(cellValue==1)
          return "已取消";
        else if(cellValue==2)
          return "已入住";
        else if(cellValue==3)
          return "已退房";
        else if(cellValue==4)
          return "已换房";
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

      add(){
        this.$layer.iframe({
          content: {
            content: EditOrderlist, //传递的组件对象
            parent: this,//当前的vue对象
            data:{}//props
          },
          area:['800px','1000px'],
          title: '添加登记信息',
          shadeClose: false,
          shade :true
        });
      },
      detail(row){
        this.$layer.iframe({
          content: {
            content: DetailChangeRoom, //传递的组件对象
            parent: this,//当前的vue对象
            data:{id:row.id}//props
          },
          area:['800px','600px'],
          title: '入住信息详情',
          shadeClose: false,
          shade :true
        });
      },
      edit(row){
        this.$layer.iframe({
          content: {
            content: EditChangeroom, //传递的组件对象
            parent: this,//当前的vue对象
            data:{id:row.id}//props
          },
          area:['800px','600px'],
          title: '换房管理',
          shadeClose: false,
          shade :true
        });
      },
      del(row){
        this.delete("orderManage/del",row.id,row.active);
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
