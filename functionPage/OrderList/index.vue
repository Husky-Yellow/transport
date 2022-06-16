<template>
  <view>
    <Tab class="tab" :list="list" :active="active" @changeActive="changeActive" />
    <view class="list p-20 p-t-80">
      <ManageCard v-for="(item, index) in orderArr" :key="index" :obj="item">
        <template #funtion>
          <view class="list-item-funtion p-t-20 p-b-20 fz-28">
            <text>操作</text>
            <view>
              <button class="p-l-54 p-r-54 fz-28 m-r-20 primary-button">通过</button>
              <button class="p-l-54 p-r-54 fz-28 close-button">拒绝</button>
            </view>
          </view>
        </template>
      </ManageCard>
    </view>
  </view>
</template>

<script>
import { Tab } from "@/components/Tab";
import { ManageCard } from "@/components/ManageCard";
import { gysOrderCommonOrder } from "@/api";
export default {
  components: {
    Tab,
    ManageCard,
  },
  data: () => ({
      list: ["待审核", "已通过", "已拒绝"],
      active: 0,
      orderArr: [],
      page:1,
      onReachBottomTimer: null,
  }),
  onReachBottom() {
    if (this.onReachBottomTimer !== null) {
      clearTimeout(this.onReachBottomTimer);
    }
    this.page++;
    this.onReachBottomTimer = setTimeout(() => this.getData(), 500);
  },
  onLoad() {
    this.getData();
  },
  methods: {
    getData() {
      const MAP = {
        0:2,
        1:4,
        2:5
      }
      gysOrderCommonOrder({
        type: 1,
        page: this.page,
        num: 10,
        status: MAP[this.active],
      }).then((res) => {
        this.orderArr = [...this.orderArr, ...res.ret.data];
      });
    },
    changeActive(index) {
      this.active = index;
      this.page = 1
      this.orderArr = [];
      this.getData();
    },
  },
};
</script>

<style scoped lang="scss">
.tab{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  height: 80rpx;
  border-top: 1rpx solid $uni-bg-color-border;
}
.list {
  display: flex;
  flex-direction: column;
}
.list-item-funtion {
  @include space-between;
  border-top: 1rpx solid $uni-bg-color-border;
  .item-lable{
    color: $uni-text-color-grey;
  }
  .text-active{
    color: $uni-text-color-active;
  }
  .primary-button,.close-button{
    border-radius: 10rpx;
    height: 64rpx;
    line-height: 64rpx;
  }
  .primary-button{
    background-color: $uni-bg-color-primary;
    color: $uni-text-color-inverse;
  }
  .close-button{
    border: 1rpx solid $uni-bg-color-border;
  }
}
</style>
