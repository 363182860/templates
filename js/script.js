//ios
if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
   //alert(navigator.userAgent); 
   
   //add a new meta node of viewport in head node
	head = document.getElementsByTagName('head');
	viewport = document.createElement('meta');
	viewport.name = 'viewport';
	viewport.content = 'target-densitydpi=device-dpi, width=' + 640 + 'px, user-scalable=no';
	head.length > 0 && head[head.length - 1].appendChild(viewport);    
   
}
//android
//if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
//  //alert(navigator.userAgent);  
//  window.location.href ="iPhone.html";
//} else if (/(Android)/i.test(navigator.userAgent)) {
//  //alert(navigator.userAgent); 
//  window.location.href ="Android.html";
//} else {
//  window.location.href ="pc.html";
//};

$(function(){
	
	
	//椤甸潰涓嶈冻涓€灞忥紝閾烘弧涓€灞�
	$('.layout').css('min-height',$(window).height());
	
	var glide = $('.glide').glide({

		//autoplay:true,//鏄惁鑷姩鎾斁 榛樿鍊� true濡傛灉涓嶉渶瑕佸氨璁剧疆姝ゅ€�

		animationTime:500, //鍔ㄧ敾杩囧害鏁堟灉锛屽彧鏈夊綋娴忚鍣ㄦ敮鎸丆SS3鐨勬椂鍊欑敓鏁�

		arrows:true, //鏄惁鏄剧ず宸﹀彸瀵艰埅鍣�
		//arrowsWrapperClass: "arrowsWrapper",//婊戝潡绠ご瀵艰埅鍣ㄥ閮―IV绫诲悕
		//arrowMainClass: "slider-arrow",//婊戝潡绠ご鍏叡绫诲悕
		//arrowRightClass:"slider-arrow--right",//婊戝潡鍙崇澶寸被鍚�
		//arrowLeftClass:"slider-arrow--left",//婊戝潡宸︾澶寸被鍚�
		arrowRightText:"",//瀹氫箟宸﹀彸瀵艰埅鍣ㄦ枃瀛楁垨鑰呯鍙蜂篃鍙互鏄被
		arrowLeftText:"",

		nav:true, //涓诲鑸櫒涔熷氨鏄湰渚嬩腑鏄剧ず鐨勫皬鏂瑰潡
		navCenter:true, //涓诲鑸櫒浣嶇疆鏄惁灞呬腑
		navClass:"slider-nav",//涓诲鑸櫒澶栭儴div绫诲悕
		navItemClass:"slider-nav__item", //鏈緥涓皬鏂瑰潡鐨勬牱寮�
		navCurrentItemClass:"slider-nav__item--current" //琚€変腑鍚庣殑鏍峰紡
	});

	
	$(window).scroll(function() {
		//濡傛灉婊氳疆鍚戜笅婊氫簡
		if($("#toTop").size() > 0){
			if($(document).scrollTop() > 0){
				$("#toTop").css("display","block");
				$("#toTop").click(function() {
					$('body').stop().animate({
						scrollTop: 0
					}, 500);
				});
			}else{
				$("#toTop").css("display","none");
			}
		}
	});
});

//娴姩鑿滃崟
$(function() {
	$(window).scroll(function() {
		if($("#s_menu").size() > 0){
			//濡傛灉婊氳疆鍚戜笅婊氫簡
			if($(document).scrollTop() > 0){
				$("#s_menu").css("display","block");
			}else{
				$("#s_menu").css("display","none");
			}
		}
	});
	
	//鐐瑰嚮娴姩鑿滃崟寮瑰嚭鐩稿簲鐨�
	if($("#all_kind").size() > 0){
		//鎵€鏈夌绫�
		$("#all_kind .title_a").click(function(){
			if($(this).parent().find("dl").is(":hidden")){
				$(this).parent().find("dl").fadeIn();
				$("#pro_sort dl").fadeOut();
				$("#filter .f_div").fadeOut();
				$("#all_kind").addClass("selected");
				$("#pro_sort").removeClass("selected");
				$("#filter").removeClass("selected");
				$("#mask").fadeIn();
			}else{
				$(this).parent().find("dl").fadeOut();
				$("#all_kind").removeClass("selected");
				$("#mask").fadeOut();
			}
		});
		
	}
	if($("#pro_sort").size() > 0){
		//鎵€鏈夌绫�
		$("#pro_sort .title_a").click(function(){
			if($(this).parent().find("dl").is(":hidden")){
				$(this).parent().find("dl").fadeIn();
				$("#all_kind dl").fadeOut();
				$("#filter .f_div").fadeOut();
				$("#pro_sort").addClass("selected");
				$("#all_kind").removeClass("selected");
				$("#filter").removeClass("selected");
				$("#mask").fadeIn();
			}else{
				$(this).parent().find("dl").fadeOut();
				
				$("#pro_sort").removeClass("selected");
				
				$("#mask").fadeOut();
			}
		});
	}
	//绛涢€�
	if($("#filter").size() > 0){
		$("#filter .title_a").click(function(){
			if($(this).parent().find(".f_div").is(":hidden")){
				$(this).parent().find(".f_div").fadeIn();
				$("#all_kind dl").fadeOut();
				$("#pro_sort dl").fadeOut();
				$("#filter").addClass("selected");
				$("#all_kind").removeClass("selected");
				$("#pro_sort").removeClass("selected");
				$("#mask").fadeIn();
			}else{
				$(this).parent().find(".f_div").fadeOut();
				
				$("#filter").removeClass("selected");
				$("#mask").fadeOut();
			}
		});
	}
	
	if($("#mask").size() > 0){
		$("#mask").click(function(){
			$("#all_kind dl").fadeOut();
			$("#pro_sort dl").fadeOut();
			$("#filter .f_div").fadeOut();
			$("#all_kind").removeClass("selected");
			$("#pro_sort").removeClass("selected");
			$("#filter").removeClass("selected");
		});
	}
});

