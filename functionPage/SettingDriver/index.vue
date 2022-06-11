<template>
  <view class="p-24 p-b-140">
    <view class="repair-list p-l-24 p-r-24">
      <view
        v-for="(item, index) in peopleList"
        :key="index"
        class="repair-list-item p-20"
      >
        <view>
          <view class="fz-32"
            >{{item.name}} <text class="p-l-10">{{item.tel}}</text></view
          >
          <view class="fz-28 grey-text p-t-22">车牌号：{{item.license_plate}}</view>
        </view>
        <view>
          <image mode="scaleToFill" src="@/static/edit.png" @click="goAddDriver(item)"/>
        </view>
      </view>
    </view>
    <button class="add-button p-t-39 p-b-39" @click="goAddDriver">
      + 添加驾驶员
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
    this.peopleList = []
    this.getData()
  },
  methods: {
    getData() {
      gysUserStaffShow({
        type: 1,
        page: this.page,
        num: 10
      }).then(res => {
        console.log(res)
        this.peopleList = [...this.peopleList,...res.ret.data]
      })
    },
    goAddDriver(item) {
      const { id = '', tel = '', name = '', license_plate = ''} = item
      uni.navigateTo({
        url: `/functionPage/AddDriver/index?id=${id}&tel=${tel}&name=${name}&license_plate=${license_plate}`,
      });
    },
  },
};
</script>

<style scoped lang="scss">
.repair-list {
  background-color: $uni-bg-color-white;
  // min-height: 84vh;
  // height: auto;
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