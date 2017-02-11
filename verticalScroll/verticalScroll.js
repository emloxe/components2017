
/*new VerticalScroll({
	dom : ; // 传入的dom
    speed : 40, // 滚动速度，数值越大滚动越慢 ，此为调控setInterval调用时间间隔
    delayTime: 0, // 滚动完成一定高度后，停顿时间
    delayHeight: 0 // 设定滚动停顿的高度。若设置了delaytime却没设置delayHeight,delayHeight默认为一个li的高度；若没设置delayTime，delayHeight设置无效。设置delayTime、delayHeight请保证li高度统一
})*/
function VerticalScroll(opts){
	this.dom = opts.dom;
	this.direction = opts.direction || 'up'
	this.speed = opts.speed || 40;
	this.delayTime = opts.delayTime || 0,
    this.delayHeight = opts.delayHeight || 0

	this.init();
}


VerticalScroll.prototype.init = function() {
	var dom = this.dom;
	var delayTime = this.delayTime;

    var scroll = null;

    dom.innerHTML += dom.innerHTML; 

    if (delayTime) {
    	this.delay();

    }else{
    	this.gapless();
    }

}

VerticalScroll.prototype.gapless = function(){
	var dom = this.dom;
	var speed =this.speed;
	var direction = this.direction;

    var scroll = scrollUp;
    dom.scrollTop = 0;


	var scrolling = setInterval(scroll, speed);

	function scrollUp(){
		dom.scrollTop++;
		if(dom.scrollTop >= dom.scrollHeight/2){
			dom.scrollTop = 0;
		}	
	}


	// 鼠标移入，停止滚动
	dom.onmouseover = function(){
		clearInterval(scrolling);
	}
	dom.onmouseout = function(){
		scrolling = setInterval(scroll,speed);
	}
}

VerticalScroll.prototype.delay = function(){
	var dom = this.dom;
	var speed =this.speed;
	var direction = this.direction;
	var delayTime = this.delayTime;
    var delayHeight = this.delayHeight;

    var scroll = scrollUp;

    dom.scrollTop = 0;

    if (!delayHeight) {
		delayHeight = dom.getElementsByTagName('li')[0].offsetHeight;

	}
	console.log(delayHeight);
    


	var scrolling = setInterval(scroll, speed);

	function scrollUp(){
		if (delayTime) {
			if(dom.scrollTop % delayHeight==0){
				clearInterval(scrolling);
 				setTimeout(startScroll,delayTime);
 			}else{
	 			move();
			}	 			
		}else{
			move();
		}

		function move(){
			dom.scrollTop++;
			if(dom.scrollTop >= dom.scrollHeight/2){
				dom.scrollTop = 0;
			}	
		}
		
	}


	function startScroll(){
	 	scrolling = setInterval(scroll,speed);
	 	dom.scrollTop++;
	}
}