<template>
  <view>
    <Tab class="tab" :list="list" :active="active" @changeActive="changeActive" />
    <view class="list p-20 p-t-80">
      <Card v-for="(item, index) in orderArr" :key="index" :obj="item"/>
    </view>
  </view>
</template>

<script>
import { Tab } from "@/components/Tab";
import { Card } from "@/components/Card";
import { warehouseOrderCommonOrder } from "@/api";
export default {
  components: {
    Tab,
    Card,
  },
  data: () => ({
      list: ["已通过", "已拒绝"],
      active: 0,
      orderArr: [
        {
          time:'11:00-12:00',
          type:'receive',
          cardType:'repair',
          number: 1000,
          people: '4',
          peopleArr:[{
            name:'李天明',
            phone:'12345678901'
          },{
            name:'李天明',
            phone:'12345678901'
          },{
            name:'李天明',
            phone:'12345678901'
          },{
            name:'李天明',
            phone:'12345678901'
          }]
        },
        {
          time:'11:00-12:00',
          type:'receive',
          cardType: 'delivery',
          number: 1000,
          name: '李天明',
          phone: '123 4567 8901',
          card: '浙A123456'
        },
        {
          time:'11:00-12:00',
          type:'receive',
          cardType: 'claimGoods',
          number: 1000,
          name: '李天明',
          phone: '123 4567 8901',
          card: '浙A123456'
        },
      ],
      page: 1,
      onReachBottomTimer: null,
  }),
  onReachBottom() {
    if (this.onReachBottomTimer !== null) {
      clearTimeout(this.onReachBottomTimer);
    }
    this.page++;
    this.onReachBottomTimer = setTimeout(() => this.getData(), 500);
  },
  onLoad() {
    this.orderArr = []
    this.page = 1
    this.getData();
  },
  methods: {
    getData() {
      warehouseOrderCommonOrder({
        page: this.page,
        num: 10,
        status : this.active === 0 ? 2 : 3,
      }).then((res) => {
        if (res.ret.data.length === 0) {
          return uni.showToast({
            title: '没有更多数据了',
            icon: 'none',
          })
        }
        this.orderArr = [...this.orderArr,...res.ret.data].map((item) => {
          return Object.freeze({
            date: item.date,
            type: item.type,
            time: item.time,
            personnel: item.personnel || [
              { name: "--", tel: "--", license_plate: "--" },
            ],
            num: item.num,
            s_time: item.s_time,
            e_time: item.e_time,
            status: item.status,
          });
        });
      });
    },
    changeActive(index) {
      this.active = index;
      this.page = 1
      this.orderArr = []
      this.getData()
    },
  },
};
</script>

<style scoped lang="scss">
.tab{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  height: 80rpx;
  border-top: 1rpx solid $uni-bg-color-border;
}
.list {
  display: flex;
  flex-direction: column;
}
.list-item-funtion {
  @include space-between;
  border-top: 1rpx solid $uni-bg-color-border;
  .item-lable{
    color: $uni-text-color-grey;
  }
  .text-active{
    color: $uni-text-color-active;
  }
}
</style>
