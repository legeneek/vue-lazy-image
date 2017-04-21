const Events = ['scroll', 'resize', 'load']

function checkInView (el, r) {
  if (!el) return
  let rect = el.getBoundingClientRect()
  let ratio = r || 1
  // vertical check only
  return rect.top < window.innerHeight * ratio && rect.bottom >= 0
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

const LazyImg = {
  install(Vue, config) {
    // cache unload imgs
    let imgs = {}

    function processImg () {
      let i, k, len
      let ks = Object.keys(imgs)
      for (i = 0, len = ks.length; i < len; ++i) {
        k = ks[i]
        if (!imgs[k].loading) {
          if (checkInView(imgs[k].el, 1.1)) {
            loadImg(imgs[k])
          }
        }
      }
    }

    function updateSrc (src, el) {
      // img unique id
      let id = el.getAttribute('data-id')

      imgs[id] = {
        el,
        id,
        src,
        loading: false
      }

      Vue.nextTick(() => {
        if (checkInView(el, 1.1)) {
          loadImg(imgs[id])
        }
      })
    }

    function loadImg (img) {
      if (img.loading) return

      img.loading = true
      let i = new Image()
      i.onload = function () {
        img.el.src = img.src
        // no need to process anymore
        delete imgs[img.id]
      }
      i.onerror = function () {
        // no try again
        delete imgs[img.id]
      }

      i.src = img.src
    }

    Vue.directive('lazyimg', {
      bind (el, binding) {
        let src = binding.value
        updateSrc(src, el)
      },
      update (el, binding) {
        let src = binding.value
        updateSrc(src, el)
      },
      componentUpdated (el, binding) {
      },
      unbind (el, binding) {
      }
    })

    let tProcess = throttle(processImg, 200, 50)

    for (let j = 0; j < Events.length; ++j) {
      window.addEventListener(Events[j], tProcess)
    }
    
  }
}

export default LazyImg
