<style scoped>
  h2{
    padding: 30px;
    font-size: 18px;
  }
  #chart_example1{
    width: 650px;
    height: 400px;
    background-color: #ffffff;
    padding-top: 10px;
  }
  #chart_example2{
    width: 570px;
    height: 400px;
    background-color: #ffffff;
    padding-top: 10px;
  }
  #chart_example3{
       width: 800px;
       height: 400px;
       background-color: #ffffff;
       padding-top: 10px;
     }
  #chart_example4{
    width: 600px;
    height: 400px;
    background-color: #ffffff;
    padding-top: 10px;
  }

</style>

<template>
  <div>
    <div style="display:inline-block;margin-top: 10px">
      <div id="chart_example3" style="display:inline-block;"></div>
      <div style="display:inline-block;background-color: #fff;margin-top:0px;padding: 10px;width: 400px;height: 400px;overflow-y: auto">
        <el-select v-model="search.roomTypeid" filterable placeholder="请选择类型信息" style="width: 200px"  @change="findData">
          <el-option label="" value="">全部</el-option>
          <el-option
            v-for="item in guestTypes"
            :key="item.id"
            :label="item.typeName"
            :value="item.id">
          </el-option>
        </el-select>
        <el-table
          :data="tableData"
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
        </el-table>
      </div>
    </div>
    <div style="display:inline-block;margin-top: 10px">
      <div id="chart_example1" style="display:inline-block;"></div>
      <div id="chart_example2" style="display:inline-block;margin-left: 5px;"></div>
    </div>
    <div id="chart_example4" style="margin-top: 5px;"></div>

  </div>
</template>


