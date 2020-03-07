<template>
  <div>
      <div style="margin-top: 15px;margin-bottom: 10px">
          <el-row>
              <el-col :span="2"><el-button style="background-color:#17B3A3;color: #fff" @click="add">添加</el-button></el-col>
              <el-col :span="22">
                <el-input placeholder="请输入编号" v-model="search.id" class="input-with-select" style="width: 200px">
                  <el-button slot="append" icon="el-icon-search" @click="findData"></el-button>
                </el-input>
                <el-input placeholder="请输入会员名称" v-model="search.leaguerName" class="input-with-select" style="width: 200px">
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
        prop="leaguerName"
        label="姓名">
        </el-table-column>
        <el-table-column
        prop="leaguerSex"
        label="性别"
        :formatter="sexformat">
        </el-table-column>
        <!--<el-table-column-->
          <!--prop="leaguerPwd"-->
          <!--label="密码">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--prop="leaguerTel"-->
          <!--label="电话">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--prop="leaguerAddress"-->
          <!--label="地址">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--prop="leaguerEmail"-->
          <!--label="邮箱">-->
        <!--</el-table-column>-->
        <el-table-column
          prop="leaguerScore"
          label="积分">
        </el-table-column>
        <el-table-column
          prop="leaguerRank"
          label="级别">
        </el-table-column>
        <!--<el-table-column-->
          <!--prop="timeLastlive"-->
          <!--width="150"-->
          <!--label="最后一次入住时间">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--prop="timeLastorder"-->
          <!--width="150"-->
          <!--label="最后一次预定时间">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
        <!--prop="remarks"-->
        <!--label="备注">-->
        <!--</el-table-column>-->

        <el-table-column label="操作">
        <template slot-scope="scope">
          <!--<el-button @click="edit(scope.row)" size="small" type="primary" icon="el-icon-edit">修改</el-button>-->
<!--          <el-button size="small" @click="del(scope.row)" type="danger" icon="el-icon-delete" circle></el-button>-->
          <!--<el-button @click="detail(scope.row)" size="small" type="info" icon="el-icon-document">详情</el-button>-->
            <el-button @click="edit(scope.row)" style="color:#17B3A3" type="text" size="small" icon="el-icon-edit">修改</el-button>
            <!--<el-button type="text" size="small" @click="del(scope.row)">{{deltext(scope.row.active)}}</el-button>-->
            <el-button @click="detail(scope.row)" type="text" size="small" icon="el-icon-document">详情</el-button>
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
    import EditLeaguer from '@/components/leaguer/edit'
    import DetailLeaguer from '@/components/leaguer/details'
  export default {
      inject:['reload'],
      name:"leaguer",
    data () {
      return {
          search:{
              id:"",
            leaguerName:""
          },
          queryParams:{
              pageNo:1,
              pageSize:10,
            leaguerName:"",
              id:""
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
            this.get("leaguer/list",(data)=>{
                this.tableData=data;
            },this.queryParams);
        },
        sexformat(row, column, cellValue, index){
          return cellValue==0?"女":"男";
        },
        // grankformat(row, column, cellValue, index){
        //   return cellValue==0?"普通":"VIP";
        // },
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
                    content: EditLeaguer, //传递的组件对象
                    parent: this,//当前的vue对象
                    data:{}//props
                },
                area:['800px','600px'],
                title: '添加会员信息',
                shadeClose: false,
                shade :true
            });
        },
        edit(row){
             this.$layer.iframe({
                content: {
                    content: EditLeaguer, //传递的组件对象
                    parent: this,//当前的vue对象
                    data:{id:row.id}//props
                },
                area:['800px','600px'],
                title: '修改会员信息',
                shadeClose: false,
                shade :true
            });
        },
      detail(row){
        this.$layer.iframe({
          content: {
            content: DetailLeaguer, //传递的组件对象
            parent: this,//当前的vue对象
            data:{id:row.id}//props
          },
          area:['800px','600px'],
          title: '会员信息详情',
          shadeClose: false,
          shade :true
        });
      },
      del(row){
        this.delete("leaguer/del",row.id,row.active);
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
