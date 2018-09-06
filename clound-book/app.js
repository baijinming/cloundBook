//app.js
const Towxml=require("/towxml/main.js");
import {login} from "/utils/util.js"

App({
  towxml:new Towxml(),
  onLaunch:function(){
    login()
  }
})