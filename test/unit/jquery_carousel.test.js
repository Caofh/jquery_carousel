/**
 * Created by caofanghui on 4/4/17.
 */

'use strict'

var expect = chai.expect;
var assert = chai.assert;

// 模拟传入参数
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
  },
  {
    src: '//mstore.b0.upaiyun.com/seller_goods_collection/20160725/97947/1653105795d3768e439.jpg!w320',
//            href: '//www.jikexueyuan.com'
  },
  {
    src: '//mstore.b0.upaiyun.com/seller_goods_collection/20160505/97947/182955572b20a3ad9d2.jpg!w320',
    href: ''
  },
  {
    src: '//mstore.b0.upaiyun.com/seller_goods_collection/20160325/97947/17335256f506007560e.jpg!w320',
    href: 'www.jikexueyuan.com'
  }
]
var params = {
  name: $('.container'),
  arr: arr,
  config: {
    speed: 10, //切换图片动画速度
    //switchSpeed: 5000, //切换图片时间间隔
    //type: '' //却换图片动画的效果类别：‘’：向左逐渐滑动；1:逐渐消失显示效果；2:3D旋转效果；可选参数，默认为‘’
  },
  callback: function (index) { //每次轮播结束后console出数组索引值
    //console.log(index)
  }
}
//取dom元素的宽度和高度
params.config.width = 320
params.config.height = 215
var obj = {
  name: params.name.children('[node-type="carousel_template"]'),
  speed: params.config.speed,
  switchSpeed: params.config.switchSpeed,
  type: params.config.type,
  arr: params.arr,
  num: 0,
  callback: params.callback
}
//----------




describe("jquery_carousel", function() {

  it("轮播插件单元测试", function() {
    // 断言
    assert.equal(undefined, carousel.validate(['arr'], params), '参数验证函数：success')
    assert.instanceOf(carousel.startParams(params), Object, '初始化参数函数:success');
    assert.equal(undefined, carousel.startNode(params, params.name), '初始化模版函数:success');
    assert.equal(undefined, carousel.main(obj), '轮播类型函数（main）:success');
    assert.equal(undefined, carousel(params), 'carousel主函数：success')
    assert.equal(undefined, carousel.loop([1, 2, 3])(function (index, value) {}), 'loop循环函数：success')

  });
})