import { localStorageType } from '../../store/types'

Page({
  data: {
    userInfo: ''
  },
  onLoad: function (options) {
    let userInfo = wx.getStorageSync(localStorageType.userInfo)
    if(!userInfo) {
      wx.navigateTo({
        url: '/pages/auth/auth'
      })
    }
  },
  onShow: function () {
    this.setData({
      userInfo: wx.getStorageSync(localStorageType.userInfo)
    })
  },
  login() {
    wx.navigateTo({
      url: '/pages/auth/auth'
    })
  }
})