// pages/catalog/catalog.js
import {fetch} from "../../utils/util.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookId:"",
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      bookId:options.id
    }),
    this.getData()

  },
  getData(){
    fetch.get(`/titles/${this.data.bookId}`).then(res=>{
      this.setData({
        list:res.data
      })
    })
  },
  lookContent(event){
    let id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/content/content?id=${id}&bookId=${this.data.bookId}`,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})