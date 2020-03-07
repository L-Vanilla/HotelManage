<template>
  <div>
      <div style="margin-top: 15px;margin-bottom: 10px">
          <el-row>
              <el-col :span="2"><el-button style="background-color: #17B3A3;color: #fff" @click="add">添加</el-button></el-col>
              <el-col :span="22">
                <el-input placeholder="请输入类型名称" v-model="search.typeName" class="input-with-select" style="width: 200px">
                  <!--<el-select v-model="search.active" style="width:80px" slot="prepend" placeholder="请选择">-->
                    <!--<el-option label="全部" value=""></el-option>-->
                    <!--<el-option label="有效" value="1"></el-option>-->
                    <!--<el-option label="失效" value="0"></el-option>-->
                  <!--</el-select>-->
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
        label="编号">
        </el-table-column>
        <el-table-column
        prop="typeName"
        label="客房类型">
        </el-table-column>
        <el-table-column
        prop="limitNum"
        label="人数限制">
        </el-table-column>
        <el-table-column
        prop="remarks"
        label="备注">
        </el-table-column>
         <el-table-column
        prop="createTime"
        label="创建日期">
        </el-table-column>
        <!--<el-table-column-->
          <!--prop="active"-->
          <!--label="是否有效"-->
          <!--:formatter="activeformat">-->
        <!--</el-table-column>-->

        <el-table-column label="操作">
        <template slot-scope="scope">
            <!--<el-button @click="edit(scope.row)" size="small" type="primary" icon="el-icon-edit">修改</el-button>-->
            <el-button @click="edit(scope.row)" style="color:#17B3A3" type="text" size="small" icon="el-icon-edit" circle>修改</el-button>
          <!--<el-button @click="del(scope.row)" size="small" type="danger" icon="el-icon-delete">删除</el-button>-->
            <el-button type="text" style="color:red" size="small" @click="del(scope.row)" icon="el-icon-delete">{{deltext(scope.row.active)}}</el-button>
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
    import EditGuestType from '@/components/guestType/edit'
  export default {
      inject:['reload'],
      name:"guestType",
    data () {
      return {
          search:{
              typeName:""
          },
          queryParams:{
              pageNo:1,
              pageSize:10,
              typeName:""
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
            this.get("guestType/list",(data)=>{
                this.tableData=data;
            },this.queryParams);
        },
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
                    content: EditGuestType, //传递的组件对象
                    parent: this,//当前的vue对象
                    data:{}//props
                },
                area:['800px','600px'],
                title: '添加客房类型',
                shadeClose: false,
                shade :true
            });
        },
        edit(row){
             this.$layer.iframe({
                content: {
                    content: EditGuestType, //传递的组件对象
                    parent: this,//当前的vue对象
                    data:{id:row.id}//props
                },
                area:['800px','600px'],
                title: '修改客房类型',
                shadeClose: false,
                shade :true
            });
        },
      del(row){
        this.delete("guestType/del",row.id,row.active);
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
