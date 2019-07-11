'use strict';Object.defineProperty(exports,'__esModule',{value:true});function _interopDefault(e){return(e&&(typeof e==='object')&&'default'in e)?e['default']:e}var axios=_interopDefault(require('axios')),moment=_interopDefault(require('moment')),NProgress=_interopDefault(require('nprogress')),alertify=_interopDefault(require('alertifyjs'));var VaahCms = {
  options: {},
  //---------------------------------------------------------------------
  //---------------------------------------------------------------------
  setOptions: function setOptions (options) {
    this.options = options;
    return this
  },
  //---------------------------------------------------------------------
  //---------------------------------------------------------------------
  ajax: function(url, params, callback, nprogress)
  {
    var this$1 = this;
    if ( nprogress === void 0 ) nprogress=true;

    if(nprogress)
    {
      NProgress.start();
      console.log('start nprogress');
    }
    console.log('ajax');
    axios.post(url, params)
        .then(function (response) {
          if(response.data.status == 'success')
          {
            if(response.data.messages)
            {
              this$1.messages(response.data.messages);
            }

            if(response.data.warnings)
            {
              this$1.warnings(response.data.warnings);
            }

            callback(response.data.data);
          } else
          {
            console.log(response);
            if(response.data.errors)
            {
              this$1.errors(response.data.errors);
            }

          }
        }).catch(function (error) {

      if(error.response && error.response && error.response.status === "419")
      {
        this$1.$helpers.console(error);
        this$1.errors(["Login expired, try to login again."]);

      } else if (error.response)
      {

        this$1.errors([error.response.data]);

        // Request made and server responded
        this$1.$helpers.console(error.response.data);
        this$1.$helpers.console(error.response.status);
        this$1.$helpers.console(error.response.headers);

      } else if (error.request) {

        // The request was made but no response was received
        this$1.$helpers.console(error.request);
        this$1.errors(['Server not responding']);

      } else {
        // Something happened in setting up the request that triggered an Error
        console.error(error);
        this$1.errors(["Error: check console"]);
      }

    });

  },
  //---------------------------------------------------------------------
  ajaxGet: function(url, params, callback, nprogress)
  {
    var this$1 = this;
    if ( nprogress === void 0 ) nprogress=true;

    if(nprogress)
    {
      NProgress.start();
      console.log('start nprogress');
    }

    window.axios.defaults.headers.common = {
      'X-Requested-With': 'XMLHttpRequest',
    };

    console.log('ajax');
    axios.get(url, params)
        .then(function (response) {
          if(response.data.status == 'success')
          {
            if(response.data.messages)
            {
              this$1.messages(response.data.messages);
            }

            if(response.data.warnings)
            {
              this$1.warnings(response.data.warnings);
            }

            callback(response.data.data);
          } else
          {
            console.log(response);
            if(response.data.errors)
            {
              this$1.errors(response.data.errors);
            }

          }
        });

  },
  //---------------------------------------------------------------------
  warnings: function (warnings) {
    $.each(warnings, function (index, object) {
      alertify.error(object);
    });
  },
  //---------------------------------------------------------------------
  errors: function (errors) {
    $.each(errors, function (index, error_objects) {

      alertify.error(error_objects);

    });
    this.stopNprogress();
  },
  //---------------------------------------------------------------------
  confirm: function(message, callback, data)
  {

    alertify.confirm(message, function(e){
      if (e) {
        callback(data);
      } else {
        return false;
      }
    });
  },
  //---------------------------------------------------------------------
  messages: function (messages) {
    $.each(messages, function (index, object) {
      alertify.success(object);
    });
  },
  //---------------------------------------------------------------------
  success: function (message) {
    if(message === undefined)
    {
      message = "success";
    }
    alertify.success(message);
  },
  //---------------------------------------------------------------------
  stopNprogress: function()
  {

    NProgress.done();
    /*this.$nextTick(function () {
        NProgress.done();
    });*/
  },
  //---------------------------------------------------------------------
  console: function (data, label) {

    var debug = $('#debug').attr('content');

    if(debug == 1)
    {
      if(label)
      {
        console.log(label, data);
      } else
      {
        console.log(data);
      }
    }
  },
  //---------------------------------------------------------------------
  findAndReplaceString:  function (find_string, replace_string, full_string ) {
    return full_string.replace(find_string, replace_string);
  },
  //---------------------------------------------------------------------
  findAndReplace: function(arr, key, data) {
    var index =null;
    for (var i = 0; i < arr.length; i++) {
      if(arr[i][key] == data[key])
      {
        index = i;
      }
    }

    if(index != null)
    {
      arr[index] = data;
      return arr;
    }

    return false;
  },
  //---------------------------------------------------------------------
  updateArray: function(array, updatedElement) {
    var index = array.indexOf(updatedElement);
    array[index] = updatedElement;
    return array;
  },

  //---------------------------------------------------------------------
  removeFromArray: function(arr, element) {
    var removeIndex = arr.map(function(item) { return item; }).indexOf(element);
    console.log('index', removeIndex);
    return arr.splice(removeIndex, 1);
  },

  //---------------------------------------------------------------------
  findInArrayByKey: function (array, key, value) {

    if(!Array.isArray(array))
    {
      return false;
    }

    var element = null;

    array.map(function(item, index) {

      if(item[key] == value)
      {
        element = item;
      }

    });

    return element;
  },
  //---------------------------------------------------------------------
  removeInArrayByKey: function (array, element, key) {

    if(!Array.isArray(array))
    {
      return false;
    }

    console.log("array===>", array);

    array.map(function(item, index) {

      if(item[key] == element[key])
      {
        array.splice(index, 1);
      }


    });

    return array;
  },
  //---------------------------------------------------------------------
  existInArray: function(array, element) {
    var index = array.indexOf(element);

    if(index == -1)
    {
      return false;
    } else
    {
      return true;
    }
  },
  //---------------------------------------------------------------------

  existInArrayByKey: function (array, element, key) {
    var exist = false;
    if(!Array.isArray(array))
    {
      return false;
    }
    array.map(function(item) {

      if(item[key] == element[key])
      {
        exist = true;
      }

    });

    return exist;
  },
  //---------------------------------------------------------------------
  splitString: function (string, characters) {

    if(string != "" && string != null)
    {
      if(string.length > characters){
        string = string.substring(0,characters)+"...";
      }
    }

    return string;
  },
  //---------------------------------------------------------------------
  formatDate: function (value) {
    if(!value)
    {
      return "";
    }
    return moment(value).format('YYYY-MM-DD');
  },
  //---------------------------------------------------------------------
  fromNow: function (value) {

    if(!value)
    {
      return null;
    }

    return moment(value).fromNow();
  },

  //---------------------------------------------------------------------
  currentDate: function () {
    return moment().format('YYYY-MM-DD')
  },
  //---------------------------------------------------------------------
  currentDateTime: function () {
    return moment().format('YYYY-MM-DD HH:mm:ss')
  },
  //---------------------------------------------------------------------
  dateForHumans: function (value) {
    if(!value)
    {
      return null;
    }
    return moment(value).format('ddd, MMM DD, YYYY')
  },
  //---------------------------------------------------------------------
  dateTimeForHumans: function (value) {

    if(!value)
    {
      return null;
    }

    return moment(value).format('YYYY-MM-DD hh:mm A')
  },
  //---------------------------------------------------------------------
  dateTimeForHumansWithDay: function (value) {
    if(!value)
    {
      return null;
    }
    return moment(value).format('YYYY MMM DD hh:mm A (dddd)')
  },
  //---------------------------------------------------------------------
  checkPermission: function (slug) {
    return this.permissions.indexOf(slug) > -1 ? true : false;
  },
  //---------------------------------------------------------------------
  paginate: function (event, page) {
    event.preventDefault();
    this.current_page = page;
    this.listLoader();
  },
  //---------------------------------------------------------------------
  makePagination: function (data) {
    this.pagination = Pagination.Init(data.last_page, this.current_page, 3);
  },
  //---------------------------------------------------------------------
  paginateIsActive: function (page) {
    if(page == this.current_page)
    {
      return true;
    }
    return false;
  },
  //---------------------------------------------------------------------
  toIndianFormat: function (nStr) {

    if(nStr < 0)
    {
      return nStr;
    }

    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    var z = 0;
    var len = String(x1).length;
    var num = parseInt((len/2)-1);

    while (rgx.test(x1))
    {
      if(z > 0)
      {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
      }
      else
      {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
        rgx = /(\d+)(\d{2})/;
      }
      z++;
      num--;
      if(num == 0)
      {
        break;
      }
    }
    return x1 + x2;
  },
  //---------------------------------------------------------------------
  currencyToSymbol: function (currency) {

    if(currency == "USD")
    {
      return "&#36;";
    } else if(currency == "INR")
    {
      return "&#8377;";
    } else
    {
      return currency;
    }
  },
  //---------------------------------------------------------------------
  setCookies: function (cookie_name, value, expiry_days) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiry_days);
    var c_value = escape(value) + ((expiry_days == null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = cookie_name + "=" + value;
  },
  //---------------------------------------------------------------------
  getCookies: function (cookie_name) {
    var i, x, y, ARRcookies = document.cookie.split(";");
    for (i = 0; i < ARRcookies.length; i++) {
      x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
      y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
      x = x.replace(/^\s+|\s+$/g, "");
      if (x == cookie_name) {
        return unescape(y);
      }
    }
  },
  //---------------------------------------------------------------------
  deleteCookies: function (cookie_name) {
    this.setCookies(cookie_name,undefined,-1);
  },
  //---------------------------------------------------------------------
  shiftToTop: function (arr, key, value)
  {
    var index =null;
    for (var i = 0; i < arr.length; i++) {
      if(arr[i][key] == value)
      {
        index = i;
      }
    }

    if(index != null)
    {
      var old_index = index;
      var new_index = 0;

      if (new_index >= arr.length) {
        var k = new_index - arr.length;
        while ((k--) + 1) {
          arr.push(undefined);
        }
      }
      arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
      return arr; // for testing purposes
    }



  },
  //---------------------------------------------------------------------
  timeDifferenceInSeconds: function (started_at,ended_at) {
    var ms = moment(ended_at,"YYYY-MM-DD HH:mm:ss").diff(moment(started_at, "YYYY-MM-DD HH:mm:ss"));
    var seconds = ms/1000;
    return seconds;
  },
  //---------------------------------------------------------------------
  secondsToHoursMinutsSeconds: function (seconds) {

    var ms = seconds*1000;
    var d = moment.duration(ms);
    var time = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");

    return time;
  },
  //---------------------------------------------------------------------
  getTimeDifferenceInHHMMSS: function getTimeDifferenceInHHMMSS(started_at, ended_at)
  {
    var seconds = this.timeDifferenceInSeconds(started_at, ended_at);
    var time = this.secondsToHoursMinutsSeconds(seconds);
    return time;
  },
  //---------------------------------------------------------------------
  secondsToHours: function (seconds) {

    var ms = seconds*1000;
    var d = moment.duration(ms);
    var time = d.asHours();

    return time;
  },
  //---------------------------------------------------------------------
  getTimeDifferenceInDays: function getTimeDifferenceInDays(started_at, ended_at)
  {
    if(!started_at || !ended_at)
    {
      return null;
    }

    var started = moment(started_at,"YYYY-MM-DD");
    var ended = moment(ended_at,"YYYY-MM-DD");

    var days = started.diff(ended, "days");

    return days;
  },
  //---------------------------------------------------------------------
  addTagToOneSignalUser: function (tag_name, tag_value) {
    if(OneSignal)
    {
      OneSignal.push(function() {
        OneSignal.getUserId(function(userId)
        {
          OneSignal.sendTag(tag_name, tag_value);
        });
      });
    }
  },
  //---------------------------------------------------------------------
  deleteTagToOneSignalUser: function (tag_name) {
    if(OneSignal)
    {
      OneSignal.push(function() {
        OneSignal.getUserId(function(userId)
        {
          OneSignal.deleteTag(tag_name);
        });
      });
    }
  },
  //---------------------------------------------------------------------
  openUrl: function (event, url) {
    if(event)
    {
      event.preventDefault();
    }
    window.open(url, "_blank");
  },
  //---------------------------------------------------------------------
  /*
   * make sure upload_form_selector is non dynamic element
   */
  uploadFiles: function (upload_form_selector, callback, folder_name) {
    if ( folder_name === void 0 ) folder_name=null;


    $(upload_form_selector).on("click",".upload_button",function ()
    {
      var files = [];
      var fileList;
      var base_url = $('base').attr('href');

      var url = base_url+"/core/fileUploader";

      if(folder_name)
      {
        url += "?folder_name="+folder_name;
      }


      $(upload_form_selector+' .upload_button').fileupload({
        url: url,
        dataType: 'json',
        add: function (e, data) {

          var filename = data.files[0].name;
          var filenameID = filename.replace(/[^a-z0-9\s]/gi, '').replace(/[_.\s]/g, '-');
          if ($.inArray(filename, fileList) !== -1)
          {
            alert("Filename already exist");
            return false;
          }
          fileList = [filename];
          files.push(data.files[0]);
          //on click to upload
          $(upload_form_selector+' .file_progress').show();

          //$(upload_form_selector).find('span').text('Uploading...');

          //data.context = $(upload_form_selector+' .upload_button').find('span').text('Uploading...');

          console.log('-->', data);

          var uploadResponse = data.submit()
              .error(function (uploadResponse, textStatus, errorThrown) {
                alert("Error: " + textStatus + " | " + errorThrown);
                return false;
              });
        },
        progress: function (e, data) {
          var progress = parseInt(data.loaded / data.total * 100, 10);
          $(upload_form_selector+'.progress-bar').css('width', progress + '%');
        },
        done: function (e, data) {
          e.preventDefault();
          var filename = data.files[0].name;
          var filenameID = filename.replace(/[^a-z0-9\s]/gi, '').replace(/[_.\s]/g, '-');

          callback(data.result.files);

          //$(upload_form_selector).find('span').text('Upload');

          $(upload_form_selector+' .file_progress').hide();
          $(upload_form_selector+' .progress-bar').css('width', '0%');
          //$(upload_form_selector+' .upload_button').find('span').text('Attach More Files');
        },
        _initProgressListener: function (options) {

          var that = this,
              xhr = options.xhr ? options.xhr() : $.ajaxSettings.xhr();
          // Accesss to the native XHR object is required to add event listeners
          // for the upload progress event:
          if (xhr.upload && xhr.upload.addEventListener) {
            xhr.upload.addEventListener('progress',
                jQuery.throttle(100, function (e) {
                  that._onProgress(e, options);
                }),
                false);
            options.xhr = function () {
              return xhr;
            };
          }
        },
      });
    });


  },
  //---------------------------------------------------------------------
  uploadSummernoteImage: function(file, editor_id) {
    data = new FormData();
    data.append("file", file);

    var base_url = $('base').attr('href');
    $.ajax({
      data: data,
      type: "POST",
      url: base_url+"/core/ajax/uploader",
      cache: false,
      contentType: false,
      processData: false,
      success: function(url) {
        //console.log('file-->', url);
        $(editor_id).summernote("insertImage", url, 'filename');
        //editor.insertImage(welEditable, url);
        //callback(url, editor_id);
      }
    });


  },
  //---------------------------------------------------------------------
  activateSummernoteEditor: function (editor_id, data) {

    console.log('-->summer', editor_id);

    var self = this;
    $(editor_id).summernote({
      minHeight: 150,
      maxHeight: 350,
      callbacks: {
        // Clear all formatting of the pasted text
        onPaste: function (e) {
          var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
          e.preventDefault();
          setTimeout( function(){
            document.execCommand( 'insertText', false, bufferText );
          }, 10 );
        },
        onKeyup: function(e) {
          //self.getValuesFromBlockCount(self.block_count)
        },
        onImageUpload: function(files)
        {
          console.log('files-->', files) ;
          self.uploadSummernoteImage(files[0], editor_id);
        }
      },

    });


    if(data)
    {
      $(editor_id).summernote('code', data);
    }

  },
  //---------------------------------------------------------------------
  activateAceEditor: function (element_id, language, data) {

    var editor = ace.edit(element_id);



    editor.setOptions({
      fontFamily: "consolas",
      fontSize: "15px",
      minLines: 5,
      maxLines: Infinity
    });

    console.log('-->'+element_id, language);

    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/"+language);
    editor.getSession().setUseWorker(false);

    if(data)
    {
      editor.getSession().setValue(data);
    }

  },
  //---------------------------------------------------------------------
  //---------------------------------------------------------------------
  //---------------------------------------------------------------------
  remainingCharacters: function (event, min_characters, max_characters, target_show_remaining) {
    if (event) {
      event.preventDefault();
    }

    var el = event.target;

    var characters = $(el).val().length;
    var remaining = max_characters-characters;

    var text = 'min:'+min_characters+' | max:'+max_characters;



    if(characters < min_characters)
    {
      text += "<span class='yellow-800'>"+" | written: "+characters+' | remaining: '+remaining+"</span>";
      $(target_show_remaining).html(text);
    }
    else if(remaining < 0 )
    {
      text += "<span class='red-800'>"+" | written: "+characters+' | remaining: '+remaining+"</span>";
      $(target_show_remaining).html(text);
    } else
    {
      text += "<span class='blue-800'>"+" | written: "+characters+' | remaining: '+remaining+"</span>";
      $(target_show_remaining).html(text);
    }

  },
  //---------------------------------------------------------------------
  randomString: function(length) {
    if ( length === void 0 ) length=6;

    var text = "";

    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  },
  //---------------------------------------------------------------------
  updateDocumentUrlTitle: function (title, url) {
    window.history.pushState(null, title, url);
  },
  //---------------------------------------------------------------------

  //---------------------------------------------------------------------
  strToSlug: function (title) {
    var slug = "";
    // Change to lower case
    var titleLower = title.toLowerCase();
    // Letter "e"
    slug = titleLower.replace(/e|é|è|ẽ|ẻ|ẹ|ê|ế|ề|ễ|ể|ệ/gi, 'e');
    // Letter "a"
    slug = slug.replace(/a|á|à|ã|ả|ạ|ă|ắ|ằ|ẵ|ẳ|ặ|â|ấ|ầ|ẫ|ẩ|ậ/gi, 'a');
    // Letter "o"
    slug = slug.replace(/o|ó|ò|õ|ỏ|ọ|ô|ố|ồ|ỗ|ổ|ộ|ơ|ớ|ờ|ỡ|ở|ợ/gi, 'o');
    // Letter "u"
    slug = slug.replace(/u|ú|ù|ũ|ủ|ụ|ư|ứ|ừ|ữ|ử|ự/gi, 'u');
    // Letter "d"
    slug = slug.replace(/đ/gi, 'd');
    // Trim the last whitespace
    slug = slug.replace(/\s*$/g, '');
    // Change whitespace to "-"
    slug = slug.replace(/\s+/g, '-');

    return slug;
  },
  //---------------------------------------------------------------------
  isInt: function (n) {
    return Number(n) === n && n % 1 === 0;
  },
  //---------------------------------------------------------------------
  isFloat: function (n) {
    return Number(n) === n && n % 1 !== 0;
  },
  //---------------------------------------------------------------------
  //---------------------------------------------------------------------
  //---------------------------------------------------------------------
  btDropDown: function (e) {
    if(e)
    {
      e.preventDefault();
    }

    var el = e.target;
    var fd =  $(el).closest('.dropdown').find('.dropdown-menu');
    $(fd).toggleClass('show');
  },
  //---------------------------------------------------------------------
  btDropDownFormGroup: function (e) {
    if(e)
    {
      e.preventDefault();
    }

    var el = e.target;
    var fd =  $(el).closest('.btn-group').find('.dropdown-menu');

    console.log('test');

    console.log(fd.attr("class"));

    $(fd).toggleClass('show');
  },
  //---------------------------------------------------------------------
  btDropDownFormGroupHide: function (el) {

    var fd =  $(el).closest('.btn-group').find('.dropdown-menu');

    console.log('test');

    console.log(fd.attr("class"));

    $(fd).toggleClass('show');
  },
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