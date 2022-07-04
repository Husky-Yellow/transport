<template>
  <view class="p-t-240">
    <view class="header">
      <view class="header-bar">
        <view class="search-form">
          <icon class="icon-small" type="search" size="12"></icon>
          <input
            type="text"
            confirm-type="search"
            placeholder="搜索送货员，取货员，返修员"
            @confirm="searchList"
          />
        </view>
      </view>
     <Tab class="tab" :list="list" :active="active" @changeActive="changeActive" />
      <view class="header-picker p-20 fz-26">
        <view
          :class="[
            'header-picker-time',
            !startTime && !endTime ? 'grey-text' : '',
          ]"
        >
          <picker
            mode="date"
            :value="startTime"
            header-text="开始时间"
            :start="seventDayStartTime"
            :end="active === 0 ? seventDayEndTime : seventDayEightTime"
            @change="changeStartTime"
            @cancel="startTime = null"
          >
            <text>{{ startTime || "所有时间" }}</text>
          </picker>
          <text>~</text>
          <picker
            mode="date"
            :value="endTime"
            header-text="结束时间"
            :start="seventDayStartTime"
            :end="active === 0 ? seventDayEndTime : seventDayEightTime"
            @change="changeEndTime"
            @cancel="endTime = null"
          >
            <text>{{ endTime || "所有时间" }}</text>
          </picker>
          <view class="arrow"></view>
        </view>
        <picker
          :class="['header-picker-type', !!typeIndex ? '' : 'grey-text']"
          @change="bindPickerChange"
          @cancel="typeIndex = null"
          :value="typeIndex"
          :range="typeArr"
        >
          {{ !!typeIndex ? typeArr[typeIndex] : typeArr[0] }}
          <view class="arrow"></view>
        </picker>
      </view>
    </view>

    <view v-if="orderArr.length !== 0" class="list p-20">
      <Card v-for="(item, index) in orderArr" :key="index" :obj="item"/>
    </view>
    <Empty v-if="orderArr.length === 0"/>
  </view>
</template>

<script>
import { Tab } from "@/components/Tab";
import { Card } from "@/components/Card";
import { Empty } from "@/components/Empty";
import { gysOrderCommonOrder } from "@/api";
const selectDayObj = (num = 7) => {
  const date1 = new Date();
  //今天时间
  const startTime =
    date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate();
  const date2 = new Date(date1);
  date2.setDate(date1.getDate() + num);
  //num是正数表示之后的时间，num负数表示之前的时间，0表示今天
  const endTime =
    date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate();
  console.log(endTime);
  return {
    startTime,
    endTime,
  };
};
export default {
  components: {
    Tab,
    Card,
    Empty
  },
  data: () => ({
      list: ["已通过", "已拒绝", "已过期"],
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
          typeArr: ["全部类型", "送货预约", "取货预约", "返修预约"],
    typeIndex: 0,
    startTime: null,
    endTime: null,
        cancelId: null,
    seventDayStartTime: selectDayObj().startTime,
    seventDayEndTime: selectDayObj().endTime,
    seventDayEightTime: selectDayObj(8).endTime,
  }),
  onReachBottom() {
    if (this.onReachBottomTimer !== null) {
      clearTimeout(this.onReachBottomTimer);
    }
    this.page++;
    this.onReachBottomTimer = setTimeout(() => this.getData(), 500);
  },
  onPullDownRefresh() {
    this.page = 1;

    this.getData();
    uni.stopPullDownRefresh()
  },
  onLoad() {
    this.page = 1
    this.getData();
  },
  methods: {
    getData() {
      gysOrderCommonOrder({
        page: this.page,
        num: 10,
        status : this.active === 0 ? 24 : 3,
      }).then((res) => {
        if (this.page === 1) {
          this.orderArr = []
        }
        if (res.ret.data.length === 0) {
          return uni.showToast({
            title: '没有更多数据了',
            icon: 'none',
          })
        }
        this.orderArr = [...this.orderArr,...res.ret.data].map((item) => {
          const status = this.active === 0 ? 'hitsory-0' : item.status
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
            status,
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
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  height: 270rpx;
  background-color: #fff;
  border-top: 1rpx solid $uni-bg-color-border;
  .header-bar {
    display: flex;
    position: relative;
    align-items: center;
    min-height: 80rpx;
    justify-content: space-between;
    .search-form {
      border-radius: 10rpx;
      background-color: #f5f5f5;
      line-height: 64rpx;
      height: 64rpx;
      font-size: 24rpx;
      color: #333;
      flex: 1;
      display: flex;
      align-items: center;
      margin: 0 30rpx;
      .icon-small {
        margin: 30rpx 14rpx 0;
      }
      input {
        flex: 1;
        padding-right: 30rpx;
        height: 64rpx;
        line-height: 64rpx;
        font-size: 26rpx;
        background-color: transparent;
      }
    }
  }
  .tab {
    height: 80rpx;
    border-top: 1rpx solid $uni-bg-color-border;
  }
  .header-picker {
    display: flex;
    justify-content: space-between;
    .header-picker-time,
    .header-picker-type {
      border: 1rpx solid $uni-bg-color-border;
      border-radius: 40rpx;
      display: flex;
      align-content: center;
      padding: 16rpx 24rpx;
      margin: 0 18rpx;
    }
    .header-picker-time {
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      picker {
        width: 40%;
        text-align: center;
      }
      .arrow {
        transform: translateY(-6rpx) translateX(4rpx) rotate(135deg);
      }
    }
    .arrow {
      width: 14rpx;
      height: 14rpx;
      transform: translateY(-8rpx) translateX(4rpx) rotate(135deg);
      margin-left: 10rpx;
      border-top: 2rpx solid;
      border-right: 2rpx solid;
      display: inline-block;
    }
  }
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
