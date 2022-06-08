<template>
    <view class="p-20">
        <view class="list-item p-t-20 m-t-20">
            <view class="list-item-header p-r-20 m-b-20 ">
                 <text class="p-l-20 fz-32">开放时间：03-03</text>
            </view>
            <view class="list-item-body m-l-20 m-r-20 fz-30 p-20">
                <view v-for="(item,index) in TIMEARR" :key="index" class="m-20 p-r-18">{{item}}</view>
            </view>
            <view class="list-item-function p-30 fz-24">
                <text>操作</text>
                <button class="fz-24 p-l-58 p-r-58" @click="goTimeManagementSelect">修改</button>
            </view>
        </view>
        <view class="list-item p-t-20 m-t-20">
            <view class="list-item-header p-r-20 m-b-20 ">
                 <text class="p-l-20 fz-32">开放时间：03-03</text>
            </view>
            <view class="list-item-body m-l-20 m-r-20 fz-30 p-20">
                <view v-for="(item,index) in TIMEARR" :key="index" class="m-20 p-r-18">{{item}}</view>
            </view>
            <view class="list-item-function p-30 fz-24">
                <text>操作</text>
                <button class="fz-24 p-l-58 p-r-58">修改</button>
            </view>
        </view>
    </view>
</template>

<script>
const TIMEARR = [
  "09:00-10:00",
  "10:00-11:00",
  "11:00-12:00",
  "13:00-14:00",
  "14:00-15:00",
  "15:00-16:00",
  "17:00-18:00",
];
export default {
    data() {
        return {
        TIMEARR: TIMEARR,
        };
    },
    methods: {
        goTimeManagementSelect() {
            uni.navigateTo({
                url: `/functionPage/TimeManagementSelect/index`,
            });
        },
    }
}
</script>

<style scoped lang="scss">
.list-item{
    border-radius: 8rpx;
    background-color: #fff;
    .list-item-header{
        flex-direction: row;
        @include space-between;
        border-left: 8rpx solid #358FEE;
    }
    .list-item-body{
        border-top: 1rpx solid $uni-bg-color-border;
        border-bottom: 1rpx solid $uni-bg-color-border;
        display: flex;
        flex-wrap: wrap;
        view{
            border-right: 1rpx solid $uni-bg-color-border;
        }
        view:nth-of-type(3n),view:last-child {
            border-right: none;
        }
    }
    .list-item-function{
        flex-direction: row;
        @include space-between;
        button{
            background-color: #FAB236;
            color: #fff;
            height: 85rpx;
            line-height: 85rpx;
            border-radius: 8rpx;
        }
    }
}
</style>