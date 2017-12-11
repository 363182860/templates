function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != "function") {
        window.onload = func;
    } else {
        window.onload = function () {
            oldonload();
            func();
        }
    }
}

//閫氳繃姝ｅ垯鐨勬柟寮忓垽鏂槸鍚︿负鏁板瓧锛�
var isNumber = /^[0-9]+.?[0-9]*$/;
function isNum(obj) {
    //console.log(obj);
    if (obj == null || obj == undefined) {
        return false;
    } else {
        return isNumber.test(obj);
    }

}

var DS = {};


//ready function鐨勫疄鐜�
//璋冪敤$(function(){........})

DS.$ = ready = window.ready = function (fn) {
    if (document.addEventListener) {//鍏煎闈濱E
        document.addEventListener("DOMContentLoaded", function () {
            //娉ㄩ攢浜嬩欢锛岄伩鍏嶅弽澶嶈Е鍙�
            //澶氭璋冪敤浼氬鑷磋繖涓柟娉曞娆¤Е鍙戯紝鎵€浠ュ湪姣忔璋冪敤缁撴潫锛屽氨鍙栨秷鎺夈€�
            document.removeEventListener("DOMContentLoaded", arguments.callee, false);
            fn();//璋冪敤鍙傛暟鍑芥暟
        }, false);
    } else if (document.attachEvent) {//鍏煎IE
        document.attachEvent("onreadystatechange", function () {
            if (document.readyState === "complete") {
                document.detachEvent("onreadystatechange", arguments.callee);
                fn();
            }
        });
    }
};

/////******瀹氫箟涓€涓叏灞€鐨勫璞S锛岀敤鏉ュ瓨鍌ㄦ柟娉�****////



//渚濊禆娉ㄥ叆銆傘€俽egistry = {
//                          key1: value,
//                          key2: function() {},
//                          key3: {
//                                 a: b,
//                                  c: function() {}
//                                  }
//
//                  }
//杩欓噷鐨刱ey1锛宬ey2锛岋紝锛屽垎鍒搴旂潃涓嶅悓鐨勬湇鍔★紝鎶婅繖浜涗綔涓哄疄鍙備紶鍒版柟娉曠殑褰㈠弬閲屽幓锛岄€氳繃渚濊禆娉ㄥ叆
//鏂规硶灏卞彲浠ヤ娇鐢ㄥ弬鏁板搴旂殑鏈嶅姟鍜屾湇鍔″搴旂殑鏂规硶锛屽璞★紝鍙傛暟


DS.inject = function (func, registry) {
    //registry鏄繚瀛樻湁鏈嶅姟瀵硅薄鍜屾柟娉曠殑瀵硅薄锛沠unc鏄琚敞鍏ユ湇鍔＄殑瀵硅薄鏂规硶

    //灏嗘柟娉曟暣涓浆涓哄瓧绗︿覆锛屽彲浠ュ氨姝ｅ垯瀵瑰叾閲岄潰鐨勫弬鏁板彲浠ヨ繘琛屽尮閰�
    var source = func.toString();
    var matchers = source.match(/^function\s*[^\(]*\(\s*([^\)]*)\)/m);
    //鍙湁matchers鐨勯暱搴﹀ぇ浜�1鎵嶈〃绀猴紝浼犺繘鍘荤殑鍑芥暟甯︽湁褰㈠弬
    if (matchers && matchers.length > 1) {
        var args = [];

        //寰楀埌褰㈠弬鍒楄〃杞垚鏁扮粍锛屽叾瀹炴湰鏉ュ氨鏄竴涓暟缁�
        var argnames = matchers.slice(1)[0].split(",");
        //杩欓噷鐨刟rgs灏嗕細寰楀埌func閲岄潰鎵€鎷ユ湁鐨刱ey瀵瑰簲鐨剅egistry閲岄潰鐨剉alue锛寁alue鏄粈涔堢被鍨嬶紝灏�
        //浼氱粰杩欎釜func閲岄潰瀵瑰簲鐨勫弬鏁版寚瀹氫负浠€涔堢被鍨嬶紝锛�
        //姣斿func锛坘ey1, key2, key3锛墈
        //
        //                              鍦ㄥ嚱鏁颁綋鍐呭氨浼氭湁瀵瑰簲鐨�
        //                                              key1 = value锛�
        //                                              key2 = function锛堬級{}锛�
        //                                              key3 = {
        //                                                         a:b锛�
        //                                                          c:function() {}
        //                                                      }
        //                              鍦ㄥ嚱鏁颁綋鍐呰繖浜涘璞″拰鏂规硶鍙互鎷挎潵鐩存帴璋冪敤锛屽叾瀹炲氨鐩稿綋浜庡湪鍑芥暟閲岄潰new浜嗕竴涓猺egistry锛�
        //                               鍙笉杩囨槸閫氳繃渚濊禆娉ㄥ叆鏉ュ畬鎴愪簡杩欎竴姝ワ紝杩欐牱鍋氬彲浠ヨ妭鐪佸唴瀛樼┖闂达紝
        //
        //
        //                      }
        for (var i = 0, len = argnames.length; i < len; i++) {
            args[i] = registry[argnames[i].trim()];
        }
        func.apply(null, args);
    }
};

