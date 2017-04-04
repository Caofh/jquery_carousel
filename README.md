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

<h2 align="center">Test</h2>

```
# 一：安装单元测试依赖：
npm install
# 二：直接打开test/test-demo.html

# test/unit/jquery_carousel_test.js为单元测试代码.(测试已全部通过)
```


