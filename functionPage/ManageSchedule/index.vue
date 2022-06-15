<template>
  <view>
    <DataSelect @select="selectData" :scrollDate="scrollDate" />
    <NoticeBar>
      <view class="num-view">
        <text class="m-l-30">本日预约：</text>
        <text class="m-l-30">送货 4,000</text>
        <text class="m-l-30">取货 2,000</text>
        <text class="m-l-30">返修 1,000</text>
      </view>
    </NoticeBar>
    <view class="list p-l-20 p-r-20 p-b-20">
      <view class="list-item p-t-20 m-t-20">
        <view class="list-item-header p-r-20">
          <view class="list-item-header-intro">
            <view class="border-left" />
            <text class="fz-36 m-l-20 weight-500">9:00-10:00</text>
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
            <view class="fz-24 plate-text p-l-70 p-t-20">
              <view>
                <text>李天明</text>
                <text class="m-l-20">浙A123456</text>
              </view>
            </view>
          </view>
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
import { orderShow } from "@/api";
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
  }),
  onLoad() {
    this.getOrderShow();
  },
  methods: {
    getOrderShow() {
      orderShow().then((res) => {
        this.scrollDate = res.ret.map((item) => {
          return Object.freeze({
            week: `周${item.date_name.substring(2, 3)}`,
            month: `${item.date_sub.substring(0, 2)}`,
            day: `${item.date_sub.substring(3, 5)}`,
            date: item.date,
          });
        });
        this.showArr = res.ret.map((item) => Object.freeze(item));
        this.selectData(this.scrollDate[0], 0);
      });
    },
    selectData(item, index) {
      this.date = item.date;
      this.timeArr = this.showArr[index].son.map((item) =>
        Object.freeze({ time_str: item.time_str, id: item.id })
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
