<template>
  <div>
    <div style="margin-top: 15px;">
      <el-row>
        <el-col :span="2">
<!--          <el-button type="primary" @click="add">添加</el-button>-->
        </el-col>
        <el-col :span="22">
          <el-select v-model="search.status" filterable placeholder="请选择预定状态" style="width: 200px"  @change="findData">
            <el-option label="全部" value="">全部</el-option>
            <el-option label="空房" value="0"></el-option>
            <el-option label="已预订" value="1"></el-option>
            <el-option label="入住" value="2"></el-option>
          </el-select>
          <el-input placeholder="请输入客房号" v-model="search.roomId" class="input-with-select" style="width: 180px">
            <!--根据客房状态查询-->
            <el-button slot="append" icon="el-icon-search" @click="findData"></el-button>
          </el-input>
          <el-select v-model="search.floorId" filterable placeholder="请选择楼层信息" style="width: 200px"  @change="findData">
            <el-option label="" value="">全部</el-option>
            <el-option
              v-for="item in floors"
              :key="item.id"
              :label="item.floorName"
              :value="item.id">
            </el-option>
          </el-select>
          <el-select v-model="search.roomTypeid" filterable placeholder="请选择类型信息" style="width: 200px"  @change="findData">
            <el-option label="" value="">全部</el-option>
            <el-option
              v-for="item in guestTypes"
              :key="item.id"
              :label="item.typeName"
              :value="item.id">
            </el-option>
          </el-select>
          <el-input placeholder="起始标准价格" v-model="search.price1" class="input-with-select" style="width: 130px">
<!--            <el-button slot="append" icon="el-icon-search" @click="findData"></el-button>-->
          </el-input>—
          <el-input placeholder="结束标准价格" v-model="search.price2" class="input-with-select" style="width: 200px">
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
        prop="roomId"
        label="房间号">
      </el-table-column>
      <el-table-column
        prop="guestType.typeName"
        label="客房类型">
      </el-table-column>

      <el-table-column
        prop="floor.floorName"
        label="楼层">
      </el-table-column>
      <el-table-column
        prop="normalPrice"
        label="标准价格(元)">
      </el-table-column>
      <el-table-column
        prop="discountPrice"
        label="折后价(元)">
      </el-table-column>
      <el-table-column
        prop="gvipPrice"
        label="普通会员价(元)">
      </el-table-column>
      <el-table-column
        prop="svipPrice"
        label="Vip会员价(元)">
      </el-table-column>
      <!--<el-table-column-->
      <!--prop="remarks"-->
      <!--label="备注">-->
      <!--</el-table-column>-->
      <el-table-column
        prop="status"
        label="客房状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status==0 " style="color: green" >空房</span>
          <span v-if="scope.row.status==1 " style="color: red">已预定</span>
          <span v-if="scope.row.status==2 " style="color: orange">已入住</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!--只有状态为0的才能预定-->
          <el-button @click="edit(scope.row)" type="text" size="small" v-if="scope.row.status==0">预定</el-button>
          <el-button @click="edit(scope.row)" type="text" style="color: gray" size="small" v-if="scope.row.status!=0" disabled>预定</el-button>
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
  import AddOrders from '@/components/orderManage/add'
  import DetailRooms from '@/components/rooms/details'
  export default {
    inject:['reload'],
    name:"rooms",
    data () {
      return {
        search:{
          id:"",
          floorId:"",
          roomId:"",
          roomTypeid:"",
          normalPrice:"",
          status:"",
          price1:"",
          price2:"",
        },
        queryParams:{
          pageNo:1,
          pageSize:10,
          id:"",
          roomId:"",
          floorId:"",
          roomTypeid:"",
          normalPrice:"",
          status:0,
          price1:"",
          price2:"",
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
        this.get("rooms/list",(data)=>{
          this.tableData=data;
        },this.queryParams);
        this.get("rooms/getAllFloor",(data)=>{
          this.floors=data;
        });
        this.get("rooms/getAllGuestType",(data)=>{
          this.guestTypes=data;
        });
      },
      statusformat(row, column, cellValue, index){
        if(cellValue==0)
          return "空房";
        else if(cellValue==1)
          return "已预订";
        else if (cellValue==2)
          return "入住"
      },
      changePageNo(i){
        this.queryParams.pageNo=i;
      },
      findData(){
        this.queryParams.pageNo=1;
        this.merge(this.search,this.queryParams);
      },
     /* add(){
        this.$layer.iframe({
          content: {
            content: EditRooms, //传递的组件对象
            parent: this,//当前的vue对象
            data:{}//props
          },
          area:['800px','600px'],
          title: '添加客房信息',
          shadeClose: false,
          shade :true
        });
      },*/
      edit(row){
        this.$layer.iframe({
          content: {
            content: AddOrders, //传递的组件对象
            parent: this,//当前的vue对象
            data:{roomsid:row.id,
              rooms_currentRoomName:row.roomId,
              rooms_normalPrice:row.normalPrice,
              rooms_discountPrice:row.discountPrice,
              rooms_gvipPrice:row.gvipPrice,
              rooms_svipPrice:row.svipPrice,
              rooms_typeName:row.guestType.typeName
      }//props
          },
          area:['800px','600px'],
          title: '添加预定信息',
          shadeClose: false,
          shade :true
        });
      },
      detail(row){
        this.$layer.iframe({
          content: {
            content: DetailRooms, //传递的组件对象
            parent: this,//当前的vue对象
            data:{id:row.id}//props
          },
          area:['800px','600px'],
          title: '客房信息详情',
          shadeClose: false,
          shade :true
        });
      },
      del(row){
        this.delete("rooms/del",row.id,row.active);
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
</style>
