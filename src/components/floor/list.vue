<template>
  <div>
      <div style="margin-top: 15px;margin-bottom: 10px">
          <el-row>
              <el-col :span="2"><el-button style="background-color: #17B3A3;color: #fff" @click="add">添加</el-button></el-col>
              <el-col :span="22">
                <el-input placeholder="请输入楼层名称" v-model="search.floorName" class="input-with-select" style="width: 200px">
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
        label="编号">
        </el-table-column>
        <el-table-column
        prop="floorName"
        width="200"
        label="楼层名">
        </el-table-column>

        <el-table-column
        prop="remarks"
        label="备注">
        </el-table-column>

        <el-table-column label="操作" width="200">
        <template slot-scope="scope">
            <!--<el-button @click="edit(scope.row)" size="small" type="primary" icon="el-icon-edit">修改</el-button>-->
            <el-button @click="edit(scope.row)" type="text" style="color:#17B3A3" size="small" icon="el-icon-edit">修改</el-button>
            <el-button type="text" size="small" style="color:red" @click="del(scope.row)" icon="el-icon-delete">{{deltext(scope.row.active)}}</el-button>
            <!--<el-button @click="del(scope.row)" size="small" type="danger" icon="el-icon-delete">删除</el-button>-->
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
    import EditFloor from '@/components/floor/edit'
  export default {
      inject:['reload'],
      name:"floor",
    data () {
      return {
          search:{
              floorName:""
          },
          queryParams:{
              pageNo:1,
              pageSize:10,
              floorName:""
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
            this.get("floor/list",(data)=>{
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
        add(){
            this.$layer.iframe({
                content: {
                    content: EditFloor, //传递的组件对象
                    parent: this,//当前的vue对象
                    data:{}//props
                },
                area:['800px','600px'],
                title: '添加楼层信息',
                shadeClose: false,
                shade :true
            });
        },
        edit(row){
             this.$layer.iframe({
                content: {
                    content: EditFloor, //传递的组件对象
                    parent: this,//当前的vue对象
                    data:{id:row.id}//props
                },
                area:['800px','600px'],
                title: '修改楼层信息',
                shadeClose: false,
                shade :true
            });
        },
      del(row){
        this.delete("floor/del",row.id,row.active);
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
