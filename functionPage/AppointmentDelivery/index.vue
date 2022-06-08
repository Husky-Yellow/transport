<template>
  <view class="p-t-2">
    <DataSelect />
    <view class="add-view p-24">
      <view class="add-form p-20 fz-28">
        <view class="add-form-time">
          <view
            v-for="(item, index) in TIMEARR"
            :key="index"
            class="p-t-24 p-b-24 m-20"
            >{{ item }}</view
          >
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
        <view v-if="type !== 'repair'" class="form-view-item p-22">
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
              @click="goDriverList"
            />
          </view>
        </view>
        <view v-if="type !== 'repair'" class="form-view-item p-22">
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
        <view v-if="type !== 'repair'" class="form-view-item p-22">
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
        <view v-if="type === 'repair'" class="form-view-item p-22">
          <view>
            <image
              mode="scaleToFill"
              class="m-r-10"
              src="@/static/plateNumber.png"
            />
            返修员
          </view>
          <view>
            <text></text>
            <view class="add-button-icon" @click="goRepairList" />
          </view>
        </view>
        <view class="list-item-body_intro p-t-10 p-b-10 fz-24">
          <view>李天明：1595230668</view>
          <view>李天明：1595230668</view>
          <view>李天明：1595230668</view>
        </view>
      </view>
      <button class="p-28 m-t-30">确定</button>
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
const TIMEARR = [
  "09:00-10:00",
  "10:00-11:00",
  "11:00-12:00",
  "13:00-14:00",
  "14:00-15:00",
  "15:00-16:00",
  "17:00-18:00",
];
export default {
  components: {
    DataSelect,
  },
  data() {
    return {
      TIMEARR: TIMEARR,
      type: "",
    };
  },
  onLoad(e) {
    this.type = e.type;
    uni.setNavigationBarTitle({
      title: TITLEMAP[e.type] || "预约",
    });
  },
  methods: {
    goDriverList() {
      uni.navigateTo({
        url: `/functionPage/DriverList/index?type=${this.type}`,
      });
    },
    goRepairList() {
      uni.navigateTo({
        url: `/functionPage/RepairList/index?type=${this.type}`,
      });
    },
  },
};
</script>

<style scoped lang="scss">
.add-form {
  border-radius: 8rpx;
  height: auto;
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
    view {
      display: flex;
      align-items: center;
    }
  }
  .form-view-item:last-child {
    border-bottom: none;
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
}
button {
  background-color: $uni-bg-color-primary;
  color: $uni-text-color-inverse;
  width: 100%;
  text-align: center;
}

.add-button-icon {
  display: inline-block;
  width: 60rpx;
  height: 60rpx;
  color: #ccc;
  border: 1rpx solid $uni-bg-color-primary;
  border-radius: 50%;
  transition: color 0.25s;
  position: relative;
  overflow: hidden;
}
.add-button-icon::before,
.add-button-icon::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
}
.add-button-icon::before {
  width: 40rpx;
  border-top: 2rpx solid $uni-bg-color-primary;
  margin: -4rpx 0 0 -22rpx;
}
.add-button-icon::after {
  height: 40rpx;
  border-left: 2rpx solid $uni-bg-color-primary;
  margin: -20rpx 0 0 -4rpx;
}
</style>
