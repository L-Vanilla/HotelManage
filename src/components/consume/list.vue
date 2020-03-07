<template>
  <div>
      <div style="margin-top: 15px;margin-bottom: 10px">
          <el-row>
              <el-col :span="22">
                <el-input placeholder="请输入客房编号" v-model="search.roomId" class="input-with-select" style="width: 350px">
                  <el-select v-model="search.liveId" slot="prepend" filterable placeholder="请选择入住单号" style="width: 160px" @change="findData" >
                    <el-option label="" value="">全部</el-option>
                    <el-option
                      v-for="item in tableData.list"
                      :key="item.id"
                      :label="item.liveId"
                      :value="item.liveId">
                    </el-option>
                  </el-select>
                    <el-button slot="append" icon="el-icon-search" @click="findData"></el-button>
                </el-input>

                <el-select v-model="search.goodId" filterable placeholder="请选择商品名" style="width: 140px" @change="findData">
                  <el-option label="" value="">全部</el-option>
                  <el-option
                    v-for="item in goodss"
                    :key="item.id"
                    :label="item.goodsName"
                    :value="item.id">
                  </el-option>
                </el-select>
                <!--<el-select v-model="search.goodTypeid" filterable placeholder="请选择商品类型" style="width: 200px"  @click="findData">-->
                  <!--<el-option-->
                    <!--v-for="item in goodsTypes"-->
                    <!--:key="item.id"-->
                    <!--:label="item.goodsTypename"-->
                    <!--:value="item.id">-->
                  <!--</el-option>-->
                <!--</el-select>-->

              </el-col>
          </el-row>


        </div>
      <el-table
        :data="tableData.list"
        border
        :summary-method="getTotalPrice"
        show-summary
        style="width: 100%;">
        <el-table-column
        prop="liveId"
        width="80"
        label="入住单号">
        </el-table-column>
        <el-table-column
        prop="roomId"
        width="120"
        label="客房编号">
        </el-table-column>

        <el-table-column
          prop="goods.goodsName"
          label="商品名">
        </el-table-column>
        <el-table-column
          prop="num"
          label="数量">
        </el-table-column>
        <el-table-column
          prop="price"
          label="单价(元)">
        </el-table-column>
        <el-table-column
          prop="consumePrice"
          label="消费金额(元)">
        </el-table-column>
        <el-table-column
          prop="discount"
          label="折扣率">
        </el-table-column>
        <el-table-column
          prop="dcPrice"
          label="折后金额(元)">
        </el-table-column>

        <el-table-column label="操作" width="200">
        <template slot-scope="scope">
            <el-button @click="edit(scope.row)" style="color:#17B3A3 " type="text" size="small" icon="el-icon-edit">修改</el-button>
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
    import EditConsume from '@/components/consume/edit'
    import DetailConsume from '@/components/consume/details'
  export default {
      inject:['reload'],
      name:"consume",
    data () {
      return {
          search:{
              liveId:"",
              roomId:"",
              goodId:""
//              goodTypeid:""
          },
          queryParams:{
              pageNo:1,
              pageSize:10,
              liveId:"",
              roomId:"",
              goodId:""
//              goodTypeid:""
          },
          tableData:{},
           goodss:{}
//           goodsTypes:{}
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
    filters: {
      numFilter(value) {
        // 截取当前数据到小数点后三位
        let transformVal = parseFloat(value).toFixed(3)
        let realVal = transformVal.substring(0, transformVal.length - 1)
        // num.toFixed(3)获取的是字符串
        return parseFloat(realVal)
      }
    },
    methods:{

       // 总计
        getTotalPrice(param){
          const {columns ,data}=param;
          const sums = [];
          columns.forEach((column ,index) =>{
            if (index === 0){
              sums[index] = '总计';
              return;
            }
            const values = data.map(item => Number(item[column.property]));
            if (column.property === 'consumePrice') {
              sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                  return prev + curr;
                } else {
                  return prev;
                }
              }, 0);
              sums[index]
            }
            else if (column.property === 'dcPrice') {
              sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                  return prev + curr ;
                } else {
                  return prev;
                }
              }, 0);
              sums[index]
            }
            else {
              sums[index] = '';
            }

          });
          return [sums[0], "","","","", sums[5].toFixed(2), "", sums[7].toFixed(2),""]
        },

        getData(){
            this.get("consume/list",(data)=>{
                this.tableData=data;
            },this.queryParams);
          this.get("consume/getAllGoodsAndRooms",(data)=>{
            this.goodss=data.goodss;
            this.goodsTypes=data.goodsTypes;
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
                    content: EditConsume, //传递的组件对象
                    parent: this,//当前的vue对象
                    data:{id:row.id}//props
                },
                area:['800px','600px'],
                title: '修改消费信息',
                shadeClose: false,
                shade :true
            });
        },
      detail(row){
        this.$layer.iframe({
          content: {
            content: DetailConsume, //传递的组件对象
            parent: this,//当前的vue对象
            data:{id:row.id}//props
          },
          area:['800px','600px'],
          title: '消费信息详情',
          shadeClose: false,
          shade :true
        });
      },
      del(row){
        this.delete("consume/del",row.id,row.active);
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
