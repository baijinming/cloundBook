const baseurl="https://m.yaojunrong.com"
const fetch={
  http(url,data,method){
    return new Promise((resolve,reject)=>{
      wx.request({
        url: baseurl + url,
        data,
        method,
        header: {
          "content-type": "application/json"
        },
        success(res){
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
  }
}

exports.fetch=fetch
