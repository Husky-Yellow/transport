<template>
    <view class="transport-notice-bar">{{text}}</view>
</template>

<script>
export default {
props: {
    text: {
      type: String,
      default: '',
    },
  },
}
</script>

<style scoped lang="scss">
.transport-notice-bar {
    position: relative;
    display: flex;
    align-items: center;
    height: var(--van-notice-bar-height);
    padding: var(--van-notice-bar-padding);
    color: var(--van-notice-bar-text-color);
    font-size: var(--van-notice-bar-font-size);
    line-height: var(--van-notice-bar-line-height);
    background: var(--van-notice-bar-background-color)
}

</style>