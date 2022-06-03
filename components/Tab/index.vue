<template>
  <view class="tabs">
    <view
      v-for="(item, index) in list"
      :key="index"
      :class="index === active ? 'active' : ''"
      @click="changeActive(index)"
      >{{ item }}</view
    >
  </view>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    active: {
      type: Number,
      default: 0,
    },
  },
  onLoad() {},
  methods: {
    changeActive(index) {
      this.active = index;
      this.$emit("change", index);
    },
  },
};
</script>

<style scoped lang="scss">
.tabs {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  view {
    height: 40px;
    line-height: 40px;
    padding: 0 15px;
    cursor: pointer;
    position: relative;
    font-size: 18px;
    color: #909399;
    background-color: #fff;
    text-align: center;
    flex: 1;
    &::after {
      content: "";
      width: 0;
      height: 2px;
      background-color: #00adb5;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      transition: width 0.4s;
    }
  }
  view.active {
    &::after {
      width: 50%;
      transform: translateX(100% -30rpx);
    }
  }
}
</style>
