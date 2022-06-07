<template>
  <view class="p-t-2">
    <DataSelect/>
    <view class="add-view p-24">
      <view class="add-form p-20 fz-28">
        <view class="add-form-time">
          <view class="p-t-24 p-b-24 m-20">09:00-10:00</view>
          <view class="p-t-24 p-b-24 m-20">10:00-11:00</view>
          <view class="p-t-24 p-b-24 m-20">11:00-12:00</view>
          <view class="p-t-24 p-b-24 m-20">13:00-14:00</view>
          <view class="p-t-24 p-b-24 m-20">14:00-15:00</view>
          <view class="p-t-24 p-b-24 m-20">15:00-16:00</view>
        </view>
        <view class="form-view-item p-22">
          <view>
            <image
              mode="scaleToFill"
              class="m-r-10"
              src="@/static/number.png"
            />
            数量
          </view>
          <input type="text" placeholder="请输入送货数量" />
        </view>
        <view class="form-view-item p-22">
          <view>
            <image
              mode="scaleToFill"
              class="m-r-10"
              src="@/static/people.png"
            />
            送货员
          </view>
          <view>
            <input type="text" placeholder="请输入姓名" />
            <image
                mode="scaleToFill"
                class="m-l-20"
                src="@/static/avatar.png"
                />
          </view>
        </view>
        <view class="form-view-item p-22">
          <view>
            <image
              mode="scaleToFill"
              class="m-r-10"
              src="@/static/iphone.png"
            />
            手机号
          </view>
          <input type="text" placeholder="请输入手机号" />
        </view>
        <view class="form-view-item p-22">
          <view>
            <image
              mode="scaleToFill"
              class="m-r-10"
              src="@/static/plateNumber.png"
            />
            车牌号
          </view>
          <input type="text" placeholder="请输入车牌号" />
        </view>
      </view>
      <button class="p-28 m-t-80">确定</button>
    </view>
  </view>
</template>

<script>
import DataSelect from "@/components/DataSelect";
const TITLEMAP = {
  delivery: "预约送货",
  claimGoods: "预约取货",
  repair: "预约返修",
};
export default {
  components: {
    DataSelect,
  },
  data() {
    return {
      id: "",
    };
  },
  onLoad(e) {
    this.id = e.type;
    uni.setNavigationBarTitle({
      title: TITLEMAP[e.type] || "预约",
    });
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.add-form {
  border-radius: 8rpx;
  height: 800rpx;
  background-color: $uni-bg-color-white;
  .add-form-time {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    text-align: center;
    view {
      width: 44%;
      border: 1rpx solid $uni-border-color-time;
      border-radius: 8rpx;
    }
  }
  .form-view-item {
    @include space-between;
    border-bottom: 1rpx solid $uni-bg-color-border;
    image {
      width: 44rpx;
      height: 44rpx;
      vertical-align: middle;
    }
    input {
      text-align: right;
    }
    view{
        display: flex;
        align-items: center;
    }
  }
}
button {
  background-color: $uni-bg-color-primary;
  color: $uni-text-color-inverse;
  width: 100%;
  text-align: center;
}
</style>
