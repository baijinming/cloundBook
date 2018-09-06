// pages/allbooks/allbooks.js
import {fetch} from "../../utils/util.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:{},
    typeId:"",
    pn:1,
    hasMore:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      typeId: options.typeId
    })
    this.getData()
  },
  getData(){
    fetch.get(`/category/${this.data.typeId}/books`, { pn: this.data.pn, size: 6 }).then(res=>{
      this.setData({
        content:res
      })
      if (res.data.books.length < 6) {
        this.setData({
          hasMore: false
        })
      }
    })
  },
  //查看书籍
  jumpbook(event) {
    let id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/details/details?id=${id}`,
    })
  },
  //下拉刷新
  onPullDownRefresh() {
    this.getData().then(res => {
      this.setData({
        hasMore: true,
        pn: 1
      })
      wx: wx.stopPullDownRefresh()
    })
  },
  //获取更多书籍
  getMorebooks() {
    return new Promise((resolve, reject) => {
      this.setData({
        pn: this.data.pn + 1
      })
      fetch.get(`/category/${this.data.typeId}/books`, { pn: this.data.pn, size: 6 }).then(res => {
        resolve(res);
        let newObject = {...this.data.books, ...res};
        this.setData({
          content: newObject,
        })
      })
    })
  },
  //上拉刷新
  onReachBottom: function () {
    if (this.data.hasMore) {
      this.getMorebooks().then(res => {
        if (res.data.length < 6) {
          this.setData({
            hasMore: false
          })
        }
      })
    }
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