<template>
    <view class="p-24">
        <view class="list">
            <view v-for="(item,index) in peopleList" :key="index" @click="itemClick(item)" class="list-item p-t-26 p-b-24 p-l-30">
                <view>
                    <text class="fz-32">{{item.name}}</text>
                    <text class="fz-28 m-l-20">{{item.tel}}</text>
                </view>
                <view class="plate-number fz-28 m-t-10">车牌号：{{item.license_plate}}</view>
            </view>
        </view>
    </view>
</template>


<script>
import { gysUserStaffShow } from "@/api";

export default {
  data: () => ({
    page:1,
    peopleList:[],
    onReachBottomTimer: null,
  }),
  onReachBottom() {
    if (this.onReachBottomTimer !== null) {
      clearTimeout(this.onReachBottomTimer);
    }
    this.page++;
    this.onReachBottomTimer = setTimeout(() => this.getData(), 500);
  },
  onShow() {
    this.peopleList = []
    this.getData()
  },
  methods: {
    getData() {
      gysUserStaffShow({
        type: 1,
        page: this.page,
        num: 10
      }).then(res => {
        console.log(res)
        this.peopleList = [...this.peopleList,...res.ret.data]
      })
    },
    itemClick(value) {
        this.$store.dispatch('changeSetting', {
          key: 'selectDriver',
          value
        })
        setTimeout(() => {
          uni.navigateBack({
            delta:1,
          })
        }, 1500);
    }
  },
};
</script>

<style scoped lang="scss">
.list{
    background-color: $uni-bg-color-white;
    // min-height: 96vh;
    // height: auto;
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