//app.js
App({
  onLaunch: function () {
    var that = this;
    // // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.getUserInfo({
          success: function (res) {
            var simpleUser = res.userInfo;
            that.globalData.userInfo = simpleUser;
          }
        });
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    
    
    // 获取网络改变状态
    wx.onNetworkStatusChange(function (res) {
      if(res.networkType == "none") {
        wx.reLaunch({
          url: '/pages/error/error',
        })
      } else {
        wx.reLaunch({
          url: '/pages/index/index',
        })
      }
    })

    // 请求数据,获得返回数据存放在全局变量中
    // wx.request({
    //   url: 'test.action', //仅为示例，并非真实的接口地址
    //   data: {
    //     x: '',
    //     y: ''
    //   },
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success: function (res) {
    //     that.globalData.isLoading = false;
    //   },
    //   fail: function (res ) {
    //     that.globalData.isLoading = true;
    //   }
    // })
  },
  globalData: {
    userInfo: null,
    isLoading: false
  }
})