<template>
  <view class="p-24">
    <view class="list">
      <view
        v-for="(item, index) in 100"
        :key="index"
        class="list-item p-t-26 p-b-24 p-l-30 p-r-30"
      >
        <view>
          <view>
            <text class="fz-32">李天明</text>
            <text class="fz-28 m-l-20">123 4567 8901</text>
          </view>
          <view class="plate-number fz-28 m-t-10">车牌号：浙A123456</view>
        </view>
        <label class="checkbox">
          <checkbox value="cb" checked="true" />
        </label>
      </view>
    </view>
    <view class="fix-view p-10 p-l-12 p-r-12">
        <view>
            <text class="fz-28">已选人数：</text> <text class="fz-36 red-text">1</text>
        </view>
        <button class="fz-28 p-t-26 p-b-26 p-l-80 p-r-80">确定</button>
    </view>
  </view>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.list {
  background-color: #fff;
  min-height: 96vh;
  height: auto;
  .list-item {
    @include space-between;
    border-bottom: 1rpx solid $uni-bg-color-border;
    .plate-number {
      color: $uni-text-color-grey;
    }
  }
  .list-item:last-child {
    border-bottom: none;
  }
}
.fix-view{
    background-color: $uni-bg-color-white;
      position: fixed;
  z-index: 1;
  width: 100vw;
  bottom: 0;
  left: 0;
  text-align: center;
  @include space-between;
  view{
      display: flex;
      align-items: center;
      .red-text{
          color: #F55547;
      }
  }
  button{
      background-color: $uni-bg-color-primary;
      color: $uni-text-color-inverse;
      border-radius: 50rpx;
  }
}
</style>