<template>
  <view class="page">
    <Tab
      class="tab"
      :list="list"
      :active="active"
      @changeActive="changeActive"
    />
    <view class="list p-24 p-t-76">
      <Card v-for="(item, index) in orderArr" :key="index" :obj="item">
        <template #funtion>
          <view class="list-item-funtion p-t-20 p-b-20 fz-28">
            <text>操作</text>
            <button
              class="p-t-14 p-b-14 p-l-54 p-r-54 fz-28"
              @click="openModel(item)"
            >
              撤回
            </button>
          </view>
        </template>
      </Card>
    </view>
    <Model
      :textmsg="textmsg"
      @cancel="operation(false)"
      @confirm="operation(true)"
      v-show="showTextmsg"
    >
      <view slot="content">
        <view class="Model-content fz-28 p-20">
          <view>{{ textmsg.content }}</view>
          <view class="subscribe-type-text">
            {{ active === 0 ? "送货预约申请" : "送货" }}
          </view>
        </view>
      </view>
    </Model>
    <view class="subscribe fz-28" @click="showView = !showView"> 预约 </view>
    <view
      class="subscribe-view"
      :style="{
        width: showView ? '90%' : '140rpx',
        'padding-right': showView ? '140rpx' : '0',
      }"
    >
      <view
        class="subscribe-view-item p-20 m-l-10"
        @click="goToAppointmentDelivery('delivery')"
      >
        <image src="@/static/delivery.png" mode="scaleToFill" />
        <text class="fz-24">送货</text>
      </view>
      <view
        class="subscribe-view-item p-20 m-l-10"
        @click="goToAppointmentDelivery('claimGoods')"
      >
        <image src="@/static/claimGoods.png" mode="scaleToFill" />
        <text class="fz-24">取货</text>
      </view>
      <view
        class="subscribe-view-item p-20 m-l-10"
        @click="goToAppointmentDelivery('repair')"
      >
        <image src="@/static/repair.png" mode="scaleToFill" />
        <text class="fz-24">返修</text>
      </view>
    </view>
  </view>
</template>

<script>
import Tab from "@/components/Tab";
import Card from "@/components/Card";
import Model from "@/components/Model";
import { gysOrderCommonOrder, ordeUuserCancel } from "@/api";

export default {
  components: {
    Tab,
    Card,
    Model,
  },
  data: () => ({
    list: ["待审核", "待接收"],
    orderArr: [],
    active: 0,
    page: 1,
    showView: false,
    showTextmsg: false,
    textmsg: {
      title: "提示",
      content: "即将撤回",
      cancel: "取消",
      confirm: "确定",
    },
    onReachBottomTimer: null,
    cancelId: null,
  }),
  onReachBottom() {
    if (this.onReachBottomTimer !== null) {
      clearTimeout(this.onReachBottomTimer);
    }
    this.page++;
    this.onReachBottomTimer = setTimeout(() => this.getData(), 500);
  },
  onShow() {
    this.orderArr = []
    this.page = 1
    this.getData();
  },
  methods: {
    getData() {
      gysOrderCommonOrder({
        page: this.page,
        num: 10,
        status: this.active === 0 ? 1 : 2,
      }).then((res) => {
        if (res.ret.data.length === 0) {
          return uni.showToast({
            title: '没有更多数据了',
            icon: 'none',
          })
        }
        this.orderArr = [...this.orderArr, ...res.ret.data].map((item) => {
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
          });
        });
      });
    },
    changeActive(index) {
      this.active = index;
      this.page = 1;
      this.orderArr = [];
      this.getData();
    },
    goToAppointmentDelivery(type) {
      this.showView = false;
      uni.navigateTo({
        url: `/functionPage/AppointmentDelivery/index?type=${type}`,
      });
    },
    openModel(item) {
      this.cancelId = item.id;
      this.showTextmsg = true;
      this.textmsg.content = `即将撤回${item.date} ${item.s_time}-${item.e_time}`;
    },
    operation(e) {
      this.showTextmsg = false;
      if (!e) {
        this.textmsg.content = "";
        return;
      } else {
        this.OrdeUuserCancel();
      }
    },
    OrdeUuserCancel() {
      ordeUuserCancel({
        id: this.cancelId,
      })
        .then((res) => {
          uni.showToast({
            title: "撤回成功",
            icon: "success",
            duration: 2000,
          });
        })
        .catch((content) => {
          uni.showModal({
            title: "提示",
            content,
            showCancel: false,
            confirmColor: "#F55547",
          });
        });
    },
  },
};
</script>

<style scoped lang="scss">
.tab {
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
  button {
    background-color: $uni-bg-color-pending;
    color: $uni-text-color-inverse;
    border-radius: 8rpx;
  }
}
button {
  padding: 20rpx 60rpx;
  border-radius: 8rpx;
}
.subscribe {
  background-color: $uni-bg-color-primary;
  color: $uni-text-color-inverse;
  position: fixed;
  z-index: 3;
  bottom: 100rpx;
  border-radius: 50%;
  right: 0;
  text-align: center;
  height: 140rpx;
  width: 140rpx;
  line-height: 140rpx;
}

.subscribe-view {
  display: flex;
  background-color: $uni-bg-color-white;
  border-radius: 80rpx;
  height: 140rpx;
  position: fixed;
  bottom: 100rpx;
  right: 0;
  z-index: 2;
  transition: width 0.4s;
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.3);
  .subscribe-view-item {
    flex: 1;
    @include space-between;
    flex-direction: column;
    image {
      width: 80rpx;
      height: 110rpx;
    }
  }
}

.Model-content {
  text-align: center;
  .subscribe-type-text {
    color: $uni-text-color-pending;
  }
}
</style>