//娴姩鑿滃崟浜岀淮鐮�
$(function(){
	if($("#title_qr").size() > 0){
		$("#title_qr").click(function(){
			$("#mask").fadeIn();
			$("#qr_img").fadeIn();
		});
		
		$("#mask").click(function(){
			$("#mask").fadeOut();
			$("#qr_img").fadeOut();
		});
	}
});

//棣栭〉杞挱
$(function(){
	if ($('#h_slider').size() > 0) {
        $('#h_slider').glide({
            //autoplay:true,//鏄惁鑷姩鎾斁 榛樿鍊� true濡傛灉涓嶉渶瑕佸氨璁剧疆姝ゅ€�
            animationTime: 500, //鍔ㄧ敾杩囧害鏁堟灉锛屽彧鏈夊綋娴忚鍣ㄦ敮鎸丆SS3鐨勬椂鍊欑敓鏁�
            arrows: false, //鏄惁鏄剧ず宸﹀彸瀵艰埅鍣�
            //arrowsWrapperClass: "arrowsWrapper",//婊戝潡绠ご瀵艰埅鍣ㄥ閮―IV绫诲悕
            //arrowMainClass: "slider-arrow",//婊戝潡绠ご鍏叡绫诲悕
            //arrowRightClass:"slider-arrow--right",//婊戝潡鍙崇澶寸被鍚�
            //arrowLeftClass:"slider-arrow--left",//婊戝潡宸︾澶寸被鍚�
            arrowRightText: "", //瀹氫箟宸﹀彸瀵艰埅鍣ㄦ枃瀛楁垨鑰呯鍙蜂篃鍙互鏄被
            arrowLeftText: "",
            nav: false, //涓诲鑸櫒涔熷氨鏄湰渚嬩腑鏄剧ず鐨勫皬鏂瑰潡
            navCenter: true, //涓诲鑸櫒浣嶇疆鏄惁灞呬腑
            navClass: "slider-nav", //涓诲鑸櫒澶栭儴div绫诲悕
            navItemClass: "slider-nav__item", //鏈緥涓皬鏂瑰潡鐨勬牱寮�
            navCurrentItemClass: "slider-nav__item--current" //琚€変腑鍚庣殑鏍峰紡
                //
        });
   	}
})

//搴曢儴鑿滃崟鑷€傚簲
$(function(){
	if($(".footer").size() > 0){
		var li = $(".footer ul li");
		li.css("width",(100/li.length)+"%");
	}
});



$(document).delegate("a", "click", function (e) {

        var url = $(this).attr("href");
        if($("#goods_box").length == 0) return;
        //e.preventDefault();
        //$(this).attr("target", "_blank");

        //isLoadingOrIsLoaded("", true, false);
	
        window.localStorage.setItem("top", document.body.scrollTop);
        window.localStorage.setItem("html", $("#goods_box").parent().html());
        window.localStorage.setItem("url", window.location.href);
			 
		
    });
	

    if(window.localStorage.getItem("url") == window.location.href && window.localStorage.getItem("top") != "null") {
		
        $("#goods_box").parent().html(window.localStorage.getItem("html"));
        document.body.scrollTop = window.localStorage.getItem("top");
        window.localStorage.setItem("top", "null");
        window.localStorage.setItem("html", "null");
        window.localStorage.setItem("url", "null");		
		 	//alert(limit);
		var le=$("#goods_box li").length;
		limit=1+Math.ceil(le/10);
			//alert(limit);
		//alert( $("#list_box li").length);
    }	