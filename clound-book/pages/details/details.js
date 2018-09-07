// pages/details/details.js

import { fetch } from "../../utils/util.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoading: false,
    bookId:"",
    book:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      bookId:options.id
    })
    this.getData()
  },
  getData(){
    this.setData({
      isLoading: true
    })
    fetch.get(`/book/${this.data.bookId}`).then(res=>{
      let book = { ...res};
      book.data.updateTime = book.data.updateTime.slice(0,10)
      this.setData({
        book:book,
        isLoading: false
      })
    }).catch(err => {
      this.setData({
        isLoading: false
      })
    })
  },
  //跳转目录
  lookCatalog(event){
    let id=event.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/catalog/catalog?id=${id}`,
    })
  },
  //切换收藏状态
  toggleCollect(){
    let newBook = { ...this.data.book};
    if(!newBook.isCollect){
      newBook.isCollect = 1;
      fetch.post("/collection", { bookId:this.data.bookId})
    }else{
      newBook.isCollect = 0;
      fetch.post("/collection/delete", { arr:[this.data.bookId]})
    }
    this.setData({
      book:newBook
    })
  },

  

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    return{
      title:this.data.book.data.title,
      path:`/pages/details/details?id=${this.data.book.data._id}`,
      imageUrl:this.data.book.data.img
    }
  }
})