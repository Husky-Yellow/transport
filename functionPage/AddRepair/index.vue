<template>
    <view class="p-24">
        <view class="form-view p-20 fz-28">
            <view class="form-view-item p-22">
                <view>
                    <image mode="scaleToFill" class="m-r-10" src="@/static/plateNumber.png" />
                    返修员
                </view>
                <input type="nickname" v-model="name"  placeholder="请输入姓名"/>
            </view>
            <view class="form-view-item p-22">
                <view>
                    <image mode="scaleToFill" class="m-r-10" src="@/static/iphone.png" />
                    手机号
                </view>
                <input type="number" v-model="tel"  :maxlength="11" placeholder="请输入手机号"/>
            </view>
        </view>
        <button class="p-28 m-t-80" @click="submitUserStaff">{{id ? '修改' : '添加'}}</button>
    </view>
</template>


<script>
import { userStaffEditPost } from "@/api";

export default {
  data: () => ({
    id: '',
    tel: '',
    name: '',
  }),
  onLoad(e) {
    this.id = e.id
    this.tel = e.tel
    this.name = e.name
  },
  methods: {
    submitUserStaff() {
      if (!this.name) {
          uni.showToast({
            title: '请填写姓名',
            icon: 'error'
          })
          return
      }
      if (!this.tel) {
          uni.showToast({
            title: '请填写手机号',
            icon: 'error'
          })
          return
      }
      userStaffEditPost({
        type: 2,
        id: this.id,
        tel: this.tel,
        name: this.name,
      }).then(() => {
        uni.showToast({
            title: `${this.id ? '修改成功' : '添加成功'}`,
            icon: 'success'
        })
        setTimeout(() => {
          uni.navigateBack({
            delta:1,
          })
        }, 1000);
      })
    },
  },
};
</script>

<style scoped lang="scss">
.form-view{
    background-color: $uni-bg-color-white;
    height: 70vh;
    border-radius: 8rpx;
    .form-view-item{
        @include space-between;
        border-bottom: 1rpx solid $uni-bg-color-border;
        image{
            width: 40rpx;
            height: 40rpx;
            vertical-align:middle;
        }
        input{
            text-align: right;
        }
    }
    .form-view-item:last-child {
      border-bottom: none;
    }
}
button{
    background-color: $uni-bg-color-primary;
    color: $uni-text-color-inverse;
    width: 100%;
    text-align: center;
}
</style>