//index.js
//获取应用实例
const app = getApp()
import baseApi from '../../api/index.js';
import checkLogin from '../../utils/checked';

Page({
  data: {
    listData: [],
    isShowProduction: false,
    pageNo: 1,
    totalPage: 1,
    queryForm: {
      code: '',
      userphone: '',
      username: '',
    }
  },
  onLoad: function () {
    this.getList()
  },
  onPullDownRefresh: function () {
    this.setData({
      listData: [],
      pageNo: 1
    })
    this.getList()
  },
  onReachBottom() {
    if(this.data.pageNo >= this.data.totalPage) {
      wx.showToast({
        title: '暂无更多数据',
        icon: 'none',
        duration: 1000
      })
    }
    else {
      this.setData({
        pageNo: this.data.pageNo + 1
      })
      this.getList()
    }
  },
  getList() {
    baseApi.findOwnHelmetPage({
      pageSize: 20,
      pageNo: this.data.pageNo,
      param: this.data.queryForm
    }).then((res) => {
      const data = res.visiableHelmets.page
      this.setData({
        listData: this.data.listData.concat(data.data),
        totalPage: data.totalPage
      })
      wx.stopPullDownRefresh();
    })
  },
  getInputVal(value) {
    const typeName = value.detail.currentTarget.dataset.id
    const currVale = value.detail.detail.value
    const K1 = 'queryForm.code'
    const K2 = 'queryForm.username'
    const K3 = 'queryForm.userphone'
    if (typeName) {
      if (typeName == 'code') {
        this.setData({
          [K1]: currVale
        })
      }
      if (typeName == 'username') {
        this.setData({
          [K2]: currVale
        })
      }
      if (typeName == 'userphone') {
        this.setData({
          [K3]: currVale
        })
      }
    }
  },
  add() {
    if(checkLogin()) {
      wx.navigateTo({
        url: 'addHat'
      })
    }
  },
  search() {
    this.setData({
      isShowProduction: true
    })
  },
  sureGo() {
    this.setData({
      listData: [],
      pageNo: 1
    })
    this.getList()
    this.cancel()
  },
  ressureGo() {
    this.setData({
      listData: [],
      pageNo: 1,
      queryForm: {
        code: '',
        userphone: '',
        username: '',
      }
    })
    this.getList()
    this.cancel()
  },
  cancel() {
    this.setData({
      isShowProduction: false
    })
  },
})
