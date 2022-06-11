<template>
  <view class="repair p-24">
    <view class="repair-list">
      <scroll-view scroll-y="true" class="p-l-24 p-r-24">
        <view
          v-for="(item, index) in peopleList"
          :key="index"
          class="repair-list-item p-20"
        >
          <view>
            <view class="fz-32">李天明</view>
            <view class="fz-28 grey-text p-t-22">手机号：123 4567 8901</view>
          </view>
          <view>
            <image mode="scaleToFill" src="@/static/edit.png" />
          </view>
        </view>
      </scroll-view>
    </view>
    <button class="add-button p-t-39 p-b-39" @click="goAddRepair">
      + 添加返修员
    </button>
  </view>
</template>

<script>
import { gysUserStaffShow } from "@/api";

export default {
  data: () => ({
    page:1,
    peopleList:[],
    onReachBottomTimer: null,
  }),
  onReachBottom() {
    if (this.onReachBottomTimer !== null) {
      clearTimeout(this.onReachBottomTimer);
    }
    this.page++;
    this.onReachBottomTimer = setTimeout(() => this.getData(), 500);
  },
  onShow() {
    this.getData()
  },
  methods: {
    getData() {
      gysUserStaffShow({
        type:2,
        page:this.page,
        num:10
      }).then(res => {
        console.log(res)
        this.peopleList = [...this.peopleList,...res.ret.data]
      })
    },
    goAddRepair() {
      uni.navigateTo({
        url: "/functionPage/AddRepair/index",
      });
    },
  },
};
</script>

<style scoped lang="scss">
.repair-list {
  background-color: $uni-bg-color-white;
  height: 84vh;
  scroll-view {
    height: 100%;
  }
  border-radius: 8rpx;
  .repair-list-item {
    @include space-between;
    border-bottom: 1rpx solid $uni-bg-color-border;
    image {
      width: 40rpx;
      height: 40rpx;
    }
  }
  .repair-list-item:last-child {
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