//dom閫夋嫨鍣�

var $$ = function (selector) {
    "use strict";
    var arg = makeArray(arguments);
    var newArr = [];
    if (!document.querySelector(selector)) {
        return false;
    } else if (document.querySelectorAll(selector).length === 1) {
        if (arg[1] != true) {
            return document.querySelector(selector);
        } else if (arg[1] == true) {
            newArr.push(document.querySelector(selector));

            return newArr;
        }
    } else {
        return Array.prototype.slice.call(document.querySelectorAll(selector));
    }
};

//鍘熷瀷缁ф壙

function inherits(a, b) {
    var c = function () {
    };
    c.prototype = b.prototype;
    a.prototype = new c;
}

//寰楀埌鏍峰紡

function getCss(ele, attr) {
    if (window.getComputedStyle) {
        return parseFloat(getComputedStyle(ele, null)[attr]);
    } else {
        if (attr === "opacity") {
            if (ele.currentStyle[attr] === undefined) {
                var reg = /alpha\(opacity=(\d{1,3})\)/;
                var opacityVal = ele.currentStyle.filter;
                if (reg.test(opacityVal)) {
                    ele.style.opacity = parseFloat(RegExp.$1) / 100;
                    return parseFloat(RegExp.$1) / 100;
                } else {
                    return 1;
                }
            }
        }
        return parseFloat(ele.currentStyle[attr]);
    }
}

//璁剧疆鏍峰紡

function setCss(ele, attr, val) {
    if (attr === "opacity") {
        ele.style.opacity = val;
        ele.style.filter = "alpha(opacity=" + val * 100 + ")"
    } else {
        ele.style[attr] = val;
    }
}

//animate鍙奻adein绛夊姩鐢诲疄鐜�

function move(ele, obj, interval, duration, callback) {
    window.clearInterval(ele.timer);
    //var begin=getCss(ele,attr);
    //var interval=15;//姣忎竴姝ユ椂闂�
    var times = 0;//鍔ㄧ敾绱鏃堕棿
    //var change=target-begin;
    var oBegin = {};
    var oChange = {};
    for (var attr in obj) {
        var begin = getCss(ele, attr);
        var target = obj[attr];
        var change = target - begin;
        if (change) {
            oBegin[attr] = begin;
            oChange[attr] = change;
        }
    }
    function step() {
        times += interval;
        if (times < duration) {
            for (var attr in oChange) {
                if (attr === "opacity") {
                    var val = (times / duration) * oChange[attr] + oBegin[attr];
                    setCss(ele, attr, val)
                } else {
                    var val = (times / duration) * oChange[attr] + oBegin[attr] + "px";
                    setCss(ele, attr, val);
                }
            }
        } else {
            for (var attr in obj) {
                if (attr === "opacity") {
                    var target = obj[attr];
                    var val = target;
                    setCss(ele, attr, val);
                } else {
                    var target = obj[attr];
                    var val = target + "px";
                    setCss(ele, attr, val);
                }
            }
            window.clearInterval(ele.timer);
            if (typeof callback === "function") {
                callback.call(ele);
            }
        }
    }

    ele.timer = window.setInterval(step, interval);
}

//杞暟缁�

var makeArray = function (obj) {
    if (!obj || obj.length === 0) {
        return []
    }
    if (!obj.length) {
        return obj;
    }
    try {
        return [].slice.call(obj);
    } catch (e) {
        var i = 0;
        var j = obj.length;
        var a = [];
        for (; i < j; i++) {
            a.push(obj[i])
        }
        return a;
    }
};

//瀹氫箟涓€涓叏灞€鐨勫璞★紝鐢ㄦ潵瀛樺偍鎴戠殑鏂规硶銆�


