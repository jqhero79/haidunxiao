import {envir_Status} from '../store/types.js';
if (envir_Status.value){
	//线上环境
  module.exports={
		baseApiUrl: 'http://jqhero79.natappvip.cc/miniapi'
  }
}else{
		//测试环境
  module.exports = {
    baseApiUrl: 'http://jqhero79.natappvip.cc/miniapi'
  }

}