<template>
  <view>
    <Tab class="tab" :list="list" :active="active" @changeActive="changeActive" />
    <view class="list p-20 p-t-80">
      <ManageCard v-for="(item, index) in orderArr" :key="index" :obj="item" :showProress="null">
        <template #funtion>
          <view class="list-item-funtion p-t-20 p-b-20 fz-28">
            <text>操作</text>
            <view>
              <button class="p-l-54 p-r-54 fz-28 m-r-20 primary-button" @click="openModel(item,true)">接收</button>
              <button class="p-l-54 p-r-54 fz-28 close-button" @click="openModel(item,false)">拒收</button>
            </view>
          </view>
        </template>
      </ManageCard>
    </view>
  </view>
</template>

<script>
import { Tab } from "@/components/Tab";
import { ManageCard } from "@/components/ManageCard";
import { gysOrderCommonOrder } from "@/api";
export default {
  components: {
    Tab,
    ManageCard,
  },
  data() {
    return {
      list: ["待审核", "已通过", "已拒绝"],
      active: 0,
      orderArr: [],
      page:1,
      onReachBottomTimer: null,
      showTextmsg: false,
      cancelId: null,

      textmsg: {
        showType: "",
        title: "提示",
        content:'',
        text: "",
        cancel: "取消",
        confirm: "确定",
      },
    };
  },
  onReachBottom() {
    if (this.onReachBottomTimer !== null) {
      clearTimeout(this.onReachBottomTimer);
    }
    this.page++;
    this.onReachBottomTimer = setTimeout(() => this.getData(), 500);
  },
  onLoad() {
    this.getData();
  },
  methods: {
     getData() {
      const statusMap = {
        0:'2',
        1:'4',
        2:'5',
      }
      gysOrderCommonOrder({
        page: this.page,
        num: 10,
        status: statusMap[this.active],
      }).then((res) => {
        if (res.ret.data.length === 0) {
          return uni.showToast({
            title: '没有更多数据了',
            icon: 'none',
          })
        }
        this.orderArr = [...this.orderArr, ...res.ret.data]
      });
    },
    changeActive(index) {
      this.active = index;
      this.page = 1
      this.orderArr = [];
      this.getData();
    },
    openModel(item, type) {
      this.cancel = item;
      this.showTextmsg = true;
      this.textmsg.text = type
      this.textmsg.showType = 'button'
      this.textmsg.content = `${item.company}${item.date} ${item.s_time}-${item.e_time}`;
    },
    operation(e) {
      this.showTextmsg = false;
      if (!e) {
        this.textmsg.content = "";
        this.textmsg.text = ''
        this.textmsg.showType = ''
        return;
      } else {
        this.OrdeUuserCancel();
      }
    },
  },
};
</script>

<style scoped lang="scss">
.tab{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  height: 80rpx;
  border-top: 1rpx solid $uni-bg-color-border;
}
.list {
  display: flex;
  flex-direction: column;
}
.list-item-funtion {
  @include space-between;
  border-top: 1rpx solid $uni-bg-color-border;
  .item-lable{
    color: $uni-text-color-grey;
  }
  .text-active{
    color: $uni-text-color-active;
  }
  .primary-button,.close-button{
    border-radius: 10rpx;
    height: 64rpx;
    line-height: 64rpx;
  }
  .primary-button{
    background-color: $uni-bg-color-primary;
    color: $uni-text-color-inverse;

  }
  .close-button{
    border: 1rpx solid $uni-bg-color-border;
  }
}
</style>
