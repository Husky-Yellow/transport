<template>
  <view class="p-t-40 p-l-20 p-r-20">
    <view class="iphone m-b-30 p-30">
      <input type="number" placeholder="输入手机号" :value="phonenum" />
    </view>
    <view class="password p-30">
      <input type="password" placeholder="请输入密码" v-model="password" />
    </view>
    <view class="login-btn fz-40" @click="Login()">登录</view>
  </view>
</template>

<script>
export default {
  data: () => ({
    phonenum: "",
    password: "",
  }),
  methods: {
    // 密码登录
    Login() {
      if (!this.phonenum || !this.isMobile(this.phonenum)) {
        uni.showToast({
          title: "请输入正确电话号码",
          icon: "none",
        });
        return false;
      }
      if (!this.password) {
        uni.showToast({
          title: "请输入密码",
          icon: "none",
        });
        return false;
      }
      this.$store
        .dispatch("user/login", {
          phonenum: this.phonenum,
          password: this.password,
        })
        .then(() => {
          uni.switchTab({
            // 跳转到新闻页面
            url: "/index/index",
          });
        })
        .catch(() => {
          uni.showToast({
            title: "登录失败",
            icon: "none",
          });
        });
    },
    // 判断是否是正确的手机号码
    isMobile(str) {
      let reg = /^1\d{10}$/;
      return reg.test(str);
    },
  },
};
</script>

<style scoped lang="scss">
.login-content input {
  height: 50rpx;
  border-radius: 25rpx;
  text-align: left;
  box-sizing: border-box;
  font-size: 15rpx;
}

.iphone,
.password {
  background: $uni-bg-color-white;
  border-bottom: 1rpx solid $uni-bg-color-border;
}

.login-btn {
  width: calc(100% - 36rpx);
  height: 100rpx;
  background: $uni-bg-color-primary;
  border-radius: 10rpx;
  color: $uni-text-color-inverse;
  text-align: center;
  line-height: 100rpx;
  position: fixed;
  bottom: 60rpx;
}
</style>
