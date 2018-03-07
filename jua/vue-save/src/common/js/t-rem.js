
(function flexible (window, document) {
  // html style font-size
  // var docElementFontSize = document.documentElement.style.fontSize

  // html 最终的 font-size
  // var finalDocElementFontSize = window.getComputedStyle(window.document.documentElement).getPropertyValue('font-size')

  var docEl = document.documentElement
  var dpr = window.devicePixelRatio || 1

  // adjust body font size
  function setBodyFontSize () {
    if (document.body) {
      document.body.style.fontSize = (12 * dpr) + 'px'
      // console.log('dpr', dpr)
    } else {
      document.addEventListener('c', setBodyFontSize)
    }
  }
  setBodyFontSize()

  // set 1rem = viewWidth / 10
  function setRemUnit () {
    var rem = (docEl.clientWidth / 10) * (8 / 3)
    if (rem >= 200) rem = 200
    docEl.style.fontSize = rem + 'px'
    // console.log(rem)
  }

  setRemUnit()

  // reset rem unit on page resize
  window.addEventListener('resize', setRemUnit)
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      setRemUnit()
    }
  })

  // detect 0.5px supports
  if (dpr >= 2) {
    var fakeBody = document.createElement('body')
    var testElement = document.createElement('div')
    testElement.style.border = '.5px solid transparent'
    fakeBody.appendChild(testElement)
    docEl.appendChild(fakeBody)
    if (testElement.offsetHeight === 1) {
      docEl.classList.add('hairlines')
    }
    docEl.removeChild(fakeBody)
  }

  /*
  * 适用于获取屏幕宽度等分设置html的font-size情况，比如 flexible.js库
  */
  // 计算最终html font-size
  function modifileRootRem () {
    var root = window.document.documentElement
    var fontSize = parseFloat(root.style.fontSize)
    var finalFontSize = parseFloat(window.getComputedStyle(root).getPropertyValue('font-size'))
    if (finalFontSize === fontSize) return
    root.style.fontSize = fontSize + (fontSize - finalFontSize) + 'px'
  }
  if (typeof window.onload === 'function') {
    var oldFun = window.onload
    window.onload = function () {
      oldFun()
      modifileRootRem()
    }
  } else {
    window.onload = modifileRootRem
  }
}(window, document))
