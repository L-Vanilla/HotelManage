import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import GuestType from '@/components/guestType/list'
import Floor from '@/components/floor/list'
import Leaguer from '@/components/leaguer/list'
import User from '@/components/user/list'
import Goods from '@/components/goods/list'
import GoodsType from '@/components/goodsType/list'
import Rooms from '@/components/rooms/list'
import Orderlist from '@/components/orderlist/list'
import OrderManage from '@/components/orderManage/list'
import ReservedTransfer from '@/components/reservedTransfer/list'
import Account from '@/components/account/list'
import Consume from '@/components/consume/list'
import RoomsList from '@/components/orderManage/rooms_list'
import Checkout from '@/components/checkout/list'
import LivedList from '@/components/checkout/livedlist'
import ChangeRoom from '@/components/ChangeRoom/list'
import Financial from '@/components/financial/list'
import ReservationList from '@/components/reservation_list/list'
import LivingList from '@/components/living_list/list'
import Login from '@/components/login'
import leavingList from '@/components/leaving_list/list'
import Charts from '@/components/charts/indexcharts'
import LogManagement from '@/components/logManagement/list'

Vue.use(Router);

const router = new Router({
  mode:'history',
  routes: [
    {
      path:'/',
      name:'login',
      component:Login,
    },
    {
      path:'/index',
      name:'index',
      component:Index,
      children:[
        {
          path:'/index',
          name:'Charts',
          component:Charts
        },
        {
          path:'/guestType',
          name:'guestType',
          component:GuestType
        },
        {
          path:'/floor',
          name:'floor',
          component:Floor
        },
        {
          path:'/leaguer',
          name:'leaguer',
          component:Leaguer
        },
        {
          path:'/user',
          name:'user',
          component:User
        },
        {
          path:'/goodsType',
          name:'goodsType',
          component:GoodsType
        },
        {
          path:'/goods',
          name:'goods',
          component:Goods
        },
        {
          path:'/rooms',
          name:'rooms',
          component:Rooms
        },
        {
          path:'/orderManage',
          name:'orderManage',
          component:OrderManage
        },
        {
          path:'/orderlist',
          name:'orderlist',
          component:Orderlist
        },
        {
          path:'/reservedTransfer',
          name:'reservedTransfer',
          component:ReservedTransfer
        },
        {
          path:'/account',
          name:'account',
          component:Account
        },
        {
          path:'/consume',
          name:'consume',
          component:Consume
        },
        {
          path:'/roomslist',
          name:'roomslist',
          component:RoomsList
        },
        {
          path:'/checkout',
          name:'checkout',
          component:Checkout
        },
        {
          path:'/livedList',
          name:'livedList',
          component:LivedList
        },
        {
          path:'/ChangeRoom',
          name:'ChangeRoom',
          component:ChangeRoom
        },
        {
          path:'/financial',
          name:'financial',
          component:Financial
        },
        {
          path:'/reservation_list',
          name:'reservation_list',
          component:ReservationList
        },
        {
          path:'/living_list',
          name:'living_list',
          component:LivingList
        },
        {
          path:'/leaving_list',
          name:'leaving_list',
          component:leavingList
        },
        {
          path:'/logManagement',
          name:'logManagement',
          component:LogManagement
        }
      ]
    }
  ]
})
export default router;

