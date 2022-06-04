<template>
  <view class="p-24">
    <view class="repair-list">
      <scroll-view
        scroll-y="true"
        class="p-l-24 p-r-24"
      >
        <view v-for="(item,index) in 10" :key="index" class="repair-list-item p-20">
            <view>
                <view class="fz-32">李天明 <text class="p-l-10">123 4567 8901</text></view>
                <view class="fz-28 grey-text p-t-22">车牌号：浙A123456</view>
            </view>
            <view>
                <image mode="scaleToFill" src="https://fp-stage.yangcong345.com/编辑-982240365631d8f7e565395c7094aa56.png"/>
            </view>
        </view>
      </scroll-view>
    </view>
    <button class="add-button p-t-39 p-b-39" @click="goAddDriver">+ 添加驾驶员</button>
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
    goAddDriver(){
      uni.navigateTo({
        url: "/functionPage/AddDriver/index",
      });
    },
  },
  };
</script>

<style scoped lang="scss">

.repair-list{
    background-color: $uni-bg-color-white;
    height: 84vh;
    scroll-view{
        height: 100%;
    }
    border-radius: 8rpx;
    .repair-list-item {
        @include space-between;
        border-bottom: 1rpx solid $uni-bg-color-border;
        image{
            width: 70rpx;
            height: 70rpx;
        }
    }
	.repair-list-item:last-child  {
      border-bottom: none;
  }
}
.add-button {
  background-color: $uni-bg-color-primary;
  color: $uni-text-color-inverse;
  position: fixed;
  z-index: 1;
  width: 100%;
  bottom: 0;
  left: 0;
  text-align: center;
}
</style>