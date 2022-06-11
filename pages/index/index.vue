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
              @click="showTextmsg = true"
            >
              撤回
            </button>
          </view>
        </template>
      </Card>
    </view>
    <Model
      :textmsg="textmsg"
      @cancel="operation(1)"
      @confirm="operation(2)"
      v-show="showTextmsg"
    >
      <view slot="content">
        <view class="Model-content fz-28 p-20">
          <view>{{ textmsg.content }}</view>
          <view class="subscribe-type-text">送货预约申请</view>
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
import { orderOrderList } from "@/api";
export default {
  components: {
    Tab,
    Card,
    Model,
  },
  data: () => ({
    list: ["待审核", "待接收"],
    orderArr: [
      {
        timestamp:'2022-06-11 16:39:01',
        time: "11:00-12:00",
        type: "pending",
        cardType: "repair",
        number: 1000,
        people: "4",
        peopleArr: [
          {
            name: "李天明",
            phone: "12345678901",
          },
          {
            name: "李天明",
            phone: "12345678901",
          },
          {
            name: "李天明",
            phone: "12345678901",
          },
          {
            name: "李天明",
            phone: "12345678901",
          },
        ],
      },
      {
        timestamp:'2022-06-12 16:39:01',
        time: "11:00-12:00",
        type: "pending",
        cardType: "delivery",
        number: 1000,
        name: "李天明",
        phone: "123 4567 8901",
        card: "浙A123456",
      },
      {
        timestamp:'2022-06-01 16:39:01',
        time: "11:00-12:00",
        type: "pending",
        cardType: "claimGoods",
        number: 1000,
        name: "李天明",
        phone: "123 4567 8901",
        card: "浙A123456",
      },
    ],
    active: 0,
    page: 1,
    showView: false,
    showTextmsg: false,
    textmsg: {
      title: "提示",
      content: "即将撤回2022-01-01 10:00",
      cancel: "取消",
      confirm: "确定",
    },
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
    // this.login()
    // this.getData();
  },
  methods: {
    login() {
      this.$store
        .dispatch("user/login", {
          phonenum: "ck",
          password: "123456",
        })
        .then(() => {
          console.log(`登陆成功`);
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    getData() {
      orderOrderList({
        type: 1,
        page: this.page,
        num: 10,
        status: this.active === 0 ? 1 : 2,
      }).then((res) => {
        // console.log(res);
        this.orderArr = [...this.orderArr,...res.ret.data] ;
      });
    },
    changeActive(index) {
      this.active = index;
      this.orderArr = [];
      this.getData();
    },
    goToAppointmentDelivery(type) {
      uni.navigateTo({
        url: `/functionPage/AppointmentDelivery/index?type=${type}`,
      });
    },
    operation(e) {
      let that = this;
      let type = e;
      console.log(type);
      if (type == 1) {
        //取消操作
        that.showTextmsg = false;
      } else {
        //确定操作
        // uni.navigateTo({
        //     url: "../user/login"
        // })
        that.showTextmsg = false;
      }
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
