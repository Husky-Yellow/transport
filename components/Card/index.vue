<template>
  <view class="list-item m-t-40 p-l-30 p-r-30">
    <view class="list-item-header p-t-20 p-b-20">
      <view>
        <view class="fz-36"
          >01-01 <text class="fz-40 p-l-20 font-weight-medium">11:00-12:00</text>
        </view>
        <view class="fz-28 m-t-16 list-item-header_type"
          >预约类型：<view class="type-text fz-24">修</view>
        </view>
      </view>
      <view class="fz-32">待审核</view>
    </view>
    <view
      v-if="type !== 'maintenance'"
      class="list-item-body p-t-10 p-b-10 fz-28"
    >
      <view class="list-item-body_item p-t-10 p-b-10">
        <text class="item-text">数量</text>
        <text>1000</text>
      </view>
      <view class="list-item-body_item p-t-10 p-b-10">
        <text class="item-text">送货员</text>
        <view>
          <image
            src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
            class="m-r-20 transport-image--round"
            mode="scaleToFill"
          />
          李天明</view
        >
      </view>
      <view class="list-item-body_item p-t-10 p-b-10">
        <text class="item-text">手机号</text>
        <text>123 4567 8901</text>
      </view>
      <view class="list-item-body_item p-t-10 p-b-10">
        <text class="item-text">车牌号</text>
        <text>浙A123456</text>
      </view>
    </view>
    <view
      v-if="type === 'maintenance'"
      class="list-item-body p-t-10 p-b-10 fz-28"
    >
      <view class="list-item-body_item p-t-10 p-b-10">
        <text class="item-text">数量</text>
        <text>1000</text>
      </view>
      <view class="list-item-body_item p-t-10 p-b-10">
        <text class="item-text">返修员</text>
        <text>4</text>
      </view>
      <view class="list-item-body_intro p-t-10 p-b-10 fz-24">
        <view>李天明：1595230668</view>
        <view>李天明：1595230668</view>
        <view>李天明：1595230668</view>
      </view>
    </view>
    <slot name="funtion"> </slot>
    <view class="show-line"></view>
  </view>
</template>

<script>
export default {
  props: {
    // 卡片类型 maintenance ：维修； 其他为空
    type: {
      type: String,
      default: "",
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
        display: inline-block;
        width: 48rpx;
        height: 48rpx;
        color: #f1b350;
        border: 1rpx solid;
        border-radius: 50%;
        text-align: center;
        line-height: 1.6;
      }
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
    background-color: #f1b350;
    height: 30rpx;
    position: absolute;
    top: -14rpx;
    border-radius: 20rpx;
    left: 0;
    width: 100%;
    z-index: -1;
  }
}
</style>
