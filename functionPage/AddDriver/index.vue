<template>
    <view class="p-24">
        <view class="form-view p-20 fz-28">
            <view class="form-view-item p-22">
                <view>
                    <image mode="scaleToFill" class="m-r-10" src="@/static/plateNumber.png" />
                    返修员
                </view>
                <input type="text" placeholder="请输入姓名"/>
            </view>
            <view class="form-view-item p-22">
                <view>
                    <image mode="scaleToFill" class="m-r-10" src="@/static/iphone.png" />
                    手机号
                </view>
                <input type="number" placeholder="请输入手机号"/>
            </view>
        </view>
        <button class="p-28 m-t-80">确定</button>
    </view>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
.form-view{
    background-color: $uni-bg-color-white;
    height: 70vh;
    border-radius: 8rpx;
    .form-view-item{
        @include space-between;
        border-bottom: 1rpx solid $uni-bg-color-border;
        image{
            width: 40rpx;
            height: 40rpx;
            vertical-align:middle;
        }
        input{
            text-align: right;
        }
    }
    .form-view-item:last-child {
      border-bottom: none;
    }
}
button{
    background-color: $uni-bg-color-primary;
    color: $uni-text-color-inverse;
    width: 100%;
    text-align: center;
}
</style>