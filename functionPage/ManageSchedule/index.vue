<template>
  <view>
    <DataSelect @select="selectData" :scrollDate="scrollDate" />
    <NoticeBar>
      <view class="num-view">
        <text>本日预约：</text>
        <text class="m-l-30">送货 {{deliver_num}}</text>
        <text class="m-l-30">取货 {{claim_num}}</text>
        <text class="m-l-30">返修 {{maintain_num}}</text>
      </view>
    </NoticeBar>
    <view class="list p-l-20 p-r-20 p-b-20">
      <view v-for="(item,index) in timeArr" :key="index" class="list-item p-t-20 m-t-20">
        <view class="list-item-header p-r-20">
          <view class="list-item-header-intro">
            <view class="border-left" />
            <text class="fz-36 m-l-20 weight-500">{{item.time_str}}</text>
            <text class="fz-28 m-l-20 error-text">(2/2)</text>
          </view>
          <view class="fz-28">2,000件</view>
        </view>
        <view class="list-item-intro m-20 p-l-20 p-r-20">
          <view class="list-item-intro-view p-t-20 p-b-20">
            <view class="list-item-intro-header">
              <view>
                <text class="type-text fz-24 delivery">送</text>
                <text class="fz-28 m-l-20">杭州逸香服饰有限公司</text>
              </view>
              <view class="fz-28">1,000</view>
            </view>
            <view class="fz-24 plate-text p-l-70 p-t-20">
              <view>
                <text>李天明</text>
                <text class="m-l-20">浙A123456</text>
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="list-item p-t-20 m-t-20">
        <view class="list-item-header p-r-20">
          <view class="list-item-header-intro">
            <view class="border-left" />
            <text class="fz-36 m-l-20">9:00-10:00</text>
            <text class="fz-28 m-l-20 error-text">(2/2)</text>
          </view>
          <view class="fz-28">2,000件</view>
        </view>
        <view class="list-item-intro m-20 p-l-20 p-r-20">
          <view class="list-item-intro-view p-t-20 p-b-20">
            <view class="list-item-intro-header">
              <view>
                <text class="type-text fz-24 delivery">送</text>
                <text class="fz-28 m-l-20">杭州逸香服饰有限公司</text>
              </view>
              <view class="fz-28">1,000</view>
            </view>
            <view class="fz-24 plate-text p-l-50 p-t-20 user-list">
              <view class="m-t-6">
                <text>李天明：</text>
                <text class="m-l-4">123 4567 8901</text>
              </view>
              <view class="m-t-6">
                <text>李天明：</text>
                <text class="m-l-4">123 4567 8901</text>
              </view>
              <view class="m-t-6">
                <text>李天明：</text>
                <text class="m-l-4">123 4567 8901</text>
              </view>
              <view class="m-t-6">
                <text>李天明：</text>
                <text class="m-l-4">123 4567 8901</text>
              </view>
              <view class="m-t-6">
                <text>李天明：</text>
                <text class="m-l-4">123 4567 8901</text>
              </view>
              <view class="m-t-6">
                <text>李天明：</text>
                <text class="m-l-4">123 4567 8901</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import DataSelect from "@/components/DataSelect";
import NoticeBar from "@/components/NoticeBar";
import { warehouseOrderCount } from "@/api";
export default {
  components: {
    DataSelect,
    NoticeBar,
  },
  data: () => ({
    scrollDate: [],
    showArr: [],
    timeArr: [],
    date: "",
    deliver_num: 0,
    claim_num: 0,
    maintain_num: 0,
  }),
  onLoad() {
    this.getOrderShow();
  },
  methods: {
    getOrderShow() {
      warehouseOrderCount().then((res) => {
        this.scrollDate = res.ret.map((item) => {
          const weekArr = ["日", "一", "二", "三", "四", "五", "六"];
          const dateTs = new Date(item.date).setHours(0, 0, 0, 0);
          const dateValue = new Date(dateTs)
          return Object.freeze({
            week: `周${weekArr[dateValue.getDay()]}`,
            month: `${item.date.substring(5, 7)}`,
            day: `${item.date.substring(8, 10)}`,
            date: item.date,
          })
        });
        this.showArr = res.ret.map((item) => Object.freeze(item));
        this.selectData(this.scrollDate[0], 0);
      });
    },
    selectData(item, index) {
      this.date = item.date;
      this.deliver_num = item.deliver_num || 0
      this.claim_num = item.claim_num || 0
      this.maintain_num = item.maintain_num || 0
      this.timeArr = this.showArr[index].son.filter(item => item.time_str && item.num).map((item) =>
        Object.freeze({ ...item })
      );
    },
  },
};
</script>

<style scoped lang="scss">
.num-view {
  display: flex;
}
.list-item {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 8rpx;
  .list-item-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    // border-left: 8rpx solid #358fee;
    .list-item-header-intro{
        display: flex;
        align-items: center;
        .border-left {
            width: 8rpx;
            height: 60rpx;
            background-color: $uni-bg-color-primary;
            border-radius: 4rpx;
        }
    }
  }
  .error-text {
    color: #f55547;
  }
  .list-item-intro {
    border-top: 1rpx solid $uni-bg-color-border;
    .list-item-intro-header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  }
  .type-text {
    display: inline-flex;
    width: 48rpx;
    height: 48rpx;
    border: 2rpx solid;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
  }
  .delivery {
    color: #358fee;
  }
  .plate-text {
    color: $uni-text-color-grey;
  }
  .list-item-intro-view {
    border-bottom: 1rpx solid $uni-bg-color-border;
  }
  .list-item-intro-view:last-child {
    border-bottom: none;
  }
  .user-list {
    // display: flex;
    // flex-wrap: wrap;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    text-align: center;
    view:nth-of-type(odd) {
      padding-left: 0;
    }
    view:nth-of-type(even) {
      padding-left: 20rpx;
    }
  }
}
.weight-500{
  font-weight: 500;
}
</style>
