//瀹炵幇鍥剧墖鐨勬粴灞忓姞杞�


var lastTime = 0;
var prefixes = 'webkit moz ms o'.split(' '); //鍚勬祻瑙堝櫒鍓嶇紑

var requestAnimationFrame = window.requestAnimationFrame;
var cancelAnimationFrame = window.cancelAnimationFrame;

//閫氳繃閬嶅巻鍚勬祻瑙堝櫒鍓嶇紑锛屾潵寰楀埌requestAnimationFrame鍜宑ancelAnimationFrame鍦ㄥ綋鍓嶆祻瑙堝櫒鐨勫疄鐜板舰寮�
for( var i = 0; i < prefixes.length; i++ ) {
    if ( requestAnimationFrame && cancelAnimationFrame ) {
        break;
    }
    prefix = prefixes[i];
    requestAnimationFrame = requestAnimationFrame || window[ prefix + 'RequestAnimationFrame' ];
    cancelAnimationFrame  = cancelAnimationFrame  || window[ prefix + 'CancelAnimationFrame' ] || window[ prefix + 'CancelRequestAnimationFrame' ];
}

//濡傛灉褰撳墠娴忚鍣ㄤ笉鏀寔requestAnimationFrame鍜宑ancelAnimationFrame锛屽垯浼氶€€鍒皊etTimeout
if ( !requestAnimationFrame || !cancelAnimationFrame ) {
    requestAnimationFrame = function( callback, element ) {
        var currTime = new Date().getTime();
        //涓轰簡浣縮etTimteout鐨勫敖鍙兘鐨勬帴杩戞瘡绉�60甯х殑鏁堟灉
        var timeToCall = Math.max( 0, 16 - ( currTime - lastTime ) );
        var id = window.setTimeout( function() {
            callback( currTime + timeToCall );
        }, timeToCall );
        lastTime = currTime + timeToCall;
        return id;
    };

    cancelAnimationFrame = function( id ) {
        window.clearTimeout( id );
    };
}

//寰楀埌鍏煎鍚勬祻瑙堝櫒鐨凙PI
window.requestAnimationFrame = requestAnimationFrame;
window.cancelAnimationFrame = cancelAnimationFrame;


var imgScrollIndex = 0;

//scrTop涓烘粴鍔ㄨ繃绋嬩腑鐨勫疄鏃舵粴鍔ㄨ窛绂� //浼�0琛ㄧず椤甸潰鏈€椤堕儴
//baseH鍦ㄨ繖閲屼富瑕佷紶鐨勫綋鍓嶉〉闈㈢殑鍙鍖哄煙鐨勯珮搴�
//selector 闇€瑕佸姩鎬佸姞杞界殑鍥剧墖鎵€鍦ㄧ殑鏍囩锛�




