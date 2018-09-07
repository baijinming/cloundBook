// pages/collect/collect.js
import { fetch } from "../../utils/util.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoading: false,
    books: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
  },
  getData() {
    return new Promise((resolve, reject) => {
      this.setData({
        isLoading: true
      });
      fetch.get("/readList").then(res => {
        resolve(res)
        let books = [...res.data];
        books.forEach(item=>{
          item.title.percent = parseInt((item.title.index / item.title.total)*100);
          item.createdTime = item.createdTime.slice(0, 10)
        })
        this.setData({
          books: books,
          isLoading: false,
        })
      })
    })
  },
  //继续阅读
  readMore(event){
    let id = event.currentTarget.dataset.id;
    let bookId = event.currentTarget.dataset.bookid;
    wx.navigateTo({
      url: `/pages/content/content?id=${id}&bookId=${bookId}`,
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
      wx: wx.stopPullDownRefresh()
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})