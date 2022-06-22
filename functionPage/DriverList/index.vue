<template>
  <view class="p-24 p-b-120">
    <view class="list" v-if="peopleList.length !== 0">
      <view
        v-for="(item, index) in peopleList"
        :key="index"
        @click="itemClick(item)"
        class="list-item p-t-26 p-b-24 p-l-30"
      >
        <view>
          <text class="fz-32">{{ item.name }}</text>
          <text class="fz-28 m-l-20">{{ item.tel }}</text>
        </view>
        <view class="plate-number fz-28 m-t-10"
          >车牌号：{{ item.license_plate }}</view
        >
      </view>
    </view>
    <Empty v-if="peopleList.length === 0" />
    <button class="add-button p-t-39 p-b-39 fz-32" @click="goAddDriver">
      <image mode="scaleToFill" class="m-r-10" src="@/static/add@2x.png" />
      添加驾驶员
    </button>
  </view>
</template>


<script>
import { Empty } from "@/components/Empty";
import { gysUserStaffShow } from "@/api";

export default {
  components: {
    Empty,
  },
  data: () => ({
    page: 1,
    peopleList: [],
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
    this.peopleList = [];
    this.page = 1;
    this.getData();
  },
  onPullDownRefresh() {
    this.page = 1;
    this.peopleList = [];
    this.getData();
    uni.stopPullDownRefresh();
  },
  methods: {
    getData() {
      gysUserStaffShow({
        type: 1,
        page: this.page,
        num: 10,
      }).then((res) => {
        this.peopleList = [...this.peopleList, ...res.ret.data];
      });
    },
    goAddDriver() {
      uni.navigateTo({
        url: `/functionPage/AddDriver/index`,
      });
    },
    itemClick(value) {
      uni.setStorageSync('selectDriver',value)
      setTimeout(() => {
        uni.navigateBack({
          delta: 1,
        });
      }, 1500);
    },
  },
};
</script>

<style scoped lang="scss">
.list {
  background-color: $uni-bg-color-white;
  .list-item {
    display: flex;
    flex-direction: column;
    border-bottom: 1rpx solid $uni-bg-color-border;
    .plate-number {
      color: $uni-text-color-grey;
    }
  }
  .list-item:last-child {
    border-bottom: none;
  }
}
.add-button {
  box-shadow: inset 0px 1px 0px 0px rgba(0, 0, 0, 0.1);
  // background-color: $uni-bg-color-primary;
  color: #358fee;
  position: fixed;
  z-index: 1;
  width: 100%;
  bottom: 0;
  left: 0;
  text-align: center;
  image {
    width: 44rpx;
    height: 44rpx;
    vertical-align: middle;
  }
}
</style>