//鍏ㄥ眬寮傛鍔犺浇
function scrollLoadingImg(scrTop, baseH, callback) {
    if (typeof scrTop == "undefined") {
        var scrTop = 0;
    }

    var baseW = document.documentElement.clientWidth;

    //寮€濮嬫樉绀哄浘鐗囦簡
    var ImgLoadedShow = function (img, imgSrc, dataSrc) {
        setTimeout(function () {

            img.querySelector(".DSbg").style.opacity = 1;
            img.querySelector(".DSbg").style.backgroundImage = "url(" + imgSrc + ")";
            img.querySelector(".inoutbg").style.opacity = 0;
            dataSrc.setAttribute("loaded", "true");

        }, 500)

    };

    var imgCanUse = function () {
        var img = $$(".allpreContainer", true);
        var imglen = img.length;
        console.log("imgScrollIndex:", imgScrollIndex);
        //鍙湁鍚戜笅婊氬姩鏃舵垨婊戝姩鏃舵墠浼氳Е鍙戞粴灞忓姞杞姐€�
        for (var i = imgScrollIndex; i < imglen; i++) {

            if(!img[i]) {
                continue;
            }

            if (img[i].getBoundingClientRect().top < baseH && img[i].getBoundingClientRect().left < baseW) {
                var dataSrc = img[i].querySelector(".preloadbg");
                if (dataSrc.getAttribute("loaded") != "true") {
                    var imgSrc = dataSrc.getAttribute("src-data");
                    dataSrc.setAttribute("num", i);
                    var showimg = (function (i, imgSrc, dataSrc, img) {
                        var imgneed = new Image();
                        imgneed.src = imgSrc;
                        if (imgneed.complete) {
                            //浠庣紦瀛樹腑璇诲彇浼氭墽琛岃繖姝�
                            console.log("reload in");

                            //姣忓紶鍥剧墖鍔犺浇濂戒簡锛岄兘浼氭墽琛屼竴閬嶈繖涓猚allback
                            if(typeof callback == "function") {
                                callback(img, imgSrc);
                            }

                            ImgLoadedShow(img, imgSrc, dataSrc);
                            return;
                        }
                        imgneed.onload = function () {
                            //棣栨鍔犺浇浼氭墽琛岃繖涓柟娉�
                            console.log("first in");
                            ImgLoadedShow(img, imgSrc, dataSrc);
                        }
                    })(i, imgSrc, dataSrc, img[i])
                }


            }
        }
    };

    if (DS.pagecomplete == undefined) {
        imgCanUse()
    } else {

        var _reqAni = function () {
            var imgtimer = requestAnimationFrame(_reqAni);
            if (DS.pagecomplete == true) {
                cancelAnimationFrame(imgtimer);
                imgCanUse();
            }
        };

        _reqAni();

    }
}

//灏忚寖鍥村浘鐗囧欢杩熷姞杞�
function oneImglazyLoad(parent) {
    var dataSrc = makeArray(parent.querySelectorAll(".preloadbg"));
    dataSrc.forEach(function(pre) {
        //if (pre.getAttribute("loaded") != true) {
        var imgSrc = pre.getAttribute("src-data");
        pre.setAttribute("loaded", true);
        var newimg = new Image();
        newimg.src = imgSrc;
        setTimeout(function() {
            if (newimg.complete) {
                pre.parentNode.querySelector(".DSbg").style.cssText = "opacity:1;background-image: url(" + imgSrc + "); background-size: cover; background-position: 50% 50%; background-repeat: no-repeat;";
                return;
            }
            newimg.onload = function () {
                pre.parentNode.querySelector(".DSbg").style.cssText = "opacity:1;background-image: url(" + imgSrc + "); background-size: cover; background-position: 50% 50%; background-repeat: no-repeat;";
            }
        }, 500);

        //}
    })

}


//css3   loading鍔ㄧ敾鏍峰紡
function cssLoadingAnimate() {
    var args = makeArray(arguments);
    var html = "";
    var cssloading = document.createElement("div");
    cssloading.className = "cssloading";
    html += '<div class="spinner">';
    html += '<div class="spinner-container container1">';
    html += '<div class="circle1"></div>';
    html += '<div class="circle2"></div>';
    html += '<div class="circle3"></div>';
    html += '<div class="circle4"></div>';
    html += '</div>';
    html += '<div class="spinner-container container2">';
    html += '<div class="circle1"></div>';
    html += '<div class="circle2"></div>';
    html += '<div class="circle3"></div>';
    html += '<div class="circle4"></div>';
    html += '</div>';
    html += '<div class="spinner-container container3">';
    html += '<div class="circle1"></div>';
    html += '<div class="circle2"></div>';
    html += '<div class="circle3"></div>';
    html += '<div class="circle4"></div>';
    html += '</div>';
    html += '</div>';
    html += '姝ｅ湪鍔犺浇...';
    cssloading.innerHTML = html;
    if (args[0] == true) {
        if ($$(".cssloading")) {
            $$("body").removeChild($$(".cssloading"));
            $$("body").appendChild(cssloading);
        } else {
            $$("body").appendChild(cssloading);
        }

    } else if (args[0] == false) {
        if ($$(".cssloading")) {
            $$("body").removeChild($$(".cssloading"));
        }
    }

}


