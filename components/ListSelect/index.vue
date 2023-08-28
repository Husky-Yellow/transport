<template>
    <view>
        <view v-show="bottomComponentVisible" class="mask" @tap.stop="closeComponent" @catchtouchmove="noToch"></view>
        <view v-show="bottomComponentVisible" class="fix-select-list" catchtouchmove="prevent" @catchtouchmove="noToch">
            <view class="fix-select-list-content">
                <!-- 内容区域 -->
                <view class="fix-select-list-content-header">
                    <button class="fix-select-list-content-header__close" @tap="closeComponent">关闭</button>
                    <button class="fix-select-list-content-header__change"></button>
                </view>
                <view class="fix-select-list-content-list">
                    <scroll-view style="height:474rpx" type="list" scroll-y @scrolltolower="bindscrolltolower">
                        <view v-for="(item, index) in array" :key="index" @click.stop="selectValue(item)">{{ item.invoice_number }}</view>
                    </scroll-view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    props: {
        array: {
            type: Array,
            default: () => {
                return []
            },
        },
    },
    data() {
        return {
            bottomComponentVisible: false
        };
    },
    methods: {
        showBottomComponent() {
            this.bottomComponentVisible = true;
        },
        hideComponent() {
            this.bottomComponentVisible = false;
        },
        closeComponent() {
            this.hideComponent();
        },
        noToch() {
            return false;
        },
        bindscrolltolower() {
            this.$emit('bindscrolltolower',);
        },
        selectValue(value) {
            this.closeComponent()
            this.$emit('selectValue', value);
        }
    }
};
</script>

<style scoped lang="scss">
.fix-select-list {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
}

.fix-select-list-content {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 520rpx;
    background-color: #fff;
    border-top-left-radius: 20rpx;
    border-top-right-radius: 20rpx;
    z-index: 3;
    transition: transform 0.3s ease-in-out;
}

.fix-select-list-content-header {
    display: flex;
    justify-content: space-between;
    border-bottom: 1rpx solid #eee;
    padding: 40rpx 20rpx;
}

.fix-select-list-content-header__close {
    font-size: 28rpx;
    color: #999;
}

.fix-select-list-content-header__change {
    color: #333;
}

.fix-select-list-content-list {
    height: 474rpx;
    overflow: auto;
}

.fix-select-list-content-list view {
    color: #333;
    padding: 20rpx;
    font-size: 28rpx;
    text-align: center;
    border-bottom: 1rpx solid #eee;
}

.mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 3;
}</style>
