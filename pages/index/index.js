// index.js
// 获取应用实例
const app = getApp()
var QQMapWX = require("../../utils/qqmap-wx-jssdk.min");
var qqmapsdk;
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    city: "",
    longitude: "", //经度
    latitude: ""  ,// 纬度
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    qqmapsdk = new QQMapWX({
      key: 'KVFBZ-GR2KD-PU344-H7WLB-MFV7Q-YOFFX'
    });
    this.getAddress()
  },
  getAddress(){
    this.getJingWeiDu();
  },
/**
   * 获取经纬度
   */
  getJingWeiDu() {
    let that = this;
    wx.getLocation({
      success(res) {
        console.log(res);
        that.setData({
          longitude: res.longitude,
          latitude: res.latitude
        }, () => {
          that.jingWeiduToDiZhi();
        });

      }
    })
  },
/**
   * 经纬度转换成地址
   */
  jingWeiduToDiZhi() {
    
    let that = this;
    // 调用接口
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: that.data.latitude,
        longitude: that.data.longitude
      },
      success: function(res){
        console.log("result")
        console.log(res);
        let tempData = res.result.address_component;
        that.setData({
          
          city: tempData.city,
        });
      },
      fail: function(error) {
        console.log("err")
        console.error(error);
      },
      complete: function(res) {
        console.log("complete")
        console.log(res);
      }
    })
  },



  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
