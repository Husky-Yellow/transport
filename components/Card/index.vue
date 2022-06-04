<template>
  <view class="list-item box-shadow m-t-20 p-l-20 p-r-20">
    <view class="list-item-header p-t-20 p-b-20">
      <view>
        <view>01-01 11:00-12:00</view>
        <view>预约类型：修</view>
      </view>
      <view>待审核</view>
    </view>
    <view class="list-item-body p-t-10 p-b-10">
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
    </view>
    <view class="list-item-funtion p-t-20 p-b-20">
      <text>操作</text>
      <button>撤回</button>
    </view>
    <view class="show-line"></view>
  </view>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@mixin space-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
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
