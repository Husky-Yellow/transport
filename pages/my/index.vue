<template>
  <view class="page-body">
    <view class="page-body_header p-20">
      <image
        src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
        class="ransport-image transport-image--round"
        mode="scaleToFill"
      />
      <view>我的</view>
    </view>
    <view class="page-body_function m-t-20 p-20">
      <view>设置货车驾驶员</view>
      <view>设置返修人员</view>
    </view>
  </view>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.page-body {
  border-top: 1rpx solid $uni-bg-color-border;
  display: flex;
  flex-direction: column;
  .page-body_header {
      display: flex;
      flex-direction: column;
    align-items: center;
    background-color: #fff;
    justify-content: space-between;
    image {
      width: 220rpx;
      height: 220rpx;
    }
  }
  .page-body_function{

  }
}
</style>
