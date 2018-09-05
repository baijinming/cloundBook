// pages/content/content.js
import { fetch } from "../../utils/util.js";
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    article:{},
    isLoading: false,
    bookId: "",
    catalog:[],
    isShow:false,
    fontSize:32,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id,
      bookId:options.bookId
    })
    this.getData()
  },
  getData(){
    this.setData({
      isLoading:true
    })
    fetch.get(`/article/${this.data.id}`).then(res=>{
      let data = app.towxml.toJson(res.data.article.content, 'markdown');
      data.theme = 'light';
      this.setData({
        article:data,
        isLoading:false
      })
    }).catch(err=>{
      this.setData({
        isLoading: false
      })
    })
    fetch.get(`/titles/${this.data.bookId}`).then(res => {
      this.setData({
        catalog: res.data
      })
    })
  },
  //显示目录
  showCatalog(){
    this.setData({
      isShow:true,
    })
  },
  //隐藏目录
  hideCatalog(){
    this.setData({
      isShow: false,
    })
  },
  //切换指定章节
  cutChapter(event){
    this.hideCatalog();
    let chaptorid = event.currentTarget.dataset.id;
    this.setData({
      id: chaptorid
    });
    this.getData();
  },
  //切换章节，上一章/下一章
  toggleChaptor(event){
    let num = parseInt(event.currentTarget.dataset.num);
    let newIndex;
    this.data.catalog.forEach((item,index)=>{
      if(item._id==this.data.id){
        newIndex=index+num
      }
    })
    if(this.data.catalog[newIndex]){
      this.setData({
        id: this.data.catalog[newIndex]._id,
        isShow: false
      })
      this.getData()
    }else{
      
    }
    
  },
  //改变字体大小
  addSize(){
    if(this.data.fontSize<50){
      this.setData({
        fontSize: this.data.fontSize + 2
      })
    }
  },
  reduceSize() {
    if(this.data.fontSize>24){
      this.setData({
        fontSize: this.data.fontSize - 2
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