<script>
  import echarts from 'echarts';
  export default {
    data () {
      return {
        search:{
          roomTypeid:"",
          status:0
        },
        tableData:{},
        guestTypes:{}
      }
    },
    mounted() {},
    watch: {
      search:{
        handler:function(){
          this.getData();
        },
        deep:true
      }
    },
    created(){
      this.getData();
    },
    methods:{
      findData(){
        this.getData();
      },
      getData(){
        //房间信息
        this.get("rooms/getAll",(data)=>{
          this.tableData=data;
        },this.search);
        this.get("rooms/getUsefulAllGuestType",(data)=>{
          this.guestTypes=data;
        });
        //统计图
        this.get("orderManage/findDataForStatistics",(data)=>{
          let i=0;
          console.log(data);


          const month=[],datam=[];
          for( i ; i<data.findGroupByRTN.length;i++){
            month.push(data.findGroupByRTN[i].rooms_type_name);
            datam.push(data.findGroupByRTN[i].count)
          }

          const xdata2=[],ydata2=[];
          for( i=0 ; i<data.findWeekBynNum.length;i++){
            ydata2.push(data.findWeekBynNum[i].count);
            let date = new Date(data.findWeekBynNum[i].date);
            let Y = date.getFullYear() + '-';
            let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            let D = date.getDate() + ' ';
            xdata2.push(Y+M+D)
          }

          const xdata3=[],ydata3_1=[],ydata3_2=[],dataTypeOfStatus=["已预订/入住","空房"];
          for( i=0 ; i<data.findRoomType.length;i++){
            for(let j=0;j<data.findTypeNumAll.length;j++){
              if(data.findTypeNumAll[j].room_typeid==data.findRoomType[i].id){
                xdata3.push(data.findRoomType[i].type_name);
              }
            }
          }
          //补上类型名
          for( i=0 ; i<data.findTypeNumAll.length;i++){
              ydata3_2[i]=data.findTypeNumAll[i].count;
              ydata3_1[i]=0;
          }
          //MapReduce分组求和归并
          for( i=0 ; i<data.findTypeNumAll.length;i++){
            for(let j=0;j<data.findTypeNumTrue.length;j++){
              if(data.findTypeNumAll[i].room_typeid==data.findTypeNumTrue[j].room_typeid){
                ydata3_1[i]=data.findTypeNumTrue[j].count;
                ydata3_2[i]=data.findTypeNumAll[i].count-ydata3_1[i];
              }
            }
          }
          //消除0数据显示
          for( i=0 ; i<data.findTypeNumAll.length;i++){
            if(ydata3_2[i]==0){ydata3_2[i]=null;}
            if(ydata3_1[i]==0){ydata3_1[i]=null;}
          }

          const dataConsume=[];
          for( i=0 ; i<data.findGuestBill.length;i++){
            dataConsume.push([data.findGuestBill[i].create_date/86400000,data.findGuestBill[i].total_bill]);
          }
          // const dataConsume=[];
          // for( i=0 ; i<100;i++){
          //   dataConsume.push([i,i*i]);
          // }

          let myChart1 = echarts.init(document.getElementById('chart_example1'));
          let myChart2 = echarts.init(document.getElementById('chart_example2'));
          let myChart3 = echarts.init(document.getElementById('chart_example3'));
          let myChart4 = echarts.init(document.getElementById('chart_example4'));


          let option1 = {
            title: {
              text: '房间类型的热度',      //主标题
              textStyle:{
                color:'#009688',        //颜色
                fontStyle:'normal',     //风格
                fontWeight:'normal',    //粗细
                fontFamily:'Microsoft yahei',   //字体
                fontSize:20,     //大小
              },
              left:'center'
            },
            color: ['#f44'],
            tooltip : {
              trigger: 'axis',
              axisPointer : {
                type : 'shadow'
              }
            },
            xAxis : [
              {
                type : 'category',
                data : month,
                name:'房间类型',
                axisTick: {
                  alignWithLabel: true
                }
              }
            ],
            yAxis : [
              {
                name:'订购次数',
                type : 'value'
              }
            ],
            series : [
              {
                name:'订单数量',
                type:'bar',
                barWidth: '4%',
                data:datam,
                label: {
                  normal: {
                    fontSize:20,
                    show: true,
                  }
                },
              }
            ]
          };


          let option2 = {
            title: {
              text: '最近一周的订单数量',      //主标题
              textStyle:{
                color:'#009688',        //颜色
                fontStyle:'normal',     //风格
                fontWeight:'normal',    //粗细
                fontFamily:'Microsoft yahei',   //字体
                fontSize:20,     //大小

              },
              left:'center'
            },
            xAxis: {
              type: 'category',
              data: xdata2,
               name:'时间',
            },
            yAxis: {
              type: 'value',
              name:'订单数量',
            },
            series: [{
              data: ydata2,
              type: 'line',
              smooth: true
            }]
          };

          let option3 = {
            tooltip : {
              trigger: 'axis',
              axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            legend: {
              data: dataTypeOfStatus
            },
            grid: {
              left: '3%',
              right: '10%',
              bottom: '10%',
              containLabel: true
            },
            xAxis:  {
              name:'房间数量',
              type: 'value'
            },
            yAxis: {
              name:'房间类型',
              type: 'category',
              data: xdata3
            },
            series: [
              {
                name: '已预订/入住',
                type: 'bar',
                barWidth: '40%',
                stack: '总数',
                label: {
                  normal: {
                    fontSize:20,
                    show: true,
                  }
                },
                data: ydata3_1
              },
              {
                name: '空房',
                type: 'bar',
                stack: '总数',
                label: {
                  normal: {
                    fontSize:20,
                    show: true,
                  }
                },
                data: ydata3_2
              }
            ]
          };

          let option4 = {
            title: {
              text: '会员消费水平',
              left: 'center',
              fontStyle:'normal',     //风格
              fontWeight:'normal',    //粗细
              fontFamily:'Microsoft yahei',   //字体
              fontSize:20,     //大小
            },
            visualMap: {
              min: 1,
              max: 3000,
              dimension: 1,
              orient: 'vertical',
              right: 10,
              top: 'center',
              text: ['HIGH', 'LOW'],
              calculable: true,
              inRange: {
                color: ['#f2c31a', '#24b7f2']
              }
            },
            tooltip: {
              trigger: 'item',
              axisPointer: {
                type: 'cross'
              }
            },
            xAxis: [{
              name:'时间戳',
              type: 'value'
            }],
            yAxis: [{
              name:'入住一次的消费情况',
              type: 'value'
            }],
            series: [{
              name: 'price-area',
              type: 'scatter',
              symbolSize: 5,
              itemStyle: {
                  normal: {
                      borderWidth: 0.2,
                      borderColor: '#fff'
                  }
              },
              data: dataConsume
            }]
          };

          myChart1.setOption(option1);
          window.addEventListener('resize',function() {myChart1.resize()});
          myChart2.setOption(option2);
          window.addEventListener('resize',function() {myChart2.resize()});
          myChart3.setOption(option3);
          window.addEventListener('resize',function() {myChart3.resize()});
          myChart4.setOption(option4);
          window.addEventListener('resize',function() {myChart4.resize()});
        });
      }
    }
  }
</script>
<style>
  .el-table .cell {
    text-align: center;
  }
</style>

