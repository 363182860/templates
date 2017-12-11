//瀹炵幇鍥剧墖鐨勬粴灞忓姞杞�


var lastTime = 0;
var prefixes = 'webkit moz ms o'.split(' '); //鍚勬祻瑙堝櫒鍓嶇紑

var requestAnimationFrame = window.requestAnimationFrame;
var cancelAnimationFrame = window.cancelAnimationFrame;

//閫氳繃閬嶅巻鍚勬祻瑙堝櫒鍓嶇紑锛屾潵寰楀埌requestAnimationFrame鍜宑ancelAnimationFrame鍦ㄥ綋鍓嶆祻瑙堝櫒鐨勫疄鐜板舰寮�
for (var i = 0; i < prefixes.length; i++) {
    if (requestAnimationFrame && cancelAnimationFrame) {
        break;
    }
    prefix = prefixes[i];
    requestAnimationFrame = requestAnimationFrame || window[prefix + 'RequestAnimationFrame'];
    cancelAnimationFrame = cancelAnimationFrame || window[prefix + 'CancelAnimationFrame'] || window[prefix + 'CancelRequestAnimationFrame'];
}

//濡傛灉褰撳墠娴忚鍣ㄤ笉鏀寔requestAnimationFrame鍜宑ancelAnimationFrame锛屽垯浼氶€€鍒皊etTimeout
if (!requestAnimationFrame || !cancelAnimationFrame) {
    requestAnimationFrame = function (callback, element) {
        var currTime = new Date().getTime();
        //涓轰簡浣縮etTimteout鐨勫敖鍙兘鐨勬帴杩戞瘡绉�60甯х殑鏁堟灉
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function () {
            callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };

    cancelAnimationFrame = function (id) {
        window.clearTimeout(id);
    };
}

//寰楀埌鍏煎鍚勬祻瑙堝櫒鐨凙PI
window.requestAnimationFrame = requestAnimationFrame;
window.cancelAnimationFrame = cancelAnimationFrame;


function bannerslider(obj) {
    if (obj.length > 0) {
        obj.each(function () {
            var _this = $(this);
            var _winW = $('body').width();
            var _oBox = _this.find('.fullscreen-box');
            var _oUl = _oBox.find('.fullscreen-box-in');
            var _oW = _this.width();
            var _oLen = _oBox.find('li').length;
            var _oBtn = _this.find('.fullscreen-btn');
            var _oCount = 0;
            var _oAutoplay, startX = 0, endX, distance, autoPlay;//瑙︽懜寮€濮嬫椂鎵嬪娍妯潗鏍�
            var isMove = true;
            var original_left = 0;
            _oUl.css({width: _oW * _oLen});
            for (var i = 0; i < _oLen; i++) {
                _oBtn.append('<span></span>');
            }
            ;
            function _Original() {
                _oBtn.find('span').eq(_oCount).addClass('active').siblings().removeClass('active');
                _oUl.stop().animate({left: -_oCount * _oW}, 800);
            }

            _Original();
            _oBtn.find('span').click(function () {
                _oCount = $(this).index();
                _Original();
            });
            function _autoplay() {
                _oAutoplay = setInterval(function () {
                    _oCount++
                    if (_oCount >= _oLen) {
                        _oCount = 0;
                    }
                    _Original()
                }, 6000);
            }

            _autoplay();
            obj.mouseover(function () {
                clearInterval(_oAutoplay)
            }).mouseleave(function () {
                _oCount = _oCount;
                _autoplay();
            });
            function blindtouchevent() {
                document.getElementById('banner').addEventListener('touchstart', touchStartFunc, false);
                document.getElementById('banner').addEventListener('touchmove', touchMoveFunc, false);
                document.getElementById('banner').addEventListener('touchend', touchEndFunc, false);
            }

            // 鑾峰彇瑙︽懜鏃剁殑浣嶇疆

            function touchStartFunc(e) {
                event.preventDefault();
                clearInterval(_autoplay)
                var touch = e.touches[0];
                _startx = Number(touch.pageX);
                original_left = _this.position.left;
            };
            function touchMoveFunc(e) {
                event.preventDefault();
                clearInterval(_autoplay)
                if (isMove) {

                    distance = Number(_startx - e.touches[0].pageX);
                    // console.log("distance----"+distance);
                }

            };
            function leftSlider() {
                _oCount--;
                if (_oCount < 0) {
                    _oCount = 0;
                }
                _Original()

            };
            function rightSlider() {
                _oCount++;
                if (_oCount >= _oLen) {
                    _oCount = 0;
                }
                _Original();

            };
            function touchEndFunc(e) {
                event.preventDefault();
                clearInterval(_autoplay)
                // _oCount =_oCount;
                // _autoplay()

                isMove = false;
                endX = e.changedTouches[0].pageX;

                distance = Number(endX - _startx);
                // alert(distance)
                if (Math.abs(distance) > _winW / 10) { //exceed 1/7
                    if (distance > 0) { //right
                        // alert('鍚戝乏婊戝姩')
                        leftSlider();
                    } else { //left
                        // alert('鍚戝彸婊戝姩')
                        rightSlider();
                    }
                } else {
                    MotoToOriginal();
                }
                ;
            };
            blindtouchevent();

        });
    }
    ;
};

function closeview() {
    var close = document.createElement("a");
    close.className = "close";
    if (!document.querySelector(".close")) {
        document.body.appendChild(close);
        close.href = "javascript:;";
        close.style.display = "block";
        close.style.width = "7.5rem";
        close.style.height = "45px";
        close.style.position = "fixed";
        close.style.left = "0";
        close.style.bottom = "0";
        close.style.lineHeight = "45px";
        close.style.textAlign = "center";
        close.style.color = "#888";
        close.style.zIndex = "1000000";
    } else {

        $(".close").removeClass("none");
    }
}

var setScrT;

var openveiewani;


function prevent(event) {
    event.preventDefault();
}

function slideOpen(resource, target) {
    resource.click(function () {
        window.sct = document.body.scrollTop;
        $("#menu").hide();
        Array.prototype.slice.call(document.querySelectorAll(".iframew")).forEach(function (item) {
            item.contentWindow.document.addEventListener("touchmove", prevent, false);
        })
        target.addClass("openview");
        var _top = 100;
        cancelAnimationFrame(openveiewani);
        var _reqAni = function () {
            openveiewani = requestAnimationFrame(_reqAni);
            target.css({
                top: (_top -= (_top / 5)) + "%"
            });
            if (_top <= 0.1) {
                target.css({
                    top: "0%"
                });
                cancelAnimationFrame(openveiewani);
            }
        };
        _reqAni();
        //target.siblings("div").addClass("alpha");
        setTimeout(function () {
            //target.siblings("div").addClass("none");
            closeview()
        }, 400);

    });
}


function slideClose() {
    $(document).delegate(".close", "click", function () {

        $(".openview").siblings("div").removeClass("none alpha");

        var target = $(".openview");
        var _top = 0;
        var _basespeed = 10;
        cancelAnimationFrame(openveiewani);
        var _reqAni = function () {
            openveiewani = requestAnimationFrame(_reqAni);
            target.css({
                top: (_top += (_basespeed -= 0.1)) + "%"
            });
            if (_top >= 99.1) {
                target.css({
                    top: "100%"
                });
                cancelAnimationFrame(openveiewani);
            }
        };
        _reqAni();
        $(this).remove();
        setTimeout(function () {
            $(".openview").removeClass("openview");
            $(".scroll-wrapper").html("");
            $(".container").not(".scroll-wrapper .container").css({
                position: "relative",
                overflow: "auto"
            });
            document.body.scrollTop = window.sct;
            setTimeout(function () {
                $(".container").not(".scroll-wrapper .container").css({
                    opacity: 1
                })
            }, 200)
            $("#menu").show();
        }, 300);
    })
}

//
//function backToTop() {
//
//    var backTop = document.createElement("div");
//    backTop.className = "backTop";
//    backTop.innerHTML = '<div class="go-top top-button-hide" data-reactid="343"><span data-reactid="344">椤堕儴</span></div>';
//    document.body.appendChild(backTop);
//    window.addEventListener("scroll", function (event) {
//        if (document.body.scrollTop > 800) {
//            $(".go-top").removeClass("top-button-hide").addClass("top-button-show")
//        } else {
//            $(".go-top").addClass("top-button-hide").removeClass("top-button-show")
//        }
//    });
//    goTop();
//}
//
//
//function goTop() {
//    var imgtimer;
//    $(".go-top").click(function () {
//        var _scr = $("body").scrollTop();
//        var _reqAni = function () {
//            imgtimer = requestAnimationFrame(_reqAni);
//            if (_scr > 5000) {
//                $("body").scrollTop(_scr -= _scr);
//            } else {
//                $("body").scrollTop(_scr -= _scr / 5);
//            }
//
//            if (_scr <= 1) {
//                $("body").scrollTop(0);
//                cancelAnimationFrame(imgtimer);
//            }
//        };
//        _reqAni();
//
//        document.addEventListener("touchmove", function (event) {
//            cancelAnimationFrame(imgtimer);
//        }, false);
//    });
//}


var fixeddata = [
    {
        name: "west",
        content: "鎴愬姛棰嗗彇浜�100鍏冧紭鎯犲埜涓€寮�",
        headerportarit: "http://t.mec-ty.com/chuan/chacha/images/01.jpg"
    },
    {
        name: "钀ㄥ皵鍙�",
        content: "鎴愬姛棰嗗彇浜�50鍏冧紭鎯犲埜涓€寮�",
        headerportarit: "http://t.mec-ty.com/chuan/chacha/images/02.jpg"
    },
    {
        name: "涓変釜浜�",
        content: "鎴愬姛棰嗗彇浜�10鍏冧紭鎯犲埜涓€寮�",
        headerportarit: "http://t.mec-ty.com/chuan/chacha/images/03.jpg"
    },
    {
        name: "濡傛灉",
        content: "鎴愬姛棰嗗彇浜�100鍏冧紭鎯犲埜涓€寮�",
        headerportarit: "http://t.mec-ty.com/chuan/chacha/images/04.jpg"
    },
    {
        name: "鐨勬帹浠嬩細鐨�",
        content: "鎴愬姛棰嗗彇浜�10鍏冧紭鎯犲埜涓€寮�",
        headerportarit: "http://t.mec-ty.com/chuan/chacha/images/05.jpg"
    },
    {
        name: "璁よ瘑",
        content: "鎴愬姛棰嗗彇浜�50鍏冧紭鎯犲埜涓€寮�",
        headerportarit: "http://t.mec-ty.com/chuan/chacha/images/06.jpg"
    }


];


/*娴侀噺闂厖*/
function flow() {
    var flowtel = $(".flowtel");
    var val;
    var reg = /^\d*$/;
    flowtel.on("input", function () {
        val = $(this).val();
        if (!reg.test(val)) {
            $(this).val("");
        }
        if (val.length == 11) {
            $(".disable").removeClass("disable");
            $(".nobtn").css({
                display: "none"
            })
        } else {
            $(".flow-btn").addClass("disable");
            $(".nobtn").css({
                display: "block"
            })
        }
    });

    $(".flow-slide").click(function () {
        if ($(this).attr("choosen") == "true") {
            $(this).find("span").removeClass("flow-slide-rg").addClass("flow-slide-lf");
            $(this).removeClass("flow-slide-red").addClass("flow-slide-gray");
            setTimeout(function () {
                $(this).find("span").removeClass("flow-slide-lf");
                $(this).removeClass("flow-slide-gray");
            }.bind(this), 300);
            $(this).attr("choosen", "false");
        } else {
            $(this).find("span").addClass("flow-slide-rg");
            $(this).addClass("flow-slide-red");
            $(this).attr("choosen", "true");
        }

    })
}


/*鍔ㄦ晥寮瑰嚭妗�*/
function popwindow(title, content) {
    var pop;
    if (!document.querySelector(".popw")) {
        var popw = document.createElement("div");
        document.body.appendChild(popw);
        popw.className = "popw";
        popw.innerHTML = "<div class='popwbg'></div><div class='popwbox'><div class='popwtitle'></div><div class='popwcontent'></div><div><div class='popwcc'><a href='javascript:;' class='popwcancel'>鍙栨秷</a><a href='javascript:;' class='popwcomfirm tixiancomfirm'>纭畾</a></div></div></div>"
        canclepopw();
    }
    $(".popwtitle").html(title);
    $(".popwcontent").html(content);
    pop = document.querySelector(".popw")
    pop.style.display = "-webkit-box";
    $(".popwbox").addClass("popwboxshow");

    $(".tixiancomfirm").click(function () {
        $.ajax({
            type: "post",
            url: "/Customer/Settlement",
            dataType: "json",
            success: function (data) {
                if (data.statusCode == "200") {
                    alert("鎻愮幇鎴愬姛");
                }
                else {
                    alert(data.message);
                }
            }
        });

    })
}


/*娣樺彛浠�*/
function popTao(img, title, content, tip) {
    var pop;
    if (!document.querySelector(".popw")) {
        var frag = document.createDocumentFragment(), html = "";
        var popw = document.createElement("div");
        frag.appendChild(popw);
        popw.className = "popw";
        html += "<div class='popwbg'></div>";
        html += "<div class='popwbox taobox'>";
        html += "<div class='taologo' style='background-image:url(" + img + ")'></div>";
        html += "<div class='taocon'>";
        html += "<div class='taotitle'>";
        html += "<div class='popwtitle taotitle'>闀挎寜铏氱嚎妗嗗唴鏂囧瓧鈥斺€�>>鍏ㄩ€夆€斺€�>>澶嶅埗</div>";
        html += "<div class='popwcontent' id='taocontent'></div>";
        html += "</div></div>";
        html += "<div class='taotip'>鎻愮ず锛氬鍒舵垚鍔燂紝鎵撳紑娣樺疂灏嗕細鑷姩璺宠浆鐩稿簲椤甸潰</div>";
        html += "<div class='taokaobox'>";
        if (!tip) {
            if (isIos()) {
                html += "<a href='javascript:;' class='taokao taokaocopy'><img src='/Resources/images/ioscopy.png'></a>";
            } else {
                html += "<a href='javascript:;' class='taokao taokaocopy'><img src='/Resources/images/androidcopy.png'></a>";
            }
        } else {
            html += "<a href='javascript:;' class='taokao'>" + tip + "</a>";
        }

        html += "</div>";
        html += "</div>";
        popw.innerHTML = html;
        document.body.appendChild(frag);
        canclepopw();

    }
    //$(".popwtitle").html(title);
    $(".popwcontent").html("<div id='copy_key_ios'>" + content + "</div>" + "<textarea class='copybox' id='copy_key_android'>" + content + "</textarea>");
    pop = document.querySelector(".popw");
    pop.style.display = "-webkit-box";
    $(".popwbox").addClass("popwboxshow");
    $(".copybox").on("input", function () {
        $(this).val(content);
    });

    //涓汉涓績浼欎即椤甸潰鍖哄垎
    if($(".partnerwx").length < 1) {
        selection()
    } else {
        $(".copybox").hide();
    }

}


/*鍙栨秷*/
function canclepopw() {
    $(".popwcancel,.popwbg,.popwcomfirm").click(function () {
        $(".popwbox").removeClass("popwboxshow");
        $(".popw").remove();
    })
}


/*鐐瑰嚮鎼滅储鐑棬*/
function searchList() {
    $(document).delegate(".searchlist a", "click", function () {
        $(".searchcon").val($(this).html())
    })
}

/*鎮诞鎻愮ず妗�*/
function userAction(name, content, headerportrait) {
    var act;
    if (!document.querySelector(".useract")) {
        var useract = document.createElement("div");
        document.body.appendChild(useract);
        useract.className = "useract";

    }
    act = document.querySelector(".useract");
    act.innerHTML = "<img src='" + headerportrait + "'>" + name + ":" + content;
    act.classList.add("useractshow");
}


/*鎺夊井淇″浘闆�*/
function openWXimg() {

    $(".pjimg").each(function (index) {
        var imgsObj = $(this).find("div");
        var imgs = new Array();
        for (var i = 0; i < imgsObj.size(); i++) {
            imgs.push(imgsObj.eq(i).attr('src'));
        }

        $(this).find("div").on('click', function () {
            WeixinJSBridge.invoke('imagePreview', {
                'current': $(this).attr('src'),
                'urls': imgs
            });
        });
    })

}

function selection() {
    if (isIos()) {
        $("#copy_key_ios").css("display", "block");
        $("#copy_key_android").css("display", "none");
    } else {
        $("#copy_key_ios").css({
            "display": "block",
            opacity: 0,
            position: "relative",
            "z-index": 1
        });
        $("#copy_key_android").height($("#copy_key_ios").height() + "px");
        $("#copy_key_ios").hide();

    }
    document.addEventListener("selectionchange", function (e) {
        if (window.getSelection().anchorNode.parentNode.id == 'copy_key_ios' || window.getSelection().anchorNode.id == 'copy_key_ios') {
            var key = document.getElementById('copy_key_ios');
            window.getSelection().selectAllChildren(key);
        }
    }, false);

}



function replyAsking() {

    var fy = $(".fenyong");
    var tg = $(".taogu");
    var rs = $(".replyasking");
    var hc = $(".ordercopyhow");
    var wdl = $(".whydaylong");
    fy.click(function () {
        $(".replyasking").html("i am the fenyong ");

    });
    tg.click(function () {
        $(".replyasking").html("i am the 娣樺疂榧撳姳閲�");

    });
    hc.click(function () {
        $(".replyasking").html("灏辨槸杩欎箞澶嶅埗鐨�");

    });
    wdl.click(function () {
        $(".replyasking").html("鍥犱负鏃堕棿灏辨槸杩欎箞涔�");

    });
    //slideOpen(fy, rs);
    //slideOpen(tg, rs);
    slideOpen(hc, rs);
    slideOpen(wdl, rs);
}

window.addEventListener("scroll", function () {
    imgScrollIndex = 0;
    scrollLoadingImg(null, document.documentElement.clientHeight);
}, false);


//寤舵椂鐩戝惉
setTimeout(function () {
    //鐩戝惉鐗╃悊杩斿洖鎸夐挳
    window.addEventListener("popstate", function (e) {
        $(".close").click();
        $(".close").hide();
        $("#menu").show();
    }, false);

}, 300);
/**
 * [pushHistory 鍐欏叆绌虹櫧鍘嗗彶璁板綍]
 * @author 閭卞厛鐢�
 * @copyright 鐑熺伀閲岀殑灏樺焹
 * @version [V1.0鐗堟湰]
 * @date 2016-07-30
 * @return {[type]} [description]
 */
function pushHistory() {
    var state = {
        title: "title",
        url: "#"
    };
    window.history.pushState(state, "title", "#");
}


$(function () {
    bannerslider($('.fullscreen-contain'));
    searchList();
    openWXimg();
    flow();
    replyAsking();

    var chirldCategory = getId("chirldCategory");

    $(".alltopnavbar a,.index_navbar a").each(function () {
        if (chirldCategory != undefined && $(this).data("id") == chirldCategory) {
            $(this).addClass("cur");
        }
    });





    var topnavopen = false;

    $(".topnavlistbtn,.blackbg").click(function () {
        topnavopen = !topnavopen;

        var i = 0;
        var allnav = $(".alltopnavbar");
        var btnimg = $(".topnavlistbtn img");
        var _h = allnav.outerHeight(true) + 45;
        var blbg = $(".blackbg");
        if (topnavopen) {
            allnav.css({
                transform: "translate(0," + (_h + 1) + "px)",
                webkitTransform: "translate(0," + (_h + 1) + "px)",
                transition: "all 0.3s",
                webkitTransition: "all 0.3s"
            });

            btnimg.css({
                transform: "rotate(180deg)",
                webkitTransform: "rotate(180deg)",
                transition: "all 0.3s",
                webkitTransition: "all 0.3s"
            });
            blbg.show();
        } else {
            allnav.css({
                transform: "translate(0,-" + 0 + "px)",
                webkitTransform: "translate(0,-" + 0 + "px)",
                transition: "all 0.3s",
                webkitTransition: "all 0.3s"
            });
            btnimg.css({
                transform: "rotate(0)",
                webkitTransform: "rotate(0)",
                transition: "all 0.3s",
                webkitTransition: "all 0.3s"
            });
            blbg.hide();
        }
    })

    $(".fankuitypelist a").click(function () {
        $(this).addClass("cur").siblings().removeClass("cur");
    })
    $(".ideaintrotext").on("input", function () {
        var val = $(this).val();
        $(".idearule").html(val.length + "/200")
        if (val.length >= 10 && val.length <= 200) {
            $(".ideasub").addClass("ideacansub");
        } else {
            $(".ideasub").removeClass("ideacansub");
        }
    })

    setTimeout(function () {
        scrollLoadingImg(null, document.documentElement.clientHeight);
    }, 1000)


    $(".flow-down-up li").click(function () {
        $(this).addClass("active").siblings().removeClass("active")
    })

    $(".usergotx").click(function () {
        popwindow("鎻愮幇", "鐐瑰嚮纭畾鍓╀綑娆鹃」灏嗕細鍏ㄩ儴杞叆鎮ㄧ殑寰俊璐﹀彿")
    })

    $(".partnerwx").click(function () {

        if ($(this).attr('data-ewm') == "") {
            popTao($(this).attr("data-img"), "", "鏆傛棤浜岀淮鐮�", "闀挎寜鍥剧墖璇嗗埆浜岀淮鐮�");
        } else {
            popTao($(this).attr("data-img"), "", "<img class='partnerewm' src='" + $(this).attr('data-ewm') + "'>", "闀挎寜璇嗗埆浜岀淮鐮�");
        }


        $(".taokaobox").html('<a href="javascript:;" class="taokao">闀挎寜璇嗗埆浜岀淮鐮�</a>')

        $(".popwcontent").css({
            "text-align": "center"
        })
    });

    $(".partnerphone").click(function () {
        if ($(this).attr('data-phone') == "") {
            popTao($(this).attr("data-img"), "", "鏆傛棤鐢佃瘽鍙风爜");
        } else {
            popTao($(this).attr("data-img"), "", $(this).attr("data-phone"));
        }

        $(".taokaobox").html("<div class='popwcc'><a href='javascript:;' class='popwcancel' onclick='$(\".popwbg\").click()'>鍙栨秷</a><a href='tel:" + $(this).attr("data-phone") + "' class='popwcomfirm'>鎷ㄦ墦</a></div>")
        $(".popwcontent").css({
            "text-align": "center"
        })
    })

//    var i = 0;
//    if (window.location.href.indexOf("index") > -1) {
//        setInterval(function () {
//            userAction(fixeddata[i].name, fixeddata[i].content, fixeddata[i].headerportarit);
//            setTimeout(function () {
//                $(".useract").removeClass("useractshow");
//            }, 3000)
//            i++;
//            if (i == fixeddata.length) {
//                i = 0;
//            }
//        }, 5000)
//    }

    $(".upgood_icon").click(function () {
        $(this).toggleClass("bezan");
        var num = Number($(this).parent().find(".upgood_num").html());
        if ($(this).hasClass("bezan")) {
            $(this).parent().find(".upgood_num").html(++num)
        } else {
            $(this).parent().find(".upgood_num").html(--num)
        }
    });


    $(document).delegate(".goods_list a", "click", function () {
        if ($(this).hasClass("new-coupon")) return;

        // $(selector).undelegate(selector,event,function)
        event.preventDefault();
        isLoadingOrIsLoaded("", true, false);
        window.sct = document.body.scrollTop;

        if ($(".scroll-wrapper").length < 1) {
            var scroll = document.createElement("div");
            scroll.className = "scroll-wrapper";
            document.body.appendChild(scroll);
        }


        $.ajax({
            type: "get",
            url: $(this).attr("href"),
            dataType: "text",
            success: function (data) {
                pushHistory();
                var tscroll = $(".scroll-wrapper");
                var bodystart = data.indexOf("<body>");
                var bodyend = data.indexOf("</body>");
                tscroll.html(data.slice(bodystart + 7, bodyend));
                /*var frame = $(".goodsframe");

                 frame.attr("src", $(this).attr("href"));*/

                tscroll.addClass("openview");

                $(".container").not(".scroll-wrapper .container").css({
                    opacity: 0,
                    position: "fixed",
                    overflow: "hidden"
                });

                var _top = 100;
                cancelAnimationFrame(openveiewani);
                var _reqAni = function () {
                    openveiewani = requestAnimationFrame(_reqAni);
                    tscroll.css({
                        top: (_top -= (_top / 5)) + "%"
                    });
                    if (_top <= 0.1) {
                        tscroll.css({
                            top: "0%",
                        });
                        cancelAnimationFrame(openveiewani);
                    }
                };
                _reqAni();
                //target.siblings("div").addClass("alpha");
                setTimeout(function () {
                    //target.siblings("div").addClass("none");
                    closeview();
                    $(".close").addClass("none");
                }, 400);

                isLoadingOrIsLoaded("", false, true);
                scrollLoadingImg(null, screen.availHeight);

                $("#menu").hide();

            }
        });


    })


    $(".type_each").each(function (index) {
        $(this).click(function () {
            $(this).addClass("type_each_red").siblings().removeClass("type_each_red").find(".type_box").removeClass("type_box_red");
            $(this).addClass("type_each_red").siblings().find(".red_bottom").css("display", "none");
            $(this).find(".type_box").addClass("type_box_red");
            $(this).find(".red_bottom").css("display", "block");
            var type = $(this).attr("type");
            $("." + type).css("display", "block").siblings().css("display", "none");
        })
    });

    slideOpen($(".shaidan"), $(".publish"));
    slideOpen($(".miaofabu"), $(".publish"));
    slideOpen($(".topsearch"), $(".searchpage"));
    slideOpen($(".questionsearch"), $(".searchpage"));
    slideClose();

});


//鏀惰棌鍒犻櫎
function Delcard(ele) {
    this.ele = ele;
};
Delcard.prototype = {
    constructor: Delcard,
    _x: 0,
    _y: 0,
    _movex: 0,
    _movey: 0,
    _touch: null,
    movetimes: 0,
    canmove: false,
    canend: true,
    pNode: function () {
        return this.ele.parentNode;
    },
    prevent: function (event) {
        event.preventDefault()
    },
    isMoved: function () {
        var _ismoved = this.pNode().getAttribute("ismoved");
        if (_ismoved == "true") {
            return true;
        } else {
            this.canmove = false;
            this.movetimes = 0;
            return false;
        }
    },
    getPoint: function (event) {
        var touches = event.targetTouches;
        if (touches.length == 1) {
            var _touch = this._touch = touches[0];
            if (event.type == "touchstart") {
                this._x = _touch.pageX;
                this._y = _touch.pageY;
            }
            return _touch;
        } else {
            return false;
        }
    },
    start: function (event) {
        var that = this;
        this.getPoint(event);
        var _ismoved = this.isMoved(this.pNode());
        if (_ismoved) {
            this.pNode().style.transform = "translate3d(0px,0,0)";
            this.pNode().setAttribute("ismoved", "false");
            setTimeout(function () {
                that.ele.removeChild(document.querySelector(".collzhe"))
            }, 500)

        }
        this.ele.addEventListener("touchmove", that.move.bind(that), false);

    },
    move: function (event) {
        var that = this;
        var _touch = this.getPoint(event);
        if (!_touch) {
            return;
        }
        this._movex = _touch.pageX - this._x;
        this._movey = _touch.pageY - this._y;
        console.log(_touch.pageX, this._movex)
        if (this.movetimes == 0) {
            setTimeout(function () {
                if (Math.abs(that._movex) / Math.abs(that._movey) > 2) {
                    that.ele.addEventListener("touchmove", that.prevent, false);
                    that.pNode().style.transition = "all 0s";
                    that.canmove = true;
                    if (that.canend == true) {
                        that.ele.addEventListener("touchend", that.end.bind(that), false);
                        that.canend = false;
                    }
                    return;
                }
                that.ele.removeEventListener("touchmove", that.move.bind(that), false);
                //that.ele.removeEventListener("touchend", that.end.bind(that), false);
            }, 25);
            that.movetimes++;
        }
        if (that.canmove && this._movex > -100 && this._movex < 0) {
            this.pNode().style.transform = "translate3d(" + that._movex + "px,0,0)";
        }
    },
    end: function (event) {
        console.log(this);
        this.canmove = false;
        this.movetimes = 0;
        this.pNode().style.transition = "all 0.3s";
        if (this._movex < -50) {
            this.pNode().setAttribute("ismoved", "true");
            this.pNode().style.transform = "translate3d(-100px,0,0)";
            var collzhe = document.createElement("div");
            collzhe.className = "collzhe";
            this.ele.appendChild(collzhe)
        } else {
            this.pNode().style.transform = "translate3d(0px,0,0)";
        }
        this._movex = 0;
        this._movey = 0;
        this.ele.removeEventListener("touchmove", this.prevent, false);
    },
    setMove: function () {
        var that = this;
        this.ele.addEventListener("touchstart", function (event) {

            that.start(event);
        }, false);
        /*this.pNode().addEventListener("touchend", function(event) {
         that.end(event);
         }, false);*/
    }
}


Array.prototype.slice.call(document.querySelectorAll(".libox")).forEach(function (ele) {

    var del = new Delcard(ele);
    del.setMove();

});

