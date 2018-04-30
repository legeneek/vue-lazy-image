const Events = ['scroll', 'resize', 'load']

function checkInView (el, r) {
  if (!el) return
  let rect = el.getBoundingClientRect()
  let ratio = r || 1
  return rect.top < window.innerHeight * ratio && rect.bottom >= 0 &&
      rect.left < window.innerWidth * ratio && rect.right >= 0
}

function throttle (fn, delay, mustRunDelay) {
  let timer = null
  let t_start
  return function () {
    let context = this, args = arguments, t_curr = +new Date()
    clearTimeout(timer)
    if (!t_start) {
      t_start = t_curr
    }
    if (t_curr - t_start >= mustRunDelay) {
      fn.apply(context, args)
      t_start = t_curr
    }
    else {
      timer = setTimeout(function () {
        fn.apply(context, args)
      }, delay)
    }
  }
}

function find (arr, el) {
  let i, len
  for(i = 0, len = arr.length; i < len; ++i) {
    if (arr[i].el === el) {
      return i
    }
  }
  return -1
}

const LazyImg = {
  install(Vue, config) {
    let imgs = []
    let opt = config || {
        preload: 1
      }

    function processImg () {
      let i, len
      for (i = 0, len = imgs.length; i < len; ++i) {
        checkAndLoadImg(imgs[i])
      }
    }

    function checkAndLoadImg (img) {
      if (!img.loading && !img.loaded && checkInView(img.el, opt.preload)) {
        loadImg(img)
      }
    }

    function updateImg (src, el) {
      let index = find(imgs, el)
      let defaultImg = el.getAttribute('src')
      let img = {
        el,
        src,
        loading: false,
        loaded: false,
        defaultImg
      }

      if (index !== -1) {
        imgs[index] = img
      } else {
        imgs.push(img)
      }

      Vue.nextTick(function() {
        checkAndLoadImg(img)
      })
    }

    function loadImg (img) {
      if (img.loading || img.loaded) return

      img.loading = true
      let i = new Image()

      i.onload = function () {
        img.el.src = img.src
        img.loading = false
        img.loaded = true
      }
      i.onerror = function () {
        img.loading = false
        img.loaded = true
        img.el.src = img.defaultImg
      }
      i.src = img.src
    }

    Vue.directive('lazyimg', {
      bind (el, binding) {
        let src = binding.value
        updateImg(src, el)
      },
      update (el, binding) {
        let src = binding.value
        updateImg(src, el)
      },
      componentUpdated (el, binding) {
      },
      unbind (el, binding) {
      }
    })

    let tProcess = throttle(processImg, 200, 100)

    for (let j = 0; j < Events.length; ++j) {
      window.addEventListener(Events[j], tProcess)
    }
  }
}

export default LazyImg
