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
        <view class="list-item p-t-20">
            <view class="list-item-header p-l-20">
                <view>9:00-10:00 <text>(2/2)</text></view>
                <view>2,000件</view>
            </view>
            <view class="list-item-body">
                <view>9:00-10:00 <text>(2/2)</text></view>
                <view>2,000件</view>
            </view>
        </view>
    </view>
  </view>
</template>

<script>
import { DataSelect } from "@/components/DataSelect";
import { NoticeBar } from "@/components/NoticeBar";
export default {
  components: {
    DataSelect,
    NoticeBar,
  },
};
</script>

<style scoped lang="scss">
.num-view{
    display: flex;
}
.list-item{
    border-radius: 10rpx;
    background-color: #fff;
    .list-item-header{
        display: flex;
        justify-content: space-between;
        line-height: 80rpx;
        border-left: 4rpx solid #358FEE;
    }
}
</style>