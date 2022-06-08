<template>
  <view>
    <DataSelect />
    <NoticeBar>
      <view class="num-view">
        <text class="m-l-30">本日预约：</text>
        <text class="m-l-30">送货 4,000</text>
        <text class="m-l-30">取货 2,000</text>
        <text class="m-l-30">返修 1,000</text>
      </view>
    </NoticeBar>
    <view class="list p-20">
        <view class="list-item p-t-20 m-t-20">
            <view class="list-item-header p-r-20">
                <view class="p-l-20">
                    <text class="fz-36">9:00-10:00</text>
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
                <view class="p-l-20">
                    <text class="fz-36">9:00-10:00</text>
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
                <view class="p-l-20">
                    <text class="fz-36">9:00-10:00</text>
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
                    <view class="fz-24 plate-text p-l-70 p-t-20 user-list">
                        <view>
                            <text>李天明：</text>
                            <text class="m-l-4">123 4567 8901</text>
                        </view>
                        <view>
                            <text>李天明：</text>
                            <text class="m-l-4">123 4567 8901</text>
                        </view>
                        <view>
                            <text>李天明：</text>
                            <text class="m-l-4">123 4567 8901</text>
                        </view>
                        <view>
                            <text>李天明：</text>
                            <text class="m-l-4">123 4567 8901</text>
                        </view>
                        <view>
                            <text>李天明：</text>
                            <text class="m-l-4">123 4567 8901</text>
                        </view>
                        <view>
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
export default {
  components: {
    DataSelect,
    NoticeBar,
  },
};
</script>

<style scoped lang="scss">
.num-view {
  display: flex;
}
.list-item{
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-radius: 8rpx;
    .list-item-header{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        border-left: 8rpx solid #358FEE;
    }
    .error-text{
        color: #F55547
    }
    .list-item-intro{
        border-top: 1rpx solid $uni-bg-color-border;
        .list-item-intro-header{
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
    .plate-text{
        color: $uni-text-color-grey;
    }
    .list-item-intro-view{
        border-bottom: 1rpx solid $uni-bg-color-border;
    }
    .list-item-intro-view:last-child{
        border-bottom: none;
    }
    .user-list{
        display: flex;
        flex-wrap: wrap;
        view:nth-of-type(odd) {
            padding-left: 0;
        }
        view:nth-of-type(even) {
            padding-left: 40rpx;
        }
    }
}

</style>