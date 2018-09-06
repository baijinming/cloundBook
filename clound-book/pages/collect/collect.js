// pages/collect/collect.js
import {fetch} from "../../utils/util.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoading: false,
    books:[],
    pn:1,
    hasMore:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
  },
  getData(){
    return new Promise((resolve,reject)=>{
      this.setData({
        isLoading:true
      });
      fetch.get("/collection", { pn: this.data.pn, size: 6 }).then(res => {
        resolve(res)
        this.setData({
          books: res.data,
          isLoading:false
        })
      })
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
      fetch.get("/collection", { pn: this.data.pn, size: 6 }).then(res => {
        resolve(res);
        let newArr = [...this.data.books, ...res.data];
        this.setData({
          books: newArr,
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})