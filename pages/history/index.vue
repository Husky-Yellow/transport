<template>
  <view class="p-t-240">
    <view class="header">
      <view class="header-bar">
        <view class="search-form">
          <icon class="icon-small" type="search" size="12"></icon>
          <input
            type="text"
            confirm-type="search"
            v-model="name"
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
            !time_s && !time_e ? 'grey-text' : '',
          ]"
        >
          <picker
            mode="date"
            :value="time_s"
            header-text="开始时间"
            :start="seventDayStartTime"
            :end="seventDayEndTime"
            @change="changeStartTime"
            @cancel="time_s = null"
          >
            <text>{{ time_s || "所有时间" }}</text>
          </picker>
          <text>~</text>
          <picker
            mode="date"
            :value="time_e"
            header-text="结束时间"
            :start="seventDayStartTime"
            :end="seventDayEndTime"
            @change="changeEndTime"
            @cancel="time_e = null"
          >
            <text>{{ time_e || "所有时间" }}</text>
          </picker>
          <view class="arrow"></view>
        </view>
        <picker
          :class="['header-picker-type', !!select_type ? '' : 'grey-text']"
          @change="bindPickerChange"
          @cancel="select_type = null"
          :value="select_type"
          :range="typeArr"
        >
          {{ !!select_type ? typeArr[select_type] : typeArr[0] }}
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
import { selectDayObj } from "@/utils";

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
      select_type: 0, // 0是全部,1预约2取货3维修
      time_s: null,
      time_e: null,
      name: null,
      seventDayStartTime: selectDayObj().startTime,
      seventDayEndTime: selectDayObj().endTime,
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
    searchList() {
      this.page = 1
      this.getData();
    },
    bindPickerChange(e) {
      this.select_type = e.detail.value;
      this.searchList();
    },
    changeStartTime(e) {
      this.time_s = e.detail.value;
      this.searchList();
    },
    changeEndTime(e) {
      this.time_e = e.detail.value;
      this.searchList();
    },
    getData() {
      const statusMAP = {
        0:24,
        1:3,
        2:9
      }
      const status = statusMAP[this.active]
      gysOrderCommonOrder({
        page: this.page,
        num: 10,
        status,
        select_type: this.select_type,
        time_s: this.time_s,
        time_e: this.time_e,
        name: this.name
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
      this.select_type = 0,
      this.time_s = null,
      this.time_e = null,
      this.name = null,
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
