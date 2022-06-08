<template>
    <view class="p-24">
        <view class="list">
            <view v-for="(item,index) in 100" :key="index" class="list-item p-t-26 p-b-24 p-l-30">
                <view>
                    <text class="fz-32">李天明</text>
                    <text class="fz-28 m-l-20">123 4567 8901</text>
                </view>
                <view class="plate-number fz-28 m-t-10">车牌号：浙A123456</view>
            </view>
        </view>
    </view>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
.list{
    background-color: #fff;
    min-height: 96vh;
    height: auto;
    .list-item{
        display: flex;
        flex-direction: column;
        border-bottom: 1rpx solid $uni-bg-color-border;
        .plate-number{
            color: $uni-text-color-grey;
        }
    }
    .list-item:last-child{
        border-bottom: none;
    }
}
</style>