import e from"axios";import n from"moment";import t from"nprogress";import r from"alertifyjs";var o={options:{},setOptions:function(e){return this.options=e,this},ajax:function(n,r,o,s){var a=this;void 0===s&&(s=!0),s&&(t.start(),console.log("start nprogress")),console.log("ajax"),e.post(n,r).then(function(e){"success"==e.data.status?(e.data.messages&&a.messages(e.data.messages),e.data.warnings&&a.warnings(e.data.warnings),o(e.data.data)):(console.log(e),e.data.errors&&a.errors(e.data.errors))}).catch(function(e){e.response&&e.response&&"419"===e.response.status?(a.$helpers.console(e),a.errors(["Login expired, try to login again."])):e.response?(a.errors([e.response.data]),a.$helpers.console(e.response.data),a.$helpers.console(e.response.status),a.$helpers.console(e.response.headers)):e.request?(a.$helpers.console(e.request),a.errors(["Server not responding"])):(console.error(e),a.errors(["Error: check console"]))})},ajaxGet:function(n,r,o,s){var a=this;void 0===s&&(s=!0),s&&(t.start(),console.log("start nprogress")),window.axios.defaults.headers.common={"X-Requested-With":"XMLHttpRequest"},console.log("ajax"),e.get(n,r).then(function(e){"success"==e.data.status?(e.data.messages&&a.messages(e.data.messages),e.data.warnings&&a.warnings(e.data.warnings),o(e.data.data)):(console.log(e),e.data.errors&&a.errors(e.data.errors))})},warnings:function(e){$.each(e,function(e,n){r.error(n)})},errors:function(e){$.each(e,function(e,n){r.error(n)}),this.stopNprogress()},confirm:function(e,n,t){r.confirm(e,function(e){if(!e)return!1;n(t)})},messages:function(e){$.each(e,function(e,n){r.success(n)})},success:function(e){void 0===e&&(e="success"),r.success(e)},stopNprogress:function(){t.done()},console:function(e,n){1==$("#debug").attr("content")&&(n?console.log(n,e):console.log(e))},findAndReplaceString:function(e,n,t){return t.replace(e,n)},findAndReplace:function(e,n,t){for(var r=null,o=0;o<e.length;o++)e[o][n]==t[n]&&(r=o);return null!=r&&(e[r]=t,e)},updateArray:function(e,n){var t=e.indexOf(n);return e[t]=n,e},removeFromArray:function(e,n){var t=e.map(function(e){return e}).indexOf(n);return console.log("index",t),e.splice(t,1)},findInArrayByKey:function(e,n,t){if(!Array.isArray(e))return!1;var r=null;return e.map(function(e,o){e[n]==t&&(r=e)}),r},removeInArrayByKey:function(e,n,t){return!!Array.isArray(e)&&(console.log("array===>",e),e.map(function(r,o){r[t]==n[t]&&e.splice(o,1)}),e)},existInArray:function(e,n){return-1!=e.indexOf(n)},existInArrayByKey:function(e,n,t){var r=!1;return!!Array.isArray(e)&&(e.map(function(e){e[t]==n[t]&&(r=!0)}),r)},splitString:function(e,n){return""!=e&&null!=e&&e.length>n&&(e=e.substring(0,n)+"..."),e},formatDate:function(e){return e?n(e).format("YYYY-MM-DD"):""},fromNow:function(e){return e?n(e).fromNow():null},currentDate:function(){return n().format("YYYY-MM-DD")},currentDateTime:function(){return n().format("YYYY-MM-DD HH:mm:ss")},dateForHumans:function(e){return e?n(e).format("ddd, MMM DD, YYYY"):null},dateTimeForHumans:function(e){return e?n(e).format("YYYY-MM-DD hh:mm A"):null},dateTimeForHumansWithDay:function(e){return e?n(e).format("YYYY MMM DD hh:mm A (dddd)"):null},checkPermission:function(e){return this.permissions.indexOf(e)>-1},paginate:function(e,n){e.preventDefault(),this.current_page=n,this.listLoader()},makePagination:function(e){this.pagination=Pagination.Init(e.last_page,this.current_page,3)},paginateIsActive:function(e){return e==this.current_page},toIndianFormat:function(e){if(e<0)return e;for(var n=(e+="").split("."),t=n[0],r=n.length>1?"."+n[1]:"",o=/(\d+)(\d{3})/,s=0,a=String(t).length,i=parseInt(a/2-1);o.test(t)&&(s>0?t=t.replace(o,"$1,$2"):(t=t.replace(o,"$1,$2"),o=/(\d+)(\d{2})/),s++,0!=--i););return t+r},currencyToSymbol:function(e){return"USD"==e?"&#36;":"INR"==e?"&#8377;":e},setCookies:function(e,n,t){var r=new Date;r.setDate(r.getDate()+t);escape(n),null==t||r.toUTCString();document.cookie=e+"="+n},getCookies:function(e){var n,t,r,o=document.cookie.split(";");for(n=0;n<o.length;n++)if(t=o[n].substr(0,o[n].indexOf("=")),r=o[n].substr(o[n].indexOf("=")+1),(t=t.replace(/^\s+|\s+$/g,""))==e)return unescape(r)},deleteCookies:function(e){this.setCookies(e,void 0,-1)},shiftToTop:function(e,n,t){for(var r=null,o=0;o<e.length;o++)e[o][n]==t&&(r=o);if(null!=r){var s=r;if(0>=e.length)for(var a=0-e.length;1+a--;)e.push(void 0);return e.splice(0,0,e.splice(s,1)[0]),e}},timeDifferenceInSeconds:function(e,t){return n(t,"YYYY-MM-DD HH:mm:ss").diff(n(e,"YYYY-MM-DD HH:mm:ss"))/1e3},secondsToHoursMinutsSeconds:function(e){var t=1e3*e,r=n.duration(t);return Math.floor(r.asHours())+n.utc(t).format(":mm:ss")},getTimeDifferenceInHHMMSS:function(e,n){var t=this.timeDifferenceInSeconds(e,n);return this.secondsToHoursMinutsSeconds(t)},secondsToHours:function(e){var t=1e3*e;return n.duration(t).asHours()},getTimeDifferenceInDays:function(e,t){if(!e||!t)return null;var r=n(e,"YYYY-MM-DD"),o=n(t,"YYYY-MM-DD");return r.diff(o,"days")},addTagToOneSignalUser:function(e,n){OneSignal&&OneSignal.push(function(){OneSignal.getUserId(function(t){OneSignal.sendTag(e,n)})})},deleteTagToOneSignalUser:function(e){OneSignal&&OneSignal.push(function(){OneSignal.getUserId(function(n){OneSignal.deleteTag(e)})})},openUrl:function(e,n){e&&e.preventDefault(),window.open(n,"_blank")},uploadFiles:function(e,n,t){void 0===t&&(t=null),$(e).on("click",".upload_button",function(){var r,o=[],s=$("base").attr("href")+"/core/fileUploader";t&&(s+="?folder_name="+t),$(e+" .upload_button").fileupload({url:s,dataType:"json",add:function(n,t){var s=t.files[0].name;s.replace(/[^a-z0-9\s]/gi,"").replace(/[_.\s]/g,"-");if(-1!==$.inArray(s,r))return alert("Filename already exist"),!1;r=[s],o.push(t.files[0]),$(e+" .file_progress").show(),console.log("--\x3e",t);t.submit().error(function(e,n,t){return alert("Error: "+n+" | "+t),!1})},progress:function(n,t){var r=parseInt(t.loaded/t.total*100,10);$(e+".progress-bar").css("width",r+"%")},done:function(t,r){t.preventDefault();r.files[0].name.replace(/[^a-z0-9\s]/gi,"").replace(/[_.\s]/g,"-");n(r.result.files),$(e+" .file_progress").hide(),$(e+" .progress-bar").css("width","0%")},_initProgressListener:function(e){var n=this,t=e.xhr?e.xhr():$.ajaxSettings.xhr();t.upload&&t.upload.addEventListener&&(t.upload.addEventListener("progress",jQuery.throttle(100,function(t){n._onProgress(t,e)}),!1),e.xhr=function(){return t})}})})},uploadSummernoteImage:function(e,n){data=new FormData,data.append("file",e);var t=$("base").attr("href");$.ajax({data,type:"POST",url:t+"/core/ajax/uploader",cache:!1,contentType:!1,processData:!1,success:function(e){$(n).summernote("insertImage",e,"filename")}})},activateSummernoteEditor:function(e,n){console.log("--\x3esummer",e);var t=this;$(e).summernote({minHeight:150,maxHeight:350,callbacks:{onPaste:function(e){var n=((e.originalEvent||e).clipboardData||window.clipboardData).getData("Text");e.preventDefault(),setTimeout(function(){document.execCommand("insertText",!1,n)},10)},onKeyup:function(e){},onImageUpload:function(n){console.log("files--\x3e",n),t.uploadSummernoteImage(n[0],e)}}}),n&&$(e).summernote("code",n)},activateAceEditor:function(e,n,t){var r=ace.edit(e);r.setOptions({fontFamily:"consolas",fontSize:"15px",minLines:5,maxLines:1/0}),console.log("--\x3e"+e,n),r.setTheme("ace/theme/monokai"),r.getSession().setMode("ace/mode/"+n),r.getSession().setUseWorker(!1),t&&r.getSession().setValue(t)},remainingCharacters:function(e,n,t,r){e&&e.preventDefault();var o=e.target,s=$(o).val().length,a=t-s,i="min:"+n+" | max:"+t;s<n?(i+="<span class='yellow-800'> | written: "+s+" | remaining: "+a+"</span>",$(r).html(i)):a<0?(i+="<span class='red-800'> | written: "+s+" | remaining: "+a+"</span>",$(r).html(i)):(i+="<span class='blue-800'> | written: "+s+" | remaining: "+a+"</span>",$(r).html(i))},randomString:function(e){void 0===e&&(e=6);for(var n="",t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",r=0;r<e;r++)n+=t.charAt(Math.floor(Math.random()*t.length));return n},updateDocumentUrlTitle:function(e,n){window.history.pushState(null,e,n)},strToSlug:function(e){return e.toLowerCase().replace(/e|é|è|ẽ|ẻ|ẹ|ê|ế|ề|ễ|ể|ệ/gi,"e").replace(/a|á|à|ã|ả|ạ|ă|ắ|ằ|ẵ|ẳ|ặ|â|ấ|ầ|ẫ|ẩ|ậ/gi,"a").replace(/o|ó|ò|õ|ỏ|ọ|ô|ố|ồ|ỗ|ổ|ộ|ơ|ớ|ờ|ỡ|ở|ợ/gi,"o").replace(/u|ú|ù|ũ|ủ|ụ|ư|ứ|ừ|ữ|ử|ự/gi,"u").replace(/đ/gi,"d").replace(/\s*$/g,"").replace(/\s+/g,"-")},isInt:function(e){return Number(e)===e&&e%1==0},isFloat:function(e){return Number(e)===e&&e%1!=0},btDropDown:function(e){e&&e.preventDefault();var n=e.target,t=$(n).closest(".dropdown").find(".dropdown-menu");$(t).toggleClass("show")},btDropDownFormGroup:function(e){e&&e.preventDefault();var n=e.target,t=$(n).closest(".btn-group").find(".dropdown-menu");console.log("test"),console.log(t.attr("class")),$(t).toggleClass("show")},btDropDownFormGroupHide:function(e){var n=$(e).closest(".btn-group").find(".dropdown-menu");console.log("test"),console.log(n.attr("class")),$(n).toggleClass("show")}};export default{install:function(e,n){var t=o.setOptions(n);e.prototype.$vaahcms=t,e.vaahcms=t}};
