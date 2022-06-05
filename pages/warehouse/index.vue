<template>
  <view>
    <Tab class="tab" :list="list" :active="active" @changeActive="changeActive" />
    <view class="list p-20 p-t-80">
      <Card>
        <template #funtion>
          <view class="list-item-funtion p-t-20 p-b-20 fz-28">
            <text class="item-lable">备注</text>
            <text class="text-active">收到998件</text>
          </view>
        </template>
      </Card>
    </view>
  </view>
</template>

<script>
import { Tab } from "@/components/Tab";
import { Card } from "@/components/Card";
export default {
  components: {
    Tab,
    Card,
  },
  data() {
    return {
      list: ["待接收", "已接收", "已拒收"],
      active: 0,
    };
  },
  onLoad() {},
  methods: {
    changeActive(index) {
      this.active = index;
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
}
</style>