//////*****缁欏厓绱犳坊鍔犵被鍚�***/////

DS.addClass = function (selector, name) {
    var str = name;
    var test = new RegExp(str, "g");
    var tClass = selector.className;
    if (selector.nodeType !== 1 || tClass.match(test)) {
        return
    }
    var cn = selector.className.trim();
    return selector.className = (cn + " " + name).trim();
};

////******绉婚櫎鍏冪礌鐨勬寚瀹氱被鍚�***8///////

DS.removeClass = function (selector, name) {
    if (selector.nodeType !== 1) return;
    var cn = selector.className;
    var str = name;
    var Ncn = "";
    var test = new RegExp(str, "g");
    if (!cn.match(test)) return;
    var cnL = cn.split(" ");
    for (var i = 0; i < cnL.length; i++) {
        if (cnL[i] !== str) {
            Ncn += cnL[i] + " ";
        }
    }
    return selector.className = Ncn.trim();
};

////////****************瀵绘壘鍏冪礌鐨勬煇涓€鐖剁骇锛屽苟鍒ゆ柇璇ョ埗绾ф槸鍚﹀瓨鍦�****///

DS.parentsUntil = function (selector, name) {
    //濡傛灉璇ュ厓绱犳病鏈夌埗绾э紝鎴栬€呬笉瀛樺湪璇ュ厓绱狅紝
    if (!selector.parentNode || !document.querySelectorAll(name)[0]) return;
    var pn = selector.parentNode, _selfname;
    if (name.slice(0, 1) === "." && pn.nodeType === 1) {
        _selfname = new RegExp(name.slice(1), "g");
        try {
            while (!_selfname.test(pn.className)) {
                pn = pn.parentNode;
            }
        } catch (e) {
            return;
        }
        return pn;
    } else if (name.slice(0, 1) === "#") {
        _selfname = new RegExp(name.slice(1), "g");
        try {
            while (!_selfname.test(pn.id)) {
                pn = pn.parentNode;
            }
        } catch (e) {
            return;
        }
        return pn;
    } else {
        _selfname = new RegExp(name, "i");
        try {
            while (!_selfname.test(pn.tagName)) {
                pn = pn.parentNode;
            }
        } catch (e) {
            return;
        }
    }
    return pn;
};


/////////**********瀹㈡埛绔痷ser-Agent楠岃瘉************/////
/////////**********楠岃瘉褰撳墠鐢ㄦ埛鏄€氳繃浠€涔堟祻瑙堝櫒鎴栬€呬粈涔堢被鍨嬬殑瀹㈡埛绔闂椤甸潰************/////
////***if(browser.versions.ios||browser.versions.iPhone||browser.versions.iPad){do what you want}*****/////

