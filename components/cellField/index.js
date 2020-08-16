//logs.js
const util = require('../../utils/util.js')
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showLeftIcon:{
      type: String,
      value: ''
    },
    titleStyle: {
      type: String,
      value: ''
    },
    rightTitle: {
      type: String,
      value: ''
    },
    rightTip: {
      type: String,
      value: ''
    },
    border: {
      type: Boolean,
      value: false
    },
    topBorder: {
      type: Boolean,
      value: false
    },
    showArrow: {
      type: Boolean,
      value: false
    },
    rightTipAk: {
      type: Boolean,
      value: false
    },
    placeholder: {
      type: String,
      value: ""
    },
    inputType: {
      type: String,
      value: 'text'
    },
    isRedDot: {
      type: Boolean,
      value: false
    },
  },

  
  methods: {
  
  }
})
