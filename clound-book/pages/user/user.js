// pages/user/user.js
import {fetch,login} from "../../utils/util.js"

Page({
  data: {
    collect: "",
    isLoading: false
  },
  onLoad: function (options) {
    this.setData({
      isLoading: true
    })
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
              this.setData({
                isLoading: false
              })
            }
          })
        }
      }
    })
    this.getData()
  },
  getData() {
    return new Promise((resolve,reject)=>{
      this.setData({
        isLoading: true
      })
      fetch.get("/collection/total").then(res => {
        resolve()
        this.setData({
          collect: res.data,
          isLoading: false
        })
      })
    })
  },
  //跳转收藏页面
  jumpCollect(){
    wx.navigateTo({
      url: '/pages/collect/collect',
    })
  },
  //用户登录
  userLogin(){
    login()
  },
  //下拉刷新
  onPullDownRefresh() {
    this.getData().then(res => {
      wx: wx.stopPullDownRefresh()
    })
  },

  
})