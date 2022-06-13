<template>
  <view>
    <Tab class="tab" :list="list" :active="active" @changeActive="changeActive" />
    <view class="list p-20 p-t-80">
      <ManageCard v-for="(item, index) in arr" :key="index" :obj="item">
        <template #funtion>
          <view class="list-item-funtion p-t-20 p-b-20 fz-28">
            <text>操作</text>
            <view>
              <button class="p-l-54 p-r-54 fz-28 m-r-20 primary-button">通过</button>
              <button class="p-l-54 p-r-54 fz-28 close-button">拒绝</button>
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
export default {
  components: {
    Tab,
    ManageCard,
  },
  data() {
    return {
      list: ["待审核", "已通过", "已拒绝"],
      active: 0,
      arr: [
        {
          time:'11:00-12:00',
          type:'receive',
          cardType:'repair',
          number: 1000,
          people: '4',
          peopleArr:[{
            name:'李天明',
            phone:'12345678901'
          },{
            name:'李天明',
            phone:'12345678901'
          },{
            name:'李天明',
            phone:'12345678901'
          },{
            name:'李天明',
            phone:'12345678901'
          }]
        },
        {
          time:'11:00-12:00',
          type:'receive',
          cardType: 'delivery',
          number: 1000,
          name: '李天明',
          phone: '123 4567 8901',
          card: '浙A123456'
        },
        {
          time:'11:00-12:00',
          type:'receive',
          cardType: 'claimGoods',
          number: 1000,
          name: '李天明',
          phone: '123 4567 8901',
          card: '浙A123456'
        },
      ],
    };
  },
  onLoad() {},
  methods: {
    changeActive(index) {
      this.active = index;
      this.arr = this.arr.map(item => {
        item.type = index === 0 ? 'receive' : 'reject';
        return item;
      });
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
