/*

fixBox({
	dom: ,// 必填，传入节点
	stop: 0,// 距离顶部多少开始显示box，此时box的position为fixed,!!注意这个属性不是被卷去的高
	sbottom: 0// 距离底部还有多少将position为fixed改position为absolute
	bottom: // 必填，fix时，bottom的值,css中也可有此值，需要一致
})

*/

function fixBox(opts){
	var ele = opts.dom;
	var top = opts.stop || 0;
	var sb = opts.sbottom || 0;
	var bottom = opts.bottom;

	if(top){
		window.onscroll = function(){
			// 网页被卷去的高
			var sTop = document.documentElement.scrollTop || document.body.scrollTop;
			// 浏览器可视区域高度
			var wh = document.documentElement.clientHeight; 
			// 文档高度
			var dh = document.body.offsetHeight;
			// box高度
			var eh = ele.offsetHeight;
			
			console.log(sTop + wh,dh - sb + bottom);
			if(sTop + wh > dh - sb + bottom){

				ele.style.display = 'block';
				console.log(sTop + wh,dh - sb + eh)
				ele.style.position = 'absolute';
				ele.style.top = dh - sb - eh + 'px';	
			}else if(sTop + wh > top){

				ele.style.display = 'block';
				ele.style.position = 'fixed';
				ele.style.top = 'auto';
				ele.style.sb = sb+'px';
			}else{

				ele.style.display = 'none'
			}		
		}
	}else{
		if (sb) {
			window.onscroll = function(){
				// 网页被卷去的高
				var sTop = document.documentElement.scrollTop || document.body.scrollTop;
				// 浏览器可视区域高度
				var wh = document.documentElement.clientHeight; 
				// 文档高度
				var dh = document.body.offsetHeight;
				// box高度
				var eh = ele.offsetHeight;
				
				console.log(sTop + wh,dh - sb + bottom);
				if(sTop + wh > dh - sb + bottom){

					ele.style.display = 'block';
					console.log(sTop + wh,dh - sb + eh)
					ele.style.position = 'absolute';
					ele.style.top = dh - sb - eh + 'px';	
				}else if(sTop + wh > top){

					ele.style.display = 'block';
					ele.style.position = 'fixed';
					ele.style.top = 'auto';
					ele.style.sb = sb+'px';
				
				}		
			}
		}else{
			ele.style.display = 'block';
		}
		
	}	


}