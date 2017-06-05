# vue-lazy-image
A simple clean small size vue plugin for image lazy load. load image when it is within the viewport. no try again when load failed

## require
Vue2, ES6

## install
```
npm i v2-lazy-image
```

## usage
```javascript
// entry.js
import Vue from 'vue'
import LazyImg from 'v2-lazy-image'

// config object is optional
// if you want to preload image when it's close to the viewport, set the preload value > 1
Vue.use(LazyImg, {preload: 1.1})

```

```vue
<!--your component.vue-->
<template>
  <img v-lazyimg="source" :src="defaultImage">
</template>

<script>
export default {
  data () {
    return {
      source: '//path/xxx.png',
      defaultImage: '//path/default.png'
    }
  }
}
</script>

<style>
/*set display to inline-block/block and set width/height to get correct BoundingClientRect*/
img {
  display: inline-block;
  width: 100%;
}
</style>
```

## license
ISC
