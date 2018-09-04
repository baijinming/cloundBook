//index.js
//获取应用实例
const app = getApp()
import {fetch} from "../../utils/util.js"

Page({
  data: {
    swiperData:[],
    content:[],
    indicatorDots: true,
    autoplay: false,
    interval: 1000,
    duration: 300

  },
  onLoad: function () {
    this.getData()
  },
  getData(){
    fetch.get("/swiper").then(res=>{
      this.setData({
        swiperData:res.data
      })
    }),
    fetch.get("/category/books").then(res => {
      this.setData({
        content: res.data
      })
    })
  },
  jumpbook(event){
    let id=event.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/details/details?id=${id}`,
    })
  }
})
