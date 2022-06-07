<template>
  <view class="page-body">
    <view class="page-body_header p-t-42 p-b-46">
      <image
        src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
        class="ransport-image transport-image--round"
        mode="scaleToFill"
      />
      <view class="m-t-28">我的</view>
    </view>
    <view class="page-body_function m-t-20 fz-32 p-l-40 p-r-40">
      <view class="p-b-30 p-t-30" @click="goSettingDriver()">设置货车驾驶员
        <view class="arrow right"></view>
      </view>
      <view class="p-b-30 p-t-30" @click="goSettingRepair()">设置返修人员
        <view class="arrow right"></view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  onLoad() {
  },
  methods: {
    goSettingDriver(){
      uni.navigateTo({
        url: "/functionPage/SettingDriver/index",
      });
    },
    goSettingRepair(){
      uni.navigateTo({
        url: "/functionPage/SettingRepair/index",
      });
    },
  },
  };
</script>

<style scoped lang="scss">
.page-body {
  border-top: 1rpx solid $uni-bg-color-border;
  display: flex;
  flex-direction: column;
  .page-body_header {
    @include space-between;
    flex-direction: column;
    background-color: $uni-bg-color-white;
    image {
      width: 160rpx;
      height: 160rpx;
    }
  }
  .page-body_function {
    background-color: $uni-bg-color-white;
    view {
      @include space-between;
      border-bottom: 1rpx solid $uni-bg-color-border;
    }
	  view:last-child  {
      border-bottom: none;
    }
    .arrow{
      border-top:2rpx solid #999;
      border-right:2rpx solid #999;
    }
  }
}
</style>
