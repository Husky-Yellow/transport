<template>
  <view class="p-24">
    <view class="list">
      <view
        v-for="(item, index) in peopleList"
        :key="index"
        class="list-item p-t-26 p-b-24 p-l-30 p-r-30"
      >
        <view>
          <view>
            <text class="fz-32">{{item.name}}</text>
          </view>
          <view class="plate-number fz-28 m-t-10">手机号：{{item.tel}}</view>
        </view>
        <label class="checkbox">
          <checkbox :checked="item.click" @click="peopleList[index].click = !peopleList[index].click"/>
        </label>
      </view>
    </view>
    <view class="fix-view p-10 p-l-12 p-r-12">
        <view>
            <text class="fz-28">已选人数：</text> <text class="fz-36 red-text">{{selectLength}}</text>
        </view>
        <view>
          <button class="add-button fz-28 m-r-26" @click="goAddRepair">新增返修员</button>
          <button class="confirm-button fz-28 p-t-26 p-b-26 p-l-80 p-r-80" @click="submit">确定</button>
        </view>
    </view>
  </view>
</template>

<script>
import { gysUserStaffShow } from "@/api";

export default {
  data: () => ({
    page: 1,
    peopleList: [],
    selectPeopleArr: [],
    onReachBottomTimer: null,
  }),
  computed: {
    selectLength() {
      return this.peopleList.filter(item => item.click).length;
    },
  },
  // onReachBottom() {
  //   if (this.onReachBottomTimer !== null) {
  //     clearTimeout(this.onReachBottomTimer);
  //   }
  //   this.page++;
  //   this.onReachBottomTimer = setTimeout(() => this.getData(), 500);
  // },
  onShow() {
    this.selectPeopleArr = uni.getStorageSync('selectPeopleArr')
    this.peopleList = []
    // this.page = 1;
    this.getData()
  },
  onPullDownRefresh() {
    // this.page = 1;
    this.peopleList = []
    this.getData();
    uni.stopPullDownRefresh()
  },
  methods: {
    getData() {
      gysUserStaffShow({
        type: 2,
        page: 1,
        num: 10000
      }).then(res => {
        const data = res.ret.data.map((item,index)=>{
          item.click = (this.selectPeopleArr || []).findIndex(i=> i.id === item.id && i.click === true) === index ? true : false
          return item
        })
        this.peopleList = [...this.peopleList,...data]
      })
    },
    goAddRepair() {
        uni.setStorageSync('selectPeopleArr',this.peopleList)
      uni.navigateTo({
        url: `/functionPage/AddRepair/index`,
      });
    },
    submit(){
        uni.setStorageSync('selectPeopleArr',this.peopleList)
             setTimeout(() => {
          uni.navigateBack({
            delta:1,
          })
        }, 1000);
    }
  },
};
</script>

<style scoped lang="scss">
.list {
  background-color: #fff;
  min-height: 96vh;
  height: auto;
  .list-item {
    @include space-between;
    border-bottom: 1rpx solid $uni-bg-color-border;
    .plate-number {
      color: $uni-text-color-grey;
    }
  }
  .list-item:last-child {
    border-bottom: none;
  }
}
.fix-view{
    background-color: $uni-bg-color-white;
      position: fixed;
  z-index: 1;
  width: 100vw;
  bottom: 0;
  left: 0;
  text-align: center;
  @include space-between;
  view{
      display: flex;
      align-items: center;
      .red-text{
          color: #F55547;
      }
  }
  .add-button{
    color: #358FEE;
  }
  .confirm-button{
      background-color: $uni-bg-color-primary;
      color: $uni-text-color-inverse;
      border-radius: 50rpx;
  }
}
</style>