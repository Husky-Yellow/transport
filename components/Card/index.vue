<template>
  <view class="list-item box-shadow m-t-20 p-l-30 p-r-30">
    <view class="list-item-header p-t-20 p-b-20">
      <view>
        <view>01-01 11:00-12:00</view>
        <view>预约类型：修</view>
      </view>
      <view>待审核</view>
    </view>
    <view v-if="type !== 'maintenance'" class="list-item-body p-t-10 p-b-10">
      <view class="list-item-body_item p-t-10 p-b-10">
        <text class="item-text">数量</text>
        <text>1000</text>
      </view>
      <view class="list-item-body_item p-t-10 p-b-10">
        <text class="item-text">送货员</text>
        <text>1000</text>
      </view>
      <view class="list-item-body_item p-t-10 p-b-10">
        <text class="item-text">手机号</text>
        <text>1000</text>
      </view>
      <view class="list-item-body_item p-t-10 p-b-10">
        <text class="item-text">车牌号</text>
        <text>1000</text>
      </view>
    <view v-if="type === 'maintenance'" class="list-item-body p-t-10 p-b-10">
      <view class="list-item-body_item p-t-10 p-b-10">
        <text class="item-text">数量</text>
        <text>1000</text>
      </view>
      <view class="list-item-body_item p-t-10 p-b-10">
        <text class="item-text">返修员</text>
        <text>4</text>
      </view>
      <view class="list-item-body_intro p-t-10 p-b-10 fz-28">
        <view>李天明：1595230668</view>
        <view>李天明：1595230668</view>
        <view>李天明：1595230668</view>
      </view>
    </view>
    </view>
    <view class="list-item-funtion p-t-20 p-b-20">
      <text>操作</text>
      <slot name='button'> <button>撤回</button></slot>
    </view>
    <view class="show-line"></view>
  </view>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: '',
    },
  },};
</script>

<style lang="scss" scoped>
.list-item {
    display: flex;
    flex-direction: column;
    background-color: $uni-bg-color-white;
    border-radius: 20rpx;
    position: relative;
    .list-item-header,
    .list-item-funtion,
    .list-item-body > .list-item-body_item {
    @include space-between;
    }
    .list-item-header {
        flex-direction: row;
        border-bottom: 1rpx solid $uni-bg-color-border;
    }
    .list-item-funtion {
        border-top: 1rpx solid $uni-bg-color-border;
        button {
            padding: 20rpx 60rpx;
            border-radius: 8rpx;
        }
    }
     .list-item-body_intro {
       display: flex;
       flex-direction: row;
       flex-wrap: wrap;
       view{
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
    .show-line{
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
