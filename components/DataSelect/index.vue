<template>
  <view class="data-select">
    <view>
      <view class="arrow left" @click="selectDay = selectDay - 1" />
    </view>
    <view class="data-select-scroll fz-28">
      <scroll-view
        :scroll-x="true"
        scroll-with-animation
        :scroll-into-view="'u_' + selectDay"
        style="white-space: nowrap"
      >
        <view
          :class="[
            'scroll-view-item',
            index === selectDay ? 'calendar-weekday-active' : '',
          ]"
          v-for="(item, index) in monthArray"
          :key="index"
          :id="'u_' + index"
          @click="selectDate(item, index)"
        >
          <view>
            {{ item.week }}
          </view>
          <view> {{ item.month }}.{{ item.day }} </view>
        </view>
      </scroll-view>
    </view>
    <view><view class="arrow right" @click="selectDay = selectDay + 1" /></view>
  </view>
</template>

<script>
import { getForMonth } from "@/utils";
export default {
  data() {
    return {
      monthArray: getForMonth().dateList,
      selectDay: getForMonth().todayIndex,
    };
  },
  methods: {
    selectDate(item, index) {
      this.selectDay = index
    },
  },
};
</script>

<style scoped lang="scss">
.data-select {
  width: 100%;
  background-color: $uni-bg-color-white;
  height: 120rpx;
  padding: 0 30rpx;
  @include space-between;
  .data-select-scroll {
    display: inline-block;
    display: flex;
    width: 96%;
    height: 100rpx;
    padding: 0 20rpx;
    .scroll-view-item {
      display: inline-flex;
      width: 100rpx;
      padding: 8rpx;
      border: 1rpx solid $uni-bg-color-border;
      border-radius: 10rpx;
      margin: 0 6rpx;
      flex-direction: column;
      align-items: center;
    }
  }
}
.calendar-weekday-active {
  background-color: $uni-color-active;
  color: $uni-text-color-inverse;
}
</style>