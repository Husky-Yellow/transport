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
// import { datatime, getForMonth } from "@/utils";
export default {
  components: {
    Tab,
    Card,
  },
  data() {
    return {
      list: ["待审核", "待接收"],
      active: 0,
    };
  },
  onLoad() {
    // const dateArray = datatime(5);
    // const monthArrat = getForMonth();
    // console.log(dateArray);
    // console.log(monthArrat);
  },
  methods: {
    changeActive(index) {
      console.log(index);
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
button {
  padding: 20rpx 60rpx;
  border-radius: 8rpx;
}
</style>
