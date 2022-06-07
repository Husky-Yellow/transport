<template>
  <view class="page">
      <DataSelect />
      <view class="add-view p-24">
          <view class="add-form p-20">
              <view class="add-form-time fz-28">
                  <view class="p-t-24 p-b-24 m-20">09:00-10:00</view>
                  <view class="p-t-24 p-b-24 m-20">10:00-11:00</view>
                  <view class="p-t-24 p-b-24 m-20">11:00-12:00</view>
                  <view class="p-t-24 p-b-24 m-20">13:00-14:00</view>
                  <view class="p-t-24 p-b-24 m-20">14:00-15:00</view>
                  <view class="p-t-24 p-b-24 m-20">15:00-16:00</view>
              </view>
              <view></view>
              <view></view>
              <view></view>
              <view></view>
          </view>
          <button class="p-28 m-t-80">确定</button>
      </view>
  </view>
</template>

<script>
import DataSelect from "@/components/DataSelect";
const TITLEMAP = {
    'delivery':'预约送货',
    'claimGoods':'预约取货',
    'repair':'预约返修',
}
export default {
components: {
    DataSelect
  },
  data() {
    return {
        id:''
    };
  },
  onLoad(e) {
        this.id = e.type
        uni.setNavigationBarTitle({
            title:TITLEMAP[e.type] || '预约'
        })
  },
  methods: {
  },
};
</script>

<style scoped lang="scss">
.page{
    border-top: 1rpx solid $uni-border-color-white;
}
.add-form{
    border-radius: 8rpx;
    height: 800rpx;
    background-color: $uni-bg-color-white;
    .add-form-time{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        text-align: center;
        view{
            width: 44%;
            border: 1rpx solid $uni-border-color-time;
            border-radius: 8rpx;
        }
    }
}
button{
    background-color: $uni-bg-color-primary;
    color: $uni-text-color-inverse;
    width: 100%;
    text-align: center;
}
</style>
