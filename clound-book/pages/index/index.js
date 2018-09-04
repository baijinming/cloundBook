//index.js
//获取应用实例
const app = getApp()
import {fetch} from "../../utils/util.js"

Page({
  data: {
    isLoading:false,
    swiperData:[],
    content:[],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 500
  },
  onLoad: function () {
    this.getData()
  },
  getData(){
    this.setData({
      isLoading:true
    })
    fetch.get("/swiper").then(res=>{
      this.setData({
        swiperData:res.data
      })
    }),
    fetch.get("/category/books").then(res => {
      this.setData({
        content: res.data,
        isLoading:false
      })
    }).catch(err=>{
      this.setData({
        isLoading: false
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
