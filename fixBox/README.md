# fixBox 根据滚动展示隐藏节点
平常页面会有一些element，当滚动到一定高度才会显示出来，固定后，到达一定高度后又会随着滚动而滚动

[展示地址](https://emloxe.github.io/my-components/fixBox/index.html)

## 使用方式

css说明
``` css
/*
左边的距离最好写为以下形式
left: 50%;
margin-left:  // content/2 中间内容的一半，最好不要写为left为定值
*/

display: none;

```

html
``` html
<!-- id可以随意写，与js传入dom一致即可 -->
<div id="a"></div>

```

载入js文件
``` html
<script src="fixBox.js" type="text/javascript"></script>
```

调用
``` js
fixBox({
	dom: a,
	stop: 1200,
	sbottom: 500,
	bottom: 100	
});
```

## 参数配置
| 名称          | 默认值        |说明  |
|:-------------:|:-------------:|:-----|
| dom           |无默认值，必填 |	传入的dom |
| stop       	| 0             |	距离顶部多少开始显示box，此时box的position为fixed,!!注意这个属性不是被卷去的高 |
| sbottom       | 0             |	距离底部还有多少将position为fixed改position为absolute |
| bottom        |	无默认值，必填    |	 fix时，bottom的值,css中也可有此值，需要一致|
