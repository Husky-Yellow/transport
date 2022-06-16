<template>
  <view>
    <Tab class="tab" :list="list" :active="active" @changeActive="changeActive" />
    <view class="list p-20 p-t-80">
      <Card v-for="(item, index) in orderArr" :key="index" :obj="item">
        <template #funtion>
          <view v-if="active === 0" class="list-item-funtion p-t-20 p-b-20 fz-28">
            <text class="item-lable">备注</text>
            <text class="text-active">{{item.remark}}</text>
          </view>
        </template>
      </Card>
    </view>
  </view>
</template>

<script>
import { Tab } from "@/components/Tab";
import { Card } from "@/components/Card";
import { warehouseOrderCommonOrder } from "@/api";
export default {
  components: {
    Tab,
    Card,
  },
  data() {
    return{
      list: ["已接收", "已拒收"],
      active: 0,
      orderArr: [],
      page: 1,
      onReachBottomTimer: null,
    }
  },
  onReachBottom() {
    if (this.onReachBottomTimer !== null) {
      clearTimeout(this.onReachBottomTimer);
    }
    this.page++;
    this.onReachBottomTimer = setTimeout(() => this.getData(), 500);
  },
  onLoad() {
    this.orderArr = []
    this.page = 1
    this.getData();
  },
  methods: {
    getData() {
      warehouseOrderCommonOrder({
        type: 1,
        page: this.page,
        num: 10,
        status: this.active === 0 ? 4 : 5,
      }).then((res) => {
        this.orderArr = [...this.orderArr,...res.ret.data]
      });
    },
    changeActive(index) {
      this.active = index;
      this.page = 1
      this.orderArr = []
      this.getData()
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