//鎺у埗婊氬姩鍔犺浇鏁版嵁鐨勬柟娉�
//dataAppendFunc  灏嗚鎵ц鐨刟jax娣诲姞鏁版嵁鐨勬柟娉曘€傚皢鏁版嵁鏁扮粍鐗囨帴瀛楃涓瞐ppend鍒癰ody閲岄潰鍘�
//姣忔鍔犺浇鍒�  showcount * everycount鐨勭储寮�;
//姣忔鍔犺浇鏁伴噺  everycount
//list  ajax璇锋眰杩囨潵鐨勬暟鎹殑鍒楄〃鍏ㄩ儴
//杩欎釜鏂规硶鍙兘闇€瑕佸湪鍑芥暟鎵ц鍓嶏紝鎻掑叆涓€涓狣S.pagecomplete涓篺alse鐨勫睘鎬э紝
// 涓轰簡淇濊瘉鏁版嵁濡傛灉鍒嗗緢澶氭杩斿洖锛屼竴涓猘jax璇锋眰鏃犳硶鍒ゆ柇鏄惁鏁版嵁宸茬粡鍔犺浇瀹屾瘯鐨勬椂鍊欎笉鍑洪敊锛屽湪椤甸潰鍔犺浇瀹屾垚鐨勬椂鍊欏皢杩欎釜灞炴€ф敼涓簍rue锛屽悓鏃惰DS.lll = true;

