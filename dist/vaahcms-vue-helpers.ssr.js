'use strict';Object.defineProperty(exports,'__esModule',{value:true});function _interopDefault(e){return(e&&(typeof e==='object')&&'default'in e)?e['default']:e}require('axios');var moment=_interopDefault(require('moment'));require('nprogress');var VaahCms = {
  options: {},
  //---------------------------------------------------------------------
  //---------------------------------------------------------------------
  setOptions: function setOptions (options) {
    this.options = options;
    return this
  },
  //---------------------------------------------------------------------
  console: function()
  {
    console.log('helper');
  },
  //---------------------------------------------------------------------
  currentDate: function () {
    return moment().format('YYYY-MM-DD')
  }
  //---------------------------------------------------------------------
  //---------------------------------------------------------------------
  //---------------------------------------------------------------------


};


var entry = {
  install: function (Vue, options) {
    var vaahcms = VaahCms.setOptions(options);
    Vue.prototype.$vaahcms = vaahcms;
    Vue.vaahcms = vaahcms;
  }
};exports.default=entry;