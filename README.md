<h1>jquery_carousel</h1>
<h2 align="center">Dependent</h2>

```bash
本插件依赖jQuery.js或Zepto.js
```
<h1>jquery_carousel</h1>
<h1>jquery_carousel</h1>

<h2 align="center">Install</h2>

```bash
npm install jquery_carousel --save
```

<h2 align="center">Example</h2>

```html
# html:
<div class="container" node-type="container" style="position:relative;width:320px;height:215px;">
    <div style="position:absolute;top:0;left:0;">ert</div>
</div>
```

```js
# js:
var arr = [
        {
            src: '//mstore.b0.upaiyun.com/seller_goods_collection/20160804/97947/15191457a2ec726c3ed.png!w320',
            //href: '//www.baidu.com'
        },
        {
            src: '//mstore.b0.upaiyun.com/seller_goods_collection/20160829/97947/18323857c40f46eed30.png!w320',
            href: ''
        },
        {
            src: '//mstore.b0.upaiyun.com/seller_goods_collection/20160808/97947/18203257a85cf05360f.png!w320',
            href: 'www.baidu.com'
        }
]
# 方法一：
$('[node-type="container"]').carousel({
        arr: arr,
//        config: {
//            speed: 10, //切换图片动画速度
//            switchSpeed: 5000, //切换图片时间间隔
//            type: '' //却换图片动画的效果类别：‘’：向左逐渐滑动；1:逐渐消失显示效果；2:3D旋转效果；可选参数，默认为‘’
//        },
//        callback: function (index) { //每次轮播结束后console出数组索引值
//            console.log(index)
//        }
})
# 方法二：
carousel({
        name: $('[node-type="container"]'),
        arr: arr,
//        config: {
//            speed: 10, //切换图片动画速度
//            switchSpeed: 5000, //切换图片时间间隔
//            type: '' //却换图片动画的效果类别：‘’：向左逐渐滑动；1:逐渐消失显示效果；2:3D旋转效果；可选参数，默认为‘’
//        },
//        callback: function (index) { //每次轮播结束后console出数组索引值
//            console.log(index)
//        }
    })
```

<h2 align="center">API</h2>

```
# 一.停止轮播api
$('.container').carousel_stop() //注：结束当前轮播，并存在返回值，返回当前停止位置图片的index值。

# 二.继续轮播api
$('.container').carousel_restart() 注：在未叼哦用change_start函数的前提下，从定制轮播index处继续轮播，此函数有返回值，返回当前所处轮播的index值。

# 三.从第index张图片继续轮播api
$('.container').change_start(index)  // index为第index张图片参数

## 以上方法均挂载在carousel对象上，同样可通过carousel.carousel_stop(name)、carousel.carousel_restart(name)和carousel.carousel_change_start(index, name)的形式调用。

```

<h2 align="center">Test</h2>

```
# 一：安装单元测试依赖：
npm install
# 二：直接打开test/test-demo.html

# test/unit/jquery_carousel_test.js为单元测试代码.(测试已全部通过)
```


