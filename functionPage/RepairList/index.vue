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
        <button class="fz-28 p-t-26 p-b-26 p-l-80 p-r-80" @click="submit">确定</button>
    </view>
  </view>
</template>


<script>
import { gysUserStaffShow } from "@/api";
import { mapGetters } from "vuex";

export default {
  data: () => ({
    page:1,
    peopleList:[],
    onReachBottomTimer: null,
  }),
  computed: {
    ...mapGetters(["selectPeopleArr"]),
    selectLength() {
      return this.peopleList.filter(item => item.click).length;
    },
  },
  onReachBottom() {
    if (this.onReachBottomTimer !== null) {
      clearTimeout(this.onReachBottomTimer);
    }
    this.page++;
    this.onReachBottomTimer = setTimeout(() => this.getData(), 500);
  },
  onLoad() {
    this.peopleList = []
    this.getData()
  },
  methods: {
    getData() {
      gysUserStaffShow({
        type: 2,
        page: this.page,
        num: 10
      }).then(res => {
        const data = res.ret.data.map((item,index)=>{
          item.click = this.selectPeopleArr.findIndex(i=> i.id === item.id && i.click === true) === index ? true : false
          return item
        })
        this.peopleList = [...this.peopleList,...data]
      })
    },
    submit(){
      console.log(this.peopleList)
      this.$store.dispatch('changeSetting', {
          key: 'selectPeopleArr',
          value: this.peopleList
        })
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
  button{
      background-color: $uni-bg-color-primary;
      color: $uni-text-color-inverse;
      border-radius: 50rpx;
  }
}
</style>