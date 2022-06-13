<template>
  <view class="list-item m-t-46 p-l-30 p-r-30">
    <view class="list-item-header p-t-20 p-b-20">
      <view>
        <view class="fz-36 list-item-header_day">
          <text v-if="caleDate(obj.timestamp) === 'today'" class="fz-22 today p-t-8 p-b-8 p-l-20 p-r-20">今天</text>
          <text v-else-if="caleDate(obj.timestamp) === 'tomorrow'" class="fz-22 tomorrow p-t-8 p-b-8 p-l-20 p-r-20">明天</text>
          <text v-else class="fz-36">{{obj.timestamp && obj.timestamp.length >= 11 ? obj.timestamp.substring(5,11) : obj.timestamp}}</text>
          <text class="fz-40 p-l-20 list-item-header_time">{{obj.time}}</text>
        </view>
        <view class="fz-28 m-t-16 list-item-header_type"
          >预约类型：<view :class="['fz-24 type-text', obj.cardType]">{{
            cardTypeText(obj.cardType)
          }}</view>
        </view>
      </view>
      <view :class="['fz-32', obj.type+'_text']">{{ typeText(obj.type) }}</view>
    </view>
    <view
      v-if="obj.cardType !== 'repair'"
      class="list-item-body p-t-10 p-b-10 fz-28"
    >
      <view class="list-item-body_item p-t-10 p-b-10">
        <text class="item-text">数量</text>
        <text>{{ obj.number }}</text>
      </view>
      <view class="list-item-body_item p-t-10 p-b-10">
        <text class="item-text">送货员</text>
        <view>
          <image
            src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
            class="m-r-20 transport-image--round"
            mode="scaleToFill"
          />
          {{ obj.name }}</view
        >
      </view>
      <view class="list-item-body_item p-t-10 p-b-10">
        <text class="item-text">手机号</text>
        <text>{{ obj.phone }}</text>
      </view>
      <view class="list-item-body_item p-t-10 p-b-10">
        <text class="item-text">车牌号</text>
        <text>{{ obj.card }}</text>
      </view>
    </view>
    <view
      v-if="obj.cardType === 'repair'"
      class="list-item-body p-t-10 p-b-10 fz-28"
    >
      <view class="list-item-body_item p-t-10 p-b-10">
        <text class="item-text">数量</text>
        <text>{{ obj.number }}</text>
      </view>
      <view class="list-item-body_item p-t-10 p-b-10">
        <text class="item-text">返修员</text>
        <text>{{ obj.people }}</text>
      </view>
      <view class="list-item-body_intro p-t-10 p-b-10 fz-24">
        <view v-for="(item, index) in obj.peopleArr" :key="index"
          >{{ item.name }}：{{ item.phone }}</view
        >
      </view>
    </view>
    <slot name="funtion"> </slot>
    <view
      :class="['show-line', obj.type]"
    ></view>
  </view>
</template>

<script>
import { caleDate } from "@/utils";
export default {
  props: {
    obj: {
      type: Object,
      default: () => {
        return {
          timestamp: '',
          cardType: "",
          type: "",
          time: "",
          phone: "",
          card: "",
          peopleArr: [],
          number: 0,
          people: 0,
        };
      },
    },
  },
  methods: {
    caleDate,
    cardTypeText(value) {
      const MAP = {
        repair: "修",
        claimGoods: "取",
        delivery: "送",
      };
      return MAP[value] || "";
    },
    typeText(value) {
      const MAP = {
        pending: "待审核",
        receive: "已接收",
        reject: "已拒收",
      };
      return MAP[value] || "";
    },
  },
};
</script>

<style lang="scss" scoped>
.list-item {
  display: flex;
  flex-direction: column;
  background-color: $uni-bg-color-white;
  border-radius: 20rpx;
  position: relative;
  box-shadow: 0px 3px 4px 0px rgba(0, 0, 0, 0.05);
  .list-item-header,
  .list-item-body > .list-item-body_item {
    @include space-between;
  }
  .list-item-body image {
    width: 48rpx;
    height: 48rpx;
    vertical-align: middle;
  }
  .list-item-header {
    flex-direction: row;
    border-bottom: 1rpx solid $uni-bg-color-border;
    .list-item-header_type {
      display: flex;
      align-items: center;
      .type-text {
        display: inline-flex;
        width: 48rpx;
        height: 48rpx;
        border: 2rpx solid;
        border-radius: 50%;
        align-items: center;
        justify-content: center;
      }
      .claimGoods {
        color: #f1b350;
      }
      .repair {
        color: #f55547;
      }
      .delivery {
        color: #358fee;
      }
    }
    .today,.tomorrow{
      color: $uni-text-color-inverse;
      border-radius: 24rpx;
    }
    .today{
      background-color: #71D5A1;
    }
    .tomorrow{
      background-color: $uni-bg-color-primary;
    }
    .list-item-header_day{
      display: flex;
      align-items: center;
    }
    .list-item-header_time {
      font-weight: bold;
    }
    .pending_text {
      color: $uni-text-color-pending;
    }
    .receive_text {
      color: #71D5A1;
    }
    .reject_text {
      color: #F55547;
    }
  }
  .list-item-body_intro {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    view {
      width: 48%;
      padding-right: 10rpx;
      margin-top: 10rpx;
    }
    view:nth-of-type(odd) {
      border-right: 1rpx solid $uni-bg-color-border;
    }
    view:nth-of-type(even) {
      padding-left: 40rpx;
    }
  }
  .show-line {
    height: 30rpx;
    position: absolute;
    top: -10rpx;
    border-radius: 20rpx;
    left: 0;
    width: 100%;
    z-index: -1;
  }
  .pending {
    background-color: #f1b350;
  }
  .receive {
    background-color: #71d5a1;
  }
  .reject {
    background-color: #F55547;
  }
}
</style>
