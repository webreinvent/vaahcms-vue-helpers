import axios from 'axios';
import moment from 'moment'
import NProgress from 'nprogress'

const VaahCms = {
  options: {},
  //---------------------------------------------------------------------
  //---------------------------------------------------------------------
  setOptions (options) {
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


export default {
  install: function (Vue, options) {
    let vaahcms = VaahCms.setOptions(options);
    Vue.prototype.$vaahcms = vaahcms;
    Vue.vaahcms = vaahcms;
  }
}