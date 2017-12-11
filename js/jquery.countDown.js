
function countDown(time,day_elem,hour_elem,minute_elem,second_elem){

	//if(typeof end_time == "string")

	var end_time = new Date(time).getTime(),//鏈堜唤鏄疄闄呮湀浠�-1

	//current_time = new Date().getTime(),

	sys_second = (end_time-new Date().getTime())/1000;

	var timer = setInterval(function(){

		if (sys_second > 0) {

			sys_second -= 1;

			var day = Math.floor((sys_second / 3600) / 24);

			var hour = Math.floor((sys_second / 3600) % 24);

			var minute = Math.floor((sys_second / 60) % 60);

			var second = Math.floor(sys_second % 60);

			day_elem && $(day_elem).text(day);//璁＄畻澶�

			$(hour_elem).text(hour<10?"0"+hour:hour);//璁＄畻灏忔椂

			$(minute_elem).text(minute<10?"0"+minute:minute);//璁＄畻鍒�

			$(second_elem).text(second<10?"0"+second:second);// 璁＄畻绉�

		} else { 

			clearInterval(timer);

		}

	}, 1000);

}