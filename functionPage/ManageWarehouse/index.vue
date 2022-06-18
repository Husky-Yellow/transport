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
    <Model
      :textmsg="textmsg"
      @cancel="operation(false)"
      @confirm="operation(true)"
      v-show="showTextmsg"
    >
      <view slot="content">
        <view v-if="!textmsg.text" class="Model-content fz-28 p-20">
          <view>
            即将<text class="reject">拒绝</text>{{cancel.company}} {{cancel.s_time}}-{{cancel.e_time}}的
          </view>
          <view class="subscribe-type-text">
            送货
          </view>
        </view>
        <view v-if="textmsg.text" class="dialog-content fz-28 p-20">
          <view class="dialog-header p-10">
            <view>
              <view class="fz-30">
                {{cancel.date && cancel.date.length >= 10 ? cancel.date.substring(5,10) : cancel.date }}
                <text class="m-l-20 fz-36 font-weight-medium">{{cancel.s_time}}-{{cancel.e_time}}</text>
              </view>
              <view class="fz-28 m-t-10">{{cancel.company}}</view>
            </view>
            <view :class="['fz-32', statusText(cancel.status).class+'_text']">{{ statusText(cancel.status).text }}</view>
          </view>
          <view class="dialog-intro p-10 p-b-0">
            <view class="fz-28 p-b-10">
              预约类型：<text class="delivery">送货预约</text>
            </view>
            <textarea v-model="remark" class="p-6 dialog-intro_textarea" :focus="true" placeholder="请输入备注信息…"></textarea>
          </view>
        </view>
      </view>
    </Model>
  </view>
</template>

<script>
import Tab from "@/components/Tab";
import ManageCard from "@/components/ManageCard";
import Model from "@/components/Model";

import { gysOrderCommonOrder, orderWarehouse } from "@/api";
export default {
  components: {
    Tab,
    ManageCard,
    Model
  },
  data() {
    return {
      list: ["待审核", "已通过", "已拒绝"],
      active: 0,
      orderArr: [],
      page:1,
      onReachBottomTimer: null,
      showTextmsg: false,
      cancel: null,

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
  onShow() {
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
    },
    operation(e) {
      this.showTextmsg = false;
      if (!e) {
        this.cancel = null
        return;
      } else {
        this.OrdeUuserCancel();
      }
    },
    typeText(value) {
      const MAP = {
        repair: "修",
        1: {
          class: 'delivery',
          text: "送"
        },
        2: {
          class: 'claimGoods',
          text: "取"
        },
        3: {
          class: 'repair',
          text: "修"
        },
      };
      return MAP[value] || {
        class: "",
        text: ""
      };
    },
    statusText(value) {
      const MAP = {
        1: {
          class: 'pending',
          text: "待审核"
        },
        2: {
          class: 'receive',
          text: "审核通过"
        },
      };
      return MAP[value] || {
        class: "",
        text: ""
      };
    },
    OrdeUuserCancel() {
      orderWarehouse({
        id: this.cancel.id,
        remark: this.remark
      })
        .then((res) => {
          uni.showToast({
            title: "操作成功",
            icon: "success",
            duration: 2000,
          });
          this.cancel = null
          this.orderArr = []
          this.page = 1
          this.getData()
        })
        .catch((content) => {
          uni.showModal({
            title: "提示",
            content,
            showCancel: false,
            confirmColor: "#F55547",
          });
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
.Model-content {
  text-align: center;
  .subscribe-type-text {
    color: $uni-text-color-pending;
  }
  .pending {
    color: #f1b350;
  }
  .receive {
    color: #71d5a1;
  }
  .reject {
    color: #f55547;
  }
}
.dialog-content{
  display: flex;
  flex-direction: column;
  .dialog-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1rpx solid #EDEEEE;
  }
  .dialog-intro_textarea{
    // all: unset;
    width: 100%;
    background-color: #F3F3F3;
  }
}
 .claimGoods {
    color: #f1b350;
  }
  .delivery {
    color: #358fee;
  }
      .pending_text {
      color: $uni-text-color-pending;
    }
    .receive_text {
      color: #71d5a1;
    }
    .reject_text {
      color: #f55547;
    }
</style>
