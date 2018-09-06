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
    duration: 500,
    pn:1,
    hasMore:true
  },
  onLoad: function () {
    this.getData()
  },
  getData(){
    return new  Promise((reslove,reject)=>{
      this.setData({
        isLoading: true
      })
      fetch.get("/swiper").then(res => {
        this.setData({
          swiperData: res.data
        })
      }),
        fetch.get("/category/books").then(res => {
          reslove()
          console.log(res.data)
          this.setData({
            content: res.data,
            isLoading: false
          })
        }).catch(err => {
          this.setData({
            isLoading: false
          })
        })
    })
  },
  //查看书籍
  jumpbook(event){
    let id=event.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/details/details?id=${id}`,
    })
  },
  //按照类别获取更多书籍
  getMore(event){
    let typeId = event.currentTarget.dataset.typeid;
    wx.navigateTo({
      url: `/pages/allbooks/allbooks?typeId=${typeId}`,
    })
  },
  //下拉刷新
  onPullDownRefresh(){
    this.getData().then(res=>{
      this.setData({
        hasMore:true,
        pn:1
      })
      wx: wx.stopPullDownRefresh()
    })
  },
  //获取更多书籍方法
  getMorebooks(){
    return new Promise((resolve,reject)=>{
      this.setData({
        pn:this.data.pn+1
      })
      fetch.get("/category/books",{pn:this.data.pn}).then(res => {
        resolve(res);
        let newArr=[...this.data.content,...res.data]
        this.setData({
          content: newArr,
        })
      })
    })
  },
  //上拉刷新
  onReachBottom(){
    if(this.data.hasMore){
      this.getMorebooks().then(res => {
        if (res.data.length < 2) {
          this.setData({
            hasMore: false
          })
        }
      })
    }
  }
})
