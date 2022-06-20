<template>
  <view>
    <Tab class="tab" :list="list" :active="active" @changeActive="changeActive" />
    <view v-if="orderArr.length !== 0" class="list p-20 p-t-80">
      <Card v-for="(item, index) in orderArr" :key="index" :obj="item">
        <template #funtion>
          <view v-if="active === 0" class="list-item-funtion p-t-20 p-b-20 fz-28">
            <text class="item-lable">备注</text>
            <text class="text-active">{{item.remark || ''}}</text>
          </view>
        </template>
      </Card>
    </view>
    <Empty v-if="orderArr.length === 0"/>
  </view>
</template>

<script>
import { Tab } from "@/components/Tab";
import { Card } from "@/components/Card";
import { Empty } from "@/components/Empty";
import { gysOrderCommonOrder } from "@/api";
export default {
  components: {
    Tab,
    Card,
    Empty
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
  onPullDownRefresh() {
    this.page = 1;
    this.orderArr = []
    this.getData();
    uni.stopPullDownRefresh()
  },
  methods: {
    getData() {
      gysOrderCommonOrder({
        page: this.page,
        num: 10,
        status: this.active === 0 ? 4 : 5,
      }).then((res) => {
        if (res.ret.data.length === 0) {
          return uni.showToast({
            title: '没有更多数据了',
            icon: 'none',
          })
        }
        this.orderArr = [...this.orderArr,...res.ret.data].map((item) => {
          return Object.freeze({
            date: item.date,
            type: item.type,
            time: item.time,
            personnel: item.personnel || [
              { name: "--", tel: "--", license_plate: "--" },
            ],
            num: item.num,
            s_time: item.s_time,
            e_time: item.e_time,
            status: item.status,
            remark: item.remark
          });
        });
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
