const baseurl="https://m.yaojunrong.com"
const fetch={
  http(url,data,method){
    return new Promise((resolve,reject)=>{
      let token=wx.getStorageSync("token");
      let header = {
        "content-type": "application/json"
      };
      if(token){
        header.token=token
      }
      wx.request({
        url: baseurl + url,
        data,
        method,
        header,
        success(res){
          if(res.header.Token){
            wx.setStorageSync("token", res.header.Token)
          }
          resolve(res.data)
        },
        fail(err){
          reject(err)
        }
      })
    })
  },
  get(url,data){
    return this.http(url,data,'GET')
  },
  post(url,data){
    return this.http(url, data, 'POST')
  }
}
const login=()=>{
  wx.login({
    success: function(res) {
      fetch.post('/login',{
        code:res.code,
        appid:'wxc44109f1a1225158',
        secret:'3a72404026422149fb7a5e10c3d6dc43'
      }).then(res=>{
        console.log(res)
      })
    }
  })
}

exports.login=login;
exports.fetch=fetch
