<template>
  <view class="page">
    <Tab :list="list" :active="active" @changeActive="changeActive" />
    <view class="list p-t-20">
      <Card>
        <template #button> <button>撤回</button> </template>
      </Card>
    </view>
    <view class="subscribe fz-28">
      预约
    </view>
  </view>
</template>

<script>
import { Tab } from "@/components/Tab";
import { Card } from "@/components/Card";
import { DataSelect } from "@/components/DataSelect";
export default {
  components: {
    Tab,
    DataSelect,
    Card,
  },
  data() {
    return {
      list: ["待审核", "待接收"],
      active: 0,
    };
  },
  onLoad() {
  },
  methods: {
    changeActive(index) {
      this.active = index;
    },
  },
};
</script>

<style scoped lang="scss">
.page{
  border-top: 1rpx solid $uni-bg-color-border;
}
.list {
  display: flex;
  flex-direction: column;
  width: 96%;
  margin: 0 auto;
}
button {
  padding: 20rpx 60rpx;
  border-radius: 8rpx;
}
.subscribe{
  background-color: $uni-bg-color-primary;
  color: $uni-text-color-inverse;
  position: fixed;
  z-index: 2;
  bottom: 100rpx;
  border-radius: 50%;
  right: 0;
  text-align: center;
  height: 140rpx;
  width: 140rpx;
  display: flex;
}
</style>
