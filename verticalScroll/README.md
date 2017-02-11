# VerticalScroll 向上滚动插件
原生js开发的插件

## 使用方式

载入js文件
```html
<script src="verticalScroll.js"></script>
```

html格式编写
```html
<!-- 注意ul需要清除默认的margin值，也不可设定margin值，如若要设定边距留白可以设置padding值 -->
<!-- li最好设置高度，防止浏览器对不同的字体大小解析的行距不一致 -->
<!-- li标签内的内容可以随意编写，id也是并非固定的 -->
<div id = "scroll">
    <ul>
        <li><a href="#">1.学会html5 绝对的屌丝逆袭（案例）</a></li>
        <li><a href="#">2.tab页面切换效果（案例）</a></li>
        <li><a href="#">3.圆角水晶按钮制作（案例）</a></li>
        <li><a href="#">4.HTML+CSS基础课程(系列)</a></li>
        <li><a href="#">5.分页页码制作（案例）</a></li>
        <li><a href="#">6.导航条菜单的制作（案例）</a></li>
        <li><a href="#">7.信息列表制作(案例)</a></li>
        <li><a href="#">8.下拉菜单制作(案例)</a><</li>
        <li><a href="#">9.如何实现“新手引导”效果</a></li>
    </ul>
</div>
```
css说明
```css
<!-- overflow:hidden 勿忘 -->
#scroll{overflow：hidden;height:200px;}
```

调用
```js
var scroll = document.getElementById('scroll');

new VerticalScroll({
	dom : scroll
})
```

## 参数配置
| 名称          | 默认值        |说明  |
|:-------------:|:-------------:|:-----|
| dom           |	无默认值，必填 |	传入的dom |
| speed     	| 40               |	滚动速度，数值越大滚动越慢 ，此为调控setInterval调用时间间隔 |
|  delayTime    |	0                   |	滚动完成一定高度后，停顿时间 |
|  delayHeight  |	0               |	 设定滚动停顿的高度。若设置了delaytime却没设置delayHeight,delayHeight默认为一个li的高度；若没设置delayTime，delayHeight设置无效。设置delayTime、delayHeight请保证li高度统一|