var browser = {
    versions: function () {
        var u = navigator.userAgent, app = navigator.appVersion;
        return { //绉诲姩缁堢娴忚鍣ㄧ増鏈俊鎭�
            trident: u.indexOf('Trident') > -1, //IE鍐呮牳
            presto: u.indexOf('Presto') > -1, //opera鍐呮牳
            webKit: u.indexOf('AppleWebKit') > -1, //鑻规灉銆佽胺姝屽唴鏍�
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //鐏嫄鍐呮牳
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //鏄惁涓虹Щ鍔ㄧ粓绔�
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios缁堢
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 || u.indexOf("Adr"), //android缁堢鎴杣c娴忚鍣�
            iPhone: u.indexOf('iPhone') > -1, //鏄惁涓篿Phone鎴栬€匭QHD娴忚鍣�
            iPad: u.indexOf('iPad') > -1, //鏄惁iPad
            webApp: u.indexOf('Safari') == -1 //鏄惁web搴旇绋嬪簭锛屾病鏈夊ご閮ㄤ笌搴曢儴
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
};

/////////**********楠岃瘉褰撳墠鐢ㄦ埛鏄€氳繃浠€涔堟祻瑙堝櫒鎴栬€呬粈涔堢被鍨嬬殑瀹㈡埛绔闂椤甸潰************/////


////////************鐩戝惉浜嬩欢鐨勬敞鍐�************//////
//娉ㄥ唽瑙︽懜浜嬩欢
//瑙︽懜浜嬩欢鍚庯紝touched瀵硅薄浼氫繚瀛樺洓涓€�
// {
//      spanX:瑙︽懜鐨勮捣濮嬫按骞冲潗鏍囷紙鐩稿浜巄ody锛�,
//      spanY:瑙︽懜鐨勮捣濮嬪瀭鐩村潗鏍囷紙鐩稿浜巄ody锛夛紝
//      moveX:姘村钩鎵嬫寚鍒掕繃璺濈锛�
//      moveY:鍨傜洿鎵嬫寚鍒掕繃璺濈锛�
//  }

var touched = {};

//娉ㄥ唽瑙︽懜寮€濮嬩簨浠�

function touchS(event) {
    //event.preventDefault();
    var touches = event.targetTouches.length;
    if (touches == 1) {
        //event.preventDefault();
        var mytouch = event.targetTouches[0];
        touched.moveX = 0;
        touched.moveY = 0;
        var spanX = mytouch.pageX;
        var spanY = mytouch.pageY;
        touched.spanX = spanX;
        touched.spanY = spanY;
    }
}

//touch鎺у埗
//瑙︽懜move浜嬩欢瑙﹀彂

function touchM(event) {
    //event.preventDefault();
    var touches = event.targetTouches.length;
    if (touches == 1) {
        //event.preventDefault();
        var mytouch = event.targetTouches[0];
        var goX = mytouch.pageX;
        var goY = mytouch.pageY;
        var moveX = goX - touched.spanX;
        var moveY = goY - touched.spanY;
        touched.moveX = moveX;
        touched.moveY = moveY;
    }
}


function preventTouch(event) {
    event.preventDefault();
}
//娣诲姞鐩戝惉浜嬩欢锛岀洃鍚瑃ouch浜嬩欢

document.addEventListener("touchstart", touchS, false);
document.addEventListener("touchmove", touchM, false);


//婊戝姩璺濈灏忎簬5 鐨勫垽鏂�
function moveClick() {
    return (Math.abs(touched.moveX) < 5 && Math.abs(touched.moveY) < 5) || (touched.moveX == undefined && touched.moveY == undefined);
}
////////***********鐩戝惉浜嬩欢娉ㄥ唽缁撴潫锛岄〉闈㈡湁瑙︽懜浜嬩欢鏃惰Е鍙�*************//////


//鑾峰彇id,鍙傛暟浠ｈ〃id鎵€鍦ㄦ煡璇㈠瓧绗︿覆涓殑浣嶇疆,,涔熷彲浠ョ洿鎺ヤ紶鍙傛暟鐨勫悕绉�
function getId(index) {
    var href = window.location.href;
    //濡傛灉涓嶄紶鍊硷紝index榛樿涓�0
    /*if (typeof index === undefined) {
     index = 0;
     }*/
    if (isNum(index)) {
        if (href.indexOf("?") > -1) {
            var query = href.split("?")[1];
            if (query.indexOf("&") > -1) {
                var querystring = query.split("&");
                if (index > querystring.length - 1) {
                    console.warn("can not get query what you find, please check you url is contain the query what needed");
                    return null
                } else {
                    var id = querystring[index];
                    return id.split("=")[1];
                }
            } else {
                if (index > 0) {
                    console.warn("can not get query what you find, please check you url is contain the query what needed");
                    return null
                } else if (index == 0) {
                    return query.split("=")[1]
                }
            }
        } else {
            console.warn("can not get query what you find, please check you url is contain the query what needed");
        }
    } else if (!isNum(index)) {
        if (href.indexOf("?") > -1) {
            var query = href.split("?")[1];
            if (query.indexOf(index) == -1) {
                return
            } else {
                //if (query.indexOf("&") == -1) {
                 //   return query.split("=")[1];
                //} else {
                    var queryObj = {};
                    query.split("&").forEach(function (que) {
                        queryObj[que.split("=")[0]] = que.split("=")[1]
                    });
                    return queryObj[index]

                //}
            }
        }
    }
}


//鏄惁涓篿os   if(isIos()) {}
function isIos() {
    return browser.versions.ios || browser.versions.iPhone || browser.versions.iPad
}



//杩涘害鏉℃牱寮忓拰dom缁撴瀯
DS.$(function() {
    var loadingbar = document.createElement("div");
    loadingbar.className = "loadingbar";
    loadingbar.innerHTML = "<div class='loading'><img src='/addons/tiger_taoke/template/mobile/tbgoods/style9/images/loading.gif'></div>";
    document.querySelector("body").appendChild(loadingbar);
});


//loading杩涘害鏉″紑鍚拰缁撴潫

var loadingAndLoadedservices = {

    //杩涘害鏉″紑濮�
    loading: function () {

        var $loadingbar = $$(".loadingbar");
        var $loading = $$(".loading");

        console.log($$(".loading"));
        $loadingbar.style.display = "-webkit-box";
        var nomove = document.createElement("div");
        nomove.className = "nomove";
        nomove.addEventListener("touchstart", function (event) {
            event.preventDefault();
        });
        if (!$$(".nomove")) {
            $$("body").appendChild(nomove);
        }

    },

    //杩涘害鏉＄粨鏉�
    loaded: function (tips, callback, time, opacitytime) {

        var $loadingbar = $$(".loadingbar");
        var $loading = $$(".loading");

        if(tips == "") {
            $loadingbar.setAttribute("style", "");
            $loading.setAttribute("style", "");
        } else {
            var style = $loading.style.cssText;
            $loadingbar.style.display = "-webkit-box";
            $loading.style.cssText = style + "height:30px;width:auto;padding:0 10px;line-height:30px;opacity:0.6;";
            $loading.innerHTML = tips;
        }

        if(DS.alphatime) {
            clearTimeout(DS.alphatime);
        }
        if(DS.hidetime) {
            clearTimeout(DS.hidetime);
        }

        //$$(".loading").style.display = "block";
        /*move($$(".loading"), {opacity:0}, 13, 1000, function() {
         $$(".loading").style.cssText = "display: none;width: 2rem;height: 2rem;opacity: 0.6;position: fixed;top: 50%;margin-top: -1rem;left: 50%;margin-left: -1rem;z-index: 100;font-size: 12px;color: #fff;background: #000;text-align: center;";
         if($$(".nomove")) {
         $$(".nomove").remove();
         }
         });*/
        if(typeof time == "undefined") {
            time = (tips == "") ? 0 :500;
        }
        if(typeof opacitytime == "undefined") {
            opacitytime = (tips == "") ? 0 :1000;
        }
        DS.alphatime = setTimeout(function () {
            $loading.style.opacity = 0;
            $loading.style.transition = "opacity " + opacitytime + "ms";
        }, time);

        DS.hidetime = setTimeout(function () {
            $loadingbar.setAttribute("style", "");
            $loading.setAttribute("style", "");
            //$$(".loadingbar").style.cssText = "display:none;width: 100%;height: 2rem; -webkit-box-pack: center; -webkit-box-align: center;position: fixed;top: 50%;margin-top: -1rem;z-index: 100;";
            $loading.innerHTML = "<img src='/addons/tiger_taoke/template/mobile/tbgoods/style9/images/loading.gif'>";


            if ($$(".nomove")) {
                $$("body").removeChild($$(".nomove"));
            }


            if (typeof callback == "function") {
                callback();
            }

        }, opacitytime + time);
    }
};

//涓嶅悓椤甸潰鎵ц涓嶅悓鐨刲oadingandloaded鏂规硶.

//绗簩涓弬鏁颁负true鏃舵墽琛宭oading鍔ㄧ敾锛岋紝绗笁涓弬鏁颁负true鎵цloaded鍔ㄧ敾

//tips瑕佸鐢ㄦ埛灞曠ず鐨勫皬鎻愮ず锛岋紝
function isLoadingOrIsLoaded(tips) {
    "use strict";
    var args = makeArray(arguments);

    //鎵цloading鍔ㄧ敾
    function loading(loading) {
        loading();
    }

    //鎵цloaded鍔ㄧ敾
    function loaded(loaded) {
        loaded(tips, args[3], args[4], args[5]);
    }

    if (args[1] === true && args[2] === true) {

        //杩欓噷鍙互鍋氬姞鐨刲oading鏁堟灉
        DS.inject(loading, loadingAndLoadedservices);

        setTimeout(function () {
            DS.inject(loaded, loadingAndLoadedservices);
        }, 3000)

    } else if (args[1] === true && args[2] === false || args[2] === undefined || args[2] == "") {

        //杩欓噷鍙猯oading涓峫oaded
        DS.inject(loading, loadingAndLoadedservices);
    } else if (args[1] == "false" || args[1] == "" || args[1] === undefined && args[2] == "true") {

        //杩欓噷鍙猯oaded涓峫oading
        DS.inject(loaded, loadingAndLoadedservices);
    }

}

//isLoadingOrIsLoaded("", true, false);寮€濮嬪姞杞芥潯
//isLoadingOrIsLoaded("瑕佹樉绀虹殑鍊�", false, true, callback, time(鏄剧ず鏃堕棿), opacitytime锛堝埌娓愰殣娑堝け杩涜鐨勬椂闂达級)