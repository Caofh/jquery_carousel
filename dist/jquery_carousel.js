/**
  Created by caofanghui on 4/3/17.
  Github address: https://github.com/Caofh/jquery_carousel
 */

//调用方法
/*
  js:
   var arr = [
     {
       src: '//mstore.b0.upaiyun.com/seller_goods_collection/20160804/97947/15191457a2ec726c3ed.png!w320',
       //href: '//www.baidu.com'
     }
   ]
   //以下参数注释的均为可选参数.
   $('[node-type="container"]').carousel({
     arr: arr,
     //config: {
       //speed: 4, //切换图片动画速度
       //switchSpeed: 3000, //切换图片时间间隔
       //type: 2 //却换图片动画的效果类别：‘’：向左逐渐滑动；1:逐渐消失显示效果；2:3D旋转效果；可选参数，默认为‘’
     //},
     //callback: function (index) { //每次轮播结束后console出数组索引值
        //console.log(index)
     //}
   })
*/

if (typeof jQuery === 'undefined') {
  throw new Error('The plugin(jquery_carousel) is dependent on jQuery')
}

(function ($) {
  'use strict'

  var version = '1.0.0'

  // 默认值设置
  var baseConfig = {
    speed: 10, // 切换图片动画速度
    switchSpeed: 5000, // 切换图片时间间隔
    type: '' // 切换图片动画的效果类别：‘’：向左逐渐滑动；1:逐渐消失显示效果；2:3D旋转效果；可选参数，默认为‘’
  }

  // 插件主入口，jQuery扩展
  var carousel = function (option) {
    var params = option,
        $this = option.name ? option.name : $(this)

    // 验证dom元素名是否传入.
    if (!option.name && !$(this).length) {
      throw new Error('name is not defined')
    }

    validate(['arr'], params) // 验证参数
    params = startParams(params) // 初始化参数(设置或者合并参数默认值)

    //取dom元素的宽度和高度
    params.config.width = $this.css('width')
    params.config.height = $this.css('height')

    startNode(params, $this) // 初始化模版

    //轮播方法
    var i = 0
    params.callback && params.callback(i)

    var className = $this.attr('class')
    carousel[''+className+''] = className
    carousel[''+className+'_params'] = params

    carousel[''+className+'_changeLoop'] = setInterval(function () {


      carousel[''+className+'_i'] = i

      main({
        name: $this.children('[node-type="carousel_template"]'),
        speed: params.config.speed,
        switchSpeed: params.config.switchSpeed,
        type: params.config.type,
        arr: params.arr,
        num: i,
        callback: params.callback
      })

      i++
      if (i >= params.arr.length - 1) {
        i = -1
      }
    }, params.config.switchSpeed)
  }

  function main(option) {
    //执行三种不同类型的轮播
    if (option.type == 1) {
      type_1(option)
    } else if (option.type == 2) {
      type_2(option)
    } else {
      type_3(option)
    }
  }

  function type_1(option) {
    var arr = option.arr,
      width = option.name.width(),
      toLeft = 0,
      num = option.num

    option.name.children('.carousel_content_main').children('a').children('img').fadeOut(400)
    setTimeout(function () {
      if (arr[num + 1]) {
        option.name.children('.carousel_content_main').children('a').attr('href', arr[num + 1].href)
          .children('img').attr('src', arr[num + 1].src).fadeIn(400)

        if (!arr[num + 1].href) {
          option.name.children('.carousel_content_main').children('a').attr('href', 'javascript:;')
        }
      }

      option.callback && option.callback(num + 1)
    }, 400)
  }

  function type_2(option) {
    var arr = option.arr,
      toLeft = 0,
      num = option.num

    type_2_loop()
    function type_2_loop() {
      requestAnimationFrame(function () {
        if (Math.abs(90 - toLeft) <= option.speed) {
          toLeft++

          if (arr[num + 1]) {
            option.name.children('.carousel_content_main').children('a').attr('href', arr[num + 1].href)
              .html('<img style="-webkit-transform:rotateY(-180deg);width:100%;height:100%;" src="' + arr[num + 1].src + '">')

            if (!arr[num + 1].href) {
              option.name.children('.carousel_content_main').children('a').attr('href', 'javascript:;')
            }
          }
        }

        if (180 - toLeft <= option.speed) {
          toLeft++
        } else {
          toLeft = toLeft + option.speed
        }

        option.name.children('.carousel_content_main').children('a').css({
          'transform': 'rotateY(' + toLeft + 'deg)',
          '-webkit-transform': 'rotateY(' + toLeft + 'deg)'
        })

        if (toLeft < 180) {
          type_2_loop()
        } else {
          option.name.children('.carousel_content_main').children('a').css({
            'transform': 'rotateY(0deg)',
            '-webkit-transform': 'rotateY(0deg)'
          })
          option.name.children('.carousel_content_main').children('a').children('img').css({
            'transform': 'rotateY(0deg)',
            '-webkit-transform': 'rotateY(0deg)',
            'width': '100%',
            'height': '100%'
          })

          option.callback && option.callback(num + 1)
        }
      })
    }
  }

  function type_3(option) {
    var arr = option.arr,
      width = option.name.width(),
      toLeft = 0,
      num = option.num

    type_3_loop()
    function type_3_loop() {
      if (arr[num]) {
        option.name.children('.carousel_content_main').children('a').eq(0).attr('href', arr[num].href)
          .children('img').attr('src', arr[num].src)

        if (!arr[num].href) {
          option.name.children('.carousel_content_main').children('a').eq(0).attr('href', 'javascript:;')
        }
      }

      if (arr[num + 1]) {
        option.name.children('.carousel_content_main').children('a').eq(1).attr('href', arr[num + 1].href)
          .children('img').attr('src', arr[num + 1].src)

        if (!arr[num + 1].href) {
          option.name.children('.carousel_content_main').children('a').eq(1).attr('href', 'javascript:;')
        }
      }

      requestAnimationFrame(function () {
        if (width - Math.abs(toLeft) <= option.speed) {
          toLeft--
        } else {
          toLeft = toLeft - option.speed
        }

        option.name.children('.carousel_content_main').css('margin-left', toLeft + 'px')

        if (Math.abs(toLeft) < width) {
          type_3_loop()
        } else {

          num++
          if (arr[num]) {
            option.name.children('.carousel_content_main').children('a').eq(0).attr('href', arr[num].href)
              .children('img').attr('src', arr[num].src)

            if (!arr[num].href) {
              option.name.children('.carousel_content_main').children('a').eq(0).attr('href', 'javascript:;')
            }
          }
          if (arr[num + 1]) {
            option.name.children('.carousel_content_main').children('a').eq(1).attr('href', arr[num + 1].href)
              .children('img').attr('src', arr[num + 1].src)

            if (!arr[num + 1].href) {
              option.name.children('.carousel_content_main').children('a').eq(1).attr('href', 'javascript:;')
            }
          } else {
            option.name.children('.carousel_content_main').children('a').eq(1).attr('href', arr[0].href)
              .children('img').attr('src', arr[0].src)

            if (!arr[0].href) {
              option.name.children('.carousel_content_main').children('a').eq(1).attr('href', 'javascript:;')
            }
          }


          option.name.children('.carousel_content_main').css('margin-left', '0')

          option.callback && option.callback(num)

        }
      })
    }
  }

  //初始化模版
  function startNode(params, $this) {

    var carousel_template =
      '<div class="carousel_template"' +
      'style="width:' + params.config.width + ';' +
      'height:' + params.config.height + ';' +
      'box-sizing:border-box;' +
      'overflow:hidden;' +
      'position:relative;"' +
      'node-type="carousel_template"> ' +
      '<div class="carousel_content_main"' +
      'style="box-sizing:border-box;' +
      'width:100%;' +
      'height:100%;' +
      'position:relative;"> ' +
      '<a ' +
      'style="left:0;' +
      'top:0px;' +
      'width:100%;' +
      'height:100%;' +
      'display:block;' +
      'position:absolute;" ' +
      'href="' + params.arr[0].href + '"> ' +
      '<img src="' + params.arr[0].src + '"> ' +
      '</a> ' +
      '<a ' +
      'style="left:' + params.config.width + ';' +
      'top:0px;' +
      'width:100%;' +
      'height:100%;' +
      'display:block;' +
      'position:absolute;" ' +
      'href="' + params.arr[1].href + '" ' +
      '> ' +
      '<img src="' + params.arr[1].src + '"> ' +
      '</a> ' +
      '</div> ' +
      '</div>'

    $this.append(carousel_template)

    $this.find('.carousel_content_main > a img').css({
      'width': '100%',
      'height': '100%'
    })

  }

  //验证参数
  function validate(array, option) {
    var must = array,
      currentParams = []

    try {
      loop(option)(function (index, value, key) {
        currentParams.push(key)
      })
      loop(must)(function (index, value) {
        if (currentParams.indexOf(value) < 0) {
          throw new Error(value + ' is not defined')
        }
      })
    } catch (e) {
      throw (e.name + ': ' + e.message)
    }
  }

  //初始化参数(设置参数默认值)
  function startParams(params) {
    var params = params

    // 初始化arr数据的href属性
    loop(params.arr)(function (index, value, key) {
      if (!value.href) {
        value.href = ''
      }
    })

    // 初始化config属性
    if (params.config && Object.keys(params.config).length) {
      loop(params.config)(function (index, value, key) {
        baseConfig[key] = value
      })
      params.config = baseConfig
    } else {
      params = $.extend({}, params, {config: baseConfig})
    }

    return params
  }

  //函数式循环方案
  function loop(obj) { //obj,arr,$('.dev'),'abcde'
    var fun

    if (obj instanceof Array || typeof obj === 'string') {
      fun = function (callback) {
        var length = obj.length
        for (var i = 0; i < length; i++) {
          var result
          callback && (result = callback(i, obj[i]))
          if (result == false || result == 'break') {
            break
          }
        }

        obj = null
      }
    } else if (obj instanceof $) {
      fun = function (callback) {
        obj.each(function (index, element) {
          var result
          callback && (result = callback(index, $(element)))
          if (result == false || result == 'break') {
            return false
          }
        })

        obj = null
      }
    } else if (obj instanceof Object) {
      fun = function (callback) {
        var i = 0
        for (var key in obj) {
          var result
          callback && (result = callback(i, obj[key], key))
          if (result == false || result == 'break') {
            break
          }
          i++
        }

        obj = null
      }
    } else {
      fun = function () {
        throw new Error('输入参数有误')
      }
    }

    return fun
  }

  // 支持中断轮播方法
  $.fn.carousel_stop = function (name) {
    var $this = name ? name : $(this)

    var className = $this.attr('class')
    if (carousel[className]) {

      clearInterval(carousel[''+className+'_changeLoop'])

      var i,
        params = carousel[''+className+'_params']

      if (typeof carousel[''+className+'_i'] !== 'undefined') {
        i = parseInt(carousel[''+className+'_i']) + 1
        if (parseInt(carousel[''+className+'_i']) === params.arr.length - 2) {
          i = -1
        }
      } else {
        i = 0
      }

      return i
    }

  }
  $.fn.carousel_restart = function (name) {
    var $this = name ? name : $(this)

    var className = $this.attr('class')

    if (carousel[className]) {
      var params = carousel[''+className+'_params']

      //轮播方法
      var i
      if (typeof carousel[''+className+'_i'] !== 'undefined') {
        i = parseInt(carousel[''+className+'_i']) + 1
        if (parseInt(carousel[''+className+'_i']) === params.arr.length - 2) {
          i = -1
        }
      } else {
        i = 0
      }

      params.callback && params.callback(i)

      carousel[className] = className
      carousel[''+className+'_params'] = params
      carousel[''+className+'_changeLoop'] = setInterval(function () {
        carousel[''+className+'_i'] = i

        main({
          name: $this.children('[node-type="carousel_template"]'),
          speed: params.config.speed,
          switchSpeed: params.config.switchSpeed,
          type: params.config.type,
          arr: params.arr,
          num: i,
          callback: params.callback
        })

        i++
        if (i >= params.arr.length - 1) {
          i = -1
        }
      }, params.config.switchSpeed)
    }

    return i
  }
  $.fn.change_start = function (index, name) {
    var $this = name ? name : $(this)

    $this.carousel_stop()

    var className = $this.attr('class')
    $this.find('.carousel_content_main').children('a').eq(0)
      .attr('href', carousel[''+className+'_params']['arr'][index].href)
      .find('img').attr('src', carousel[''+className+'_params']['arr'][index].src)
    $this.find('.carousel_content_main').children('a').eq(1)
      .attr('href', carousel[''+className+'_params']['arr'][index + 1].href)
      .find('img').attr('src', carousel[''+className+'_params']['arr'][index + 1].src)

    var className = $this.attr('class')

    if (carousel[className]) {
      var params = carousel[''+className+'_params']

      //轮播方法
      var i = parseInt(index)
      carousel[''+className+'_i'] = index - 1

      params.callback && params.callback(i)

      carousel[className] = className
      carousel[''+className+'_params'] = params
      carousel[''+className+'_changeLoop'] = setInterval(function () {
        carousel[''+className+'_i'] = i

        main({
          name: $this.children('[node-type="carousel_template"]'),
          speed: params.config.speed,
          switchSpeed: params.config.switchSpeed,
          type: params.config.type,
          arr: params.arr,
          num: i,
          callback: params.callback
        })

        i++
        if (i >= params.arr.length - 1) {
          i = -1
        }
      }, params.config.switchSpeed)
    }

    return i


  }

  // 兼容jquery写法，并支持单元测试
  $.fn.carousel = carousel
  carousel.carousel_stop = $.fn.carousel_stop
  carousel.carousel_restart = $.fn.carousel_restart
  carousel.change_start = $.fn.change_start
  carousel.main = main
  carousel.startNode = startNode
  carousel.validate = validate
  carousel.startParams = startParams
  carousel.loop = loop

  // RequireJS && SeaJS
  if (typeof define === 'function') {
    define(function() {
      return carousel;
    });

    // NodeJS
  } else if (typeof exports !== 'undefined') {
    module.exports = carousel;
  } else {
    if (this) {
      this.carousel = carousel;
    } else {
      window.carousel = carousel
    }
  }

})(jQuery)

