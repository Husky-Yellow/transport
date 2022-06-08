<template>
  <view>
    <NoticeBar>
      <view>
        <text class="m-l-30">修改时间</text>
        <text class="m-l-30">2021-03-01</text>
      </view>
    </NoticeBar>
    <view class="time-list fz-28 p-b-100">
        <view v-for="(item,index) in TIMEARR" :key="index" class="m-20 p-t-30 p-b-30 p-l-90 p-r-90">{{item}}</view>
    </view>
    <view class="fix-view p-10 p-l-12 p-r-12">
      <view>
        <text class="fz-28">已选人数：</text>
        <text class="fz-36 red-text">1</text>
      </view>
      <button class="fz-28 p-t-26 p-b-26 p-l-80 p-r-80">确定</button>
    </view>
  </view>
</template>

<script>
import NoticeBar from "@/components/NoticeBar";

const TIMEARR = [
  "00:00-01:00",
  "01:00-02:00",
  "02:00-03:00",
  "03:00-04:00",
  "04:00-05:00",
  "05:00-06:00",
  "06:00-07:00",
  "07:00-08:00",
  "08:00-09:00",
  "09:00-10:00",
  "10:00-11:00",
  "11:00-12:00",
  "12:00-13:00",
  "13:00-14:00",
  '14:00-15:00',
  "15:00-16:00",
  "16:00-17:00",
  "17:00-18:00",
];
export default {
    components: {
    NoticeBar,
  },
  data() {
        return {
        TIMEARR: TIMEARR,
        };
    },
};
</script>

<style scoped lang="scss">
.time-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    text-align: center;
    view {
      width: 45%;
      border: 1rpx solid $uni-border-color-time;
      border-radius: 8rpx;
    }
  }
.fix-view {
  background-color: $uni-bg-color-white;
  position: fixed;
  z-index: 1;
  width: 100vw;
  bottom: 0;
  left: 0;
  text-align: center;
  @include space-between;
  view {
    display: flex;
    align-items: center;
    .red-text {
      color: #f55547;
    }
  }
  button {
    background-color: $uni-bg-color-primary;
    color: $uni-text-color-inverse;
    border-radius: 50rpx;
  }
}
</style>