function controlLazyLaoding(dataAppendFunc, list, showcount, everycount) {

    var self = this;

    self.dataAppendFunc = dataAppendFunc;
    
    //闃叉澶氭娉ㄥ唽浜嬩欢
    window.removeEventListener("scroll", isNowScroll, false);

    //姣忔鍔犺浇鍒�  showcount * everycount鐨勭储寮�;
    if (typeof showcount == "undefined") {
        showcount = 1;
    }
    if (typeof everycount == "undefined") {
        everycount = 4;
    }
    
    //杩涘叆椤甸潰榛樿绗竴娆″姞杞斤紱
    DS.newlist = list.slice(everycount * (showcount - 1), everycount * showcount);

    //杩欎釜鏂规硶蹇呴』鏀惧湪杩欎釜浣嶇疆锛屽墠闈㈢殑鎵ц瀹屼簡锛屾墠鑳借繘琛屾坊鍔犳暟鎹紝
    //鏁版嵁鎵嶈兘鎵ц鍚庨潰鐨勫彉閲忚祴鍊煎拰鏂规硶銆�!!!!!!!!!!important

    var ajaxtimes = 0;


    this.asynLoading = function(newlist, dataAppendFunc) {


        if(ajaxtimes > 0) {
            //璇锋眰鏁版嵁寮€濮媗oading鍔ㄧ敾
            cssLoadingAnimate(true);

            //濡傛灉鏈潵灏辨病鏁版嵁锛屽氨鏄剧ず绌虹┖濡備篃锛屾湰鏉ユ湁鏁版嵁锛屾粦鍒板簳浜嗘墠浼氭樉绀烘病鏈夋暟鎹簡
            if (newlist.length == 0) {
                if($$(".seeshopscom")) {
                    //鏁版嵁鍔犺浇瀹屾瘯鍙栨秷loading鍔ㄧ敾
                    cssLoadingAnimate(false);
                    return;
                }

                var nodata = document.createElement("div");
                nodata.className = "nodata";
                nodata.innerHTML = "娌℃湁鏁版嵁浜嗭紒";
                if(!$$(".nodata") && ($$("#caseList") || $$(".detailbox") || $$(".mycomment") || $$(".purchase_list") || $$(".order") || $$("#collection") || $$("#purchase_list"))) {
                    $$("body").appendChild(nodata);
                }

                //鏁版嵁鍔犺浇瀹屾瘯鍙栨秷loading鍔ㄧ敾
                cssLoadingAnimate(false);

                return;
            }

        }

        ajaxtimes++;

        //杩欎釜鏂规硶蹇呴』鏀惧湪杩欎釜浣嶇疆锛屽墠闈㈢殑鎵ц瀹屼簡锛屾墠鑳借繘琛屾坊鍔犳暟鎹紝
        //鏁版嵁鎵嶈兘鎵ц鍚庨潰鐨勫彉閲忚祴鍊煎拰鏂规硶銆�!!!!!!!!!!important
        //灏嗘柊鏁版嵁鐨勬暟缁勫垪琛ㄤ紶鍏ュ嚱鏁帮紝锛岃鍑芥暟閬嶅巻
        dataAppendFunc(DS.newlist);

        ////////########$#$#$%#$@$@#$@@$@$@#$%%^#&*#%$@%^@/////////

        showcount++;
        DS.newlist = list.slice(everycount * (showcount - 1), everycount * showcount);

        //鏁版嵁鍔犺浇瀹屾瘯鍙栨秷loading鍔ㄧ敾
        //cssLoadingAnimate(false);


        //鏂板厓绱犳坊鍔犲畬姣曪紝锛屽皢杩欎釜鍊艰浆涓簍rue锛屾帶鍒朵笅娆℃粴鍔ㄦ椂鍙互鏈夋晥瑙﹀彂  锛岃繖涓坊鍔犳柊鍏冪礌鐨勬柟娉曘€�
        //濡傛灉瑕佽嚜宸卞湪椤甸潰鍔犺浇瀹屾垚鐨勫湴鏂瑰姞涓爣璁帮紝
        if (DS.pagecomplete == undefined) {
            DS.lll = true;

            //鏁版嵁鍔犺浇瀹屾瘯鍙栨秷loading鍔ㄧ敾
            cssLoadingAnimate(false);
        } else {

            if (DS.pagecomplete == false) {
                var timercol = 0;
                function reqAni() {
                    var timer = requestAnimationFrame(reqAni);
                    if(DS.pagecomplete == true || timercol++ > 500) {
                        cancelAnimationFrame(timer);
                        //鏁版嵁鍔犺浇瀹屾瘯鍙栨秷loading鍔ㄧ敾
                        cssLoadingAnimate(false);
                    }
                    timercol++;
                    console.log("nono");

                }
                reqAni();
            }

        }


    };

    //椤甸潰鍔犺浇鏃堕渶瑕侀粯璁ょ殑绗竴娆℃坊鍔犲厓绱�
    self.asynLoading(DS.newlist, dataAppendFunc);


    //鍒濆鍖栬繖涓€硷紝鎺у埗娣诲姞鏂板厓绱犵殑鏂规硶浠€涔堟椂鍊欐墽琛屻€�
    DS.lll = true;

    //椤甸潰鐨勬暣浣撻珮搴︿笉闇€瑕佸疄鏃惰绠楋紝鍙互鎻愰珮鐐规€ц兘锛岀涓€娆＄绠椾竴娆★紝锛岋紝鐒跺悗椤甸潰鏂板姞鍏ュ厓绱犱箣鍚庤绠楀氨琛屻€�
    //濡傛湁闇€瑕佸彲浠ョ粰椤甸潰鍔犲叆涓€涓狣S銆俢omplete灞炴€э紝鏉ョ洃鍚〉闈㈢殑鍔犺浇鎯呭喌锛岄伩鍏嶅嚭鐜癰odyH鑾峰彇涓嶆甯哥殑鎯呭喌銆�
    if (DS.pagecomplete != undefined) {

        //濡傛灉缁欓〉闈㈠姞浜嗚繖涓睘鎬с€傞偅涔堜細璧拌繖涓€姝ワ紝杩欎釜灞炴€т竴瀹氳鍦ㄨ繖涓柟娉曟墽琛屾墽琛岃缃�
        //鐩戝惉杩欎釜鍊间负true鎵嶄細鍋滄杞锛屾墍浠ヤ袱涓姸鎬佷竴瀹氳璁剧疆

        if (DS.pagecomplete == false) {
            var timercol = 0;
            var _reqAni = function() {
                var bodyHtimer = requestAnimationFrame(_reqAni);
                if(DS.pagecomplete == true ||   timercol > 500) {
                    DS.bodyH = document.body.clientHeight;
                    cancelAnimationFrame(bodyHtimer);

                }
                timercol++;
                console.log("nono");
            };
            _reqAni();
        }

    } else {
        //娌℃湁DS銆俻agecomplete灞炴€э紝璇存槑杩欎釜椤甸潰涓嶉渶瑕佽繖涓睘鎬�
        DS.bodyH = document.body.clientHeight;
    }


    //椤甸潰鍔犺浇杩囨參浼氬鑷磋繖涓€间负0锛�
    //鎵€浠ュ湪杩欎釜浣嶇疆椤甸潰鍑烘潵鍚庡湪杩涜璁＄畻
    var baseH = document.documentElement.clientHeight;

    //js閲岄潰鎺у埗鍥剧墖婊氬睆鍔犺浇鐨勬柟娉�;
    //鍒濇鍔犺浇
    if (DS.pagecomplete == undefined) {
        scrollLoadingImg(0, baseH);
    } else {
        reqAni();
        var timercol = 0;
        function reqAni() {
            var timer = requestAnimationFrame(reqAni);
            if (DS.pagecomplete == true || timercol > 500) {
                cancelAnimationFrame(timer);
                scrollLoadingImg(0, baseH);
                console.log("a")
            }
            timercol++;
        }
    }

    window.addEventListener("scroll", isNowScroll, false);

    function isNowScroll(time) {

        if(typeof time == "undefined") {
            time = 500;
        }

        if(DS.scrolltimer) {
            clearInterval(DS.scrolltimer);
        }

        var scrTop = document.documentElement.scrollTop || document.body.scrollTop;

        //鍥剧墖鍔ㄦ€佹坊鍔�
        DS.scrolltimer = setTimeout(function () {
            scrollLoadingImg(scrTop, baseH)
        }, time);


        //椤甸潰鏁版嵁鍔ㄦ€佸姞杞姐€�
        //鍙湁鍚戜笅婊氬姩鏃舵垨婊戝姩鏃舵墠浼氳Е鍙戞粴灞忓姞杞姐€�
        // var scrTop = document.documentElement.scrollTop || document.body.scrollTop;

        //baseH鏄痡s閲岄潰瀹氫箟鐨勫綋鍓嶉〉闈㈡墍鍦ㄥ鎴风鐨勫睆骞曠殑楂樺害銆�
        if (baseH + scrTop > DS.bodyH - 100) {
            if (DS.lll) {
                //浠ュ厤婊氬姩鏃跺洖璋冨嚱鏁版鏁拌Е鍙戦€犳垚鐨刡ug锛岋紝鍙湁褰撻〉闈㈡柊鍏冪礌娣诲姞瀹屾瘯浠ュ悗锛岃繖涓€兼墠鑳介噸鏂颁负true锛�
                //鍦ㄤ笅娆℃粴鍔ㄥ埌椤甸潰搴曢儴瑕佸姞鍏ユ柊鍏冪礌鏃朵娇鍑芥暟鍙互缁х画鎵ц銆�
                //澶嶅埗false蹇呴』瑕佹斁鍦ㄥ嚱鏁版墽琛屼箣鍓嶃€�
                DS.lll = false;

                self.asynLoading(DS.newlist, self.dataAppendFunc);

                //鏂扮殑鍏冪礌鍔犺繘鏉ュ悗閲嶆柊璁＄畻body鐨勬暣浣撻珮搴︺€�
                DS.bodyH = document.body.clientHeight;
            }

        }


    }
}


//瀵归鍔犺浇鑳屾櫙鍥剧墖鐨勫鐞�
//img瀹為檯鐨勫浘鐗囪矾寰�
//i鏆傚瓨绱㈠紩锛屼笉闇€瑕佺殑璇濓紝闅忎究浼犱竴涓€硷紝
// defaultbg 榛樿鐨勫姞杞借儗鏅浘
function preloadbg(img, i, defaultbg) {
    //var ww = document.documentElement.clientWidth;
    var html = "";
    html += '<div class="allpreContainer">';
    html += '<div class="inoutbg" style="background-image:url(' + defaultbg + ');background-size: cover; background-position: 50% 50%; background-repeat: no-repeat;"></div>';
    html += '<img class="preloadbg preloadbg' + i + '" src-data="' + img + '" src="" loaded="false">';
    html += '<div class="DSbg DSbg' + i + '" style="background-image: url(' + defaultbg + '); background-size: cover; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div>';
    html += '</div>';
    return html;
}