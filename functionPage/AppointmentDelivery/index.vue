<template>
  <view class="p-t-2">
    <DataSelect @select="selectData" :scrollDate="scrollDate" />
    <view class="add-view p-24">
      <view class="add-form p-20 fz-28">
        <view class="add-form-time">
          <view
            v-for="(item, index) in timeArr"
            :key="index"
            :class="[
              'p-t-24 p-b-24 m-20',
              item.num == 2 ? 'full' : '',
              time == item.time_str ? 'active' : '',
            ]"
            @click="item.num != 2 ? changeTime(item) : ''"
          >
            {{ item.time_str }}
            <text v-if="item.num == 2" class="p-l-10" style="color:#999">(约满)</text>

          </view>
        </view>
        <view v-if="type === 1" class="form-view-item p-22">
          <view>
            <image
              mode="scaleToFill"
              class="m-r-10"
              src="@/static/num_icon@2x.png"
            />
            送货单号
          </view>
          <view>
            <picker @change="pickerChange" :value="pickerIndex" :range="array">
              <view
                :class="[
                  'picker fz-28',
                  pickerIndex !== -1 ? '' : 'grey-text',
                ]">
                {{pickerIndex !== -1 ? array[pickerIndex] : "请选择"}}
              </view>
            </picker>
            <view class="arrow right"></view>
          </view>
        </view>
        <view class="form-view-item p-22">
          <view>
            <image
              mode="scaleToFill"
              class="m-r-10"
              src="@/static/number.png"
            />
            数量
          </view>
          <input type="number" v-model="num" placeholder="请输入送货数量" />
        </view>
        <view v-if="type !== 3" class="form-view-item p-22">
          <view>
            <image
              mode="scaleToFill"
              class="m-r-10"
              src="@/static/people.png"
            />
            送货员
          </view>
          <view>
            <input
              type="text"
              disabled
              v-model="selectDriver.name"
              placeholder="请输入姓名"
            />
            <image
              mode="scaleToFill"
              class="m-l-20"
              src="@/static/avatar.png"
              @click="goList('DriverList')"
            />
          </view>
        </view>
        <view v-if="type !== 3" class="form-view-item p-22">
          <view>
            <image
              mode="scaleToFill"
              class="m-r-10"
              src="@/static/iphone.png"
            />
            手机号
          </view>
          <input
            type="text"
            disabled
            v-model="selectDriver.tel"
            placeholder="请输入手机号"
          />
        </view>
        <view v-if="type !== 3" class="form-view-item p-22">
          <view>
            <image
              mode="scaleToFill"
              class="m-r-10"
              src="@/static/plateNumber.png"
            />
            车牌号
          </view>
          <input
            type="text"
            disabled
            v-model="selectDriver.license_plate"
            placeholder="请输入车牌号"
          />
        </view>
        <view v-if="type === 3" class="form-view-item p-22">
          <view>
            <image
              mode="scaleToFill"
              class="m-r-10"
              src="@/static/plateNumber.png"
            />
            返修员
          </view>
          <view>
            <text></text>
            <image
              mode="scaleToFill"
              @click="goList('RepairList')"
              class="m-r-10"
              src="@/static/add@2x.png"
            />
          </view>
        </view>
        <view
          v-if="type === 3"
          class="list-item-body_intro p-t-10 p-b-10 fz-24 p-l-20"
        >
          <view v-for="(item, index) in selectPeople" :key="index"
            >{{ item.name }}：{{ item.tel }}</view
          >
        </view>
      </view>
      <button class="p-28 m-t-30" @click="submitFrom">确定</button>
    </view>
  </view>
</template>

<script>
import DataSelect from "@/components/DataSelect";
import { orderOrderAdd, orderShow } from "@/api";
import { isVehicleNumber, isMobile } from "@/utils/index";
const TITLEMAP = {
  delivery: {
    text: "预约送货",
    type: 1,
  },
  claimGoods: {
    text: "预约取货",
    type: 2,
  },
  repair: {
    text: "预约返修",
    type: 3,
  },
};
export default {
  components: {
    DataSelect,
  },
  data: () => ({
      showArr: [],
      timeArr: [],
      scrollDate: [],
      type: "",
      date: "",
      time: "",
      num: "",
      personnel: "",
      selectPeopleArr: [],
      selectDriver: [],
      selectPeople: 0,
      array: ['18842886766','18842886766','18842886766','18842886766'],
      pickerIndex: -1
  }),
  async onShow(){
    this.selectPeopleArr = await uni.getStorageSync('selectPeopleArr')
    this.selectPeople = (this.selectPeopleArr || []).filter((item) => item.click)
    this.selectDriver = await uni.getStorageSync('selectDriver')

  },
  onLoad(e) {
    this.type = TITLEMAP[`${e.type}`].type;
    uni.setNavigationBarTitle({
      title: TITLEMAP[`${e.type}`].text || "预约",
    });
    this.getOrderShow();
  },
  methods: {
    getOrderShow() {
      orderShow().then((res) => {
        this.scrollDate = res.ret.map((item) => {
          return Object.freeze({
            week: `周${item.date_name.substring(2, 3)}`,
            month: `${item.date_sub.substring(0, 2)}`,
            day: `${item.date_sub.substring(3, 5)}`,
            date: item.date,
          });
        });
        this.showArr = res.ret.map((item) => Object.freeze(item));
        this.selectData(this.scrollDate[0], 0);
      });
    },
    changeTime(item) {
      this.time = item.time_str;
    },
    selectData(item, index) {
      this.date = item.date;
      this.timeArr = this.showArr[index].son.map((item) =>
        Object.freeze({ num:item.num, time_str: item.time_str, id: item.id })
      );
    },
    pickerChange(e) {
      this.pickerIndex = e.detail.value
    },
    submitFrom() {
      if (!this.time) {
        return uni.showToast({
          title: "请选择送货时间",
          icon: "none",
        });
      }
      if (!this.num || this.num == 0) {
        uni.showToast({
          title: "请输入送货数量",
          icon: "none",
        });
        return false;
      }
      if (this.type === 1) {
        if (this.pickerIndex === -1) {
        uni.showToast({
          title: "请选择送货单号",
          icon: "none",
        });
        return false;
        }
      }
      if (this.type !== 3) {
        if (!this.selectDriver.id) {
          return uni.showToast({
            title: "请选择送货员",
            icon: "none",
          });
        }
        if (!this.selectDriver.name) {
          return uni.showToast({
            title: "请输入送货员姓名",
            icon: "none",
          });
        }
        if (!this.selectDriver.tel || !isMobile(this.selectDriver.tel)) {
          return uni.showToast({
            title: "请输入送货员手机号",
            icon: "none",
          });
        }
        if (!this.selectDriver.license_plate || !isVehicleNumber(this.selectDriver.license_plate)) {
          return uni.showToast({
            title: "请输入送货员车牌号",
            icon: "none",
          });
        }
      } else {
        if (!this.selectPeople.length) {
          return uni.showToast({
            title: "请选择返修员",
            icon: "none",
          });
        }
      }
      const param = {
        type: this.type,
        date: this.date,
        time: this.time,
        num: this.num,
        factory_name: uni.getStorageSync('referrerInfo') ? uni.getStorageSync('referrerInfo').factory_name : '',
        username:uni.getStorageSync('referrerInfo') ? uni.getStorageSync('referrerInfo').name : '--',
        personnel:
          this.type !== 3
            ? this.selectDriver.id
            : this.selectPeople.map((item) => item.id).toString(),
      };
      if (this.type === 1) {
        param['delivery_note'] = this.array[this.pickerIndex]
      }
      console.log('预约参数', {param});
      orderOrderAdd(param)
        .then((res) => {
          if (res.ret === true) {
            uni.setStorageSync('selectDriver',{
                name: "",
                tel: "",
                license_plate: "",
              })
            uni.setStorageSync('selectPeopleArr',[])
            uni.showToast({
              title: "预约成功",
              icon: "success",
            });
            setTimeout(() => {
              uni.switchTab({
                url: "/pages/index/index",
              });
            }, 1000);
          }
          if (res.ret.original.code === 105 || res.ret.original.code === 104) {
            return uni.showModal({
              title: "提示",
              content: res.ret.original.message,
              showCancel: false,
              confirmColor: "#F55547",
            });
          }

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
    goList(list) {
      uni.navigateTo({
        url: `/functionPage/${list}/index?type=${this.type}`,
      });
    },
  },
};
</script>

<style scoped lang="scss">
.add-form {
  border-radius: 8rpx;
  height: auto;
  background-color: $uni-bg-color-white;
  .add-form-time {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    text-align: center;
    view {
      border: 1rpx solid $uni-border-color-time;
      border-radius: 8rpx;
    }
    .full {
      background-color: #d4d4d4;
      color: #fff;
    }
    .active {
      background-color: $uni-color-active;
      color: $uni-text-color-inverse;
    }
  }
  .form-view-item {
    @include space-between;
    border-bottom: 1rpx solid $uni-bg-color-border;
    image {
      width: 44rpx;
      height: 44rpx;
      vertical-align: middle;
    }
    input {
      text-align: right;
    }
    view {
      display: flex;
      align-items: center;
    }
    .arrow{
      border-top:2rpx solid ;
      border-right:2rpx solid ;
    }
  }
  .form-view-item:last-child {
    border-bottom: none;
  }
  .list-item-body_intro {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    view {
      width: 48%;
      padding-right: 10rpx;
      margin-top: 10rpx;
    }
    view:nth-of-type(odd) {
      border-right: 1rpx solid $uni-bg-color-border;
    }
    view:nth-of-type(even) {
      padding-left: 40rpx;
    }
  }
}
button {
  background-color: $uni-bg-color-primary;
  color: $uni-text-color-inverse;
  width: 100%;
  text-align: center;
}

</style>
