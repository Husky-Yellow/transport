<template>
  <view>
    <Tab :list="list" :active="active" @changeActive="changeActive" />
    <view class="list p-t-20">
      <Card>
        <template #button> <button>撤回</button> </template>
      </Card>
    </view>
  </view>
</template>

<script>
import { Tab } from "@/components/Tab";
import { Card } from "@/components/Card";
export default {
  components: {
    Tab,
    Card,
  },
  data() {
    return {
      list: ["待接收", "已接收", "已拒收"],
      active: 0,
    };
  },
  onLoad() {},
  methods: {
    changeActive(index) {
      this.active = index;
    },
  },
};
</script>

<style scoped lang="scss">
.list {
  display: flex;
  flex-direction: column;
  width: 96%;
  margin: 0 auto;
}
</style>
