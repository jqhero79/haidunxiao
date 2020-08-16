import { localStorageType } from '../store/types'
import exitDialog from '../utils/exitDialog'
const METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
}
let ajaxTimes = 0
class Request {
  _baseUrl = null

  /**
   * url 请求地址
   * method 请求方式
   * header 请求头
   * data 请求参数
   * needToken 请求是否需要带上token
   * needToast 是否显示请求提示
   * toastMessage 请求提示内容
   */
  request({ url, method, header = {}, data, needToken }) {
    ajaxTimes++
    wx.showLoading({
      title: '正在加载数据',
      mask: true
    })
    return new Promise((resolve, reject) => {
      const token = wx.getStorageSync(localStorageType.token)
      const _header = {}
      const _data = {}

      if (needToken) {
        if (token && token != null && token !== '') {
          _header[localStorageType.token] = token
          _data[localStorageType.token] = token
          //无需携带token的请求 不携带token
        }
      }

      wx.request({
        url: (this._baseUrl || '') + url,
        method: method || METHOD.GET,
        data: {
          ..._data,
          ...data
        },
        header: {
          ..._header,
          ...header,
          "Authorization": "Bearer"
        },
        success: res => {
          if (res && res.statusCode != 200) {
            //登录超时，退出登录
            if(res.data.message == 'overtoken') {
              exitDialog.showExitDialog()
              return
            }
            if (token && token != null && token !== '') {
              wx.showToast({
                icon: "none",
                title: "网络异常",
                duration: 3500
              })
            }
            return reject(res);
          } else {
            if (res.data.code == '0') {
              return resolve(res);
            } else {
              //登陆失效情况信息
              if (res.data.code === '10006' || res.data.code === '10008' || res.data.code === '10010') {
                exitDialog.showExitDialog()
              } else if (res.data.code === '10009') {
                //刷新token
                //将新token存入Storage
                wx.setStorageSync(localStorageType.token, res.data.res.token)
                //重新请求
                this.request({ url, method, header, data }).then(res => { resolve(res) })
              }
              else {
                wx.showToast({
                  icon: "none",
                  title: res.data.message,
                  duration: 3500
                })
                return reject(res);
              }
            }
          }
        },
        fail: reject,
        complete: () => {
          ajaxTimes--
          if (ajaxTimes === 0) {
            wx.hideLoading()
          }
        }
      })
    })
  }

  /**
   * 上传文件
   */
  uploadFile({ url, header = {}, data, filePath }) {
    wx.showLoading({
      title: '正在加载数据',
      mask: true
    })
    return new Promise((resolve, reject) => {
      const token = wx.getStorageSync(localStorageType.token)
      const _header = {}
      if (token && token != null && token !== '') {
        _header[localStorageType.token] = token
      }
      wx.uploadFile({
        url: (this._baseUrl || '') + url,
        filePath: filePath,
        name: 'file',
        header: {
          ..._header,
          ...header,
          "Content-Type": "multipart/form-data",
        },
        formData: data,
        success: res => resolve(res),
        fail: reject,
        complete: () => {
          wx.hideLoading()
        }
      })
    })
  }

  get(url, data, header, needToken, needToast, toastMessage) {
    return this.request({ url, method: METHOD.GET, header, data, needToken, needToast, toastMessage }).then(result => {
      result.errMsg = '网络异常'
      return result
    })
  }

  post(url, data, header, needToken, needToast, toastMessage) {
    return this.request({ url, method: METHOD.POST, header, data, needToken, needToast, toastMessage }).then(result => {
      result.errMsg = '网络异常'
      return result
    })
  }

  /**
   * 处理返回处理后的业务数据，不需要再判断小程序自己的那一套数据，
   */
  postP(url, data, needToken, needToast, toastMessage) {
    return this.post(url, data, {}, needToken, needToast, toastMessage).then((result) => {
      if (result && result.data) {
        if (result.data.code == "0") {
          return result.data.res
        } else {
          //此处一般为服务端传递过来业务逻辑的异常信息
          let error = new ReferenceError(result.data.message);
          error.code = result.data.code;
          throw error
        }
      } else {
        throw new ReferenceError("获取数据失败")
      }
    })
  }
  getP(url, data, needToken, needToast, toastMessage) {
    return this.get(url, data, {}, needToken, needToast, toastMessage).then((result) => {
      if (result && result.data) {
        if (result.data.code == "0") {
          return result.data.res
        } else {
          //此处一般为服务端传递过来业务逻辑的异常信息
          let error = new ReferenceError(result.data.message);
          error.code = result.data.code;
          throw error
        }
      } else {
        throw new ReferenceError("获取数据失败")
      }
    })
  }
  put(url, data, header) {
    return this.request({ url, method: METHOD.PUT, header, data })
  }
  delete(url, data, header) {
    return this.request({ url, method: METHOD.DELETE, header, data })
  }

  baseUrl(baseUrl) {
    this._baseUrl = baseUrl
    return this
  }
  interceptor(f) {
    if (typeof f === 'function') {
      this.interceptors.push(f)
    }
    return this
  }
}
export default new Request
export { METHOD }