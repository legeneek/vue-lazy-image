# vue-lazy-image
A simple clean vue plugin for image lazy load. load image when it is within the viewport. no try again when load failed

## require
Vue2, ES6

## install
```
npm i v2-lazy-image
```

## usage
```js
// entry.js
import Vue from 'vue'
import LazyImg from 'v2-lazy-image'

Vue.use(LazyImg)

```

```vue
<!--your component.vue-->
<template>
  <img v-lazyimg="source" :data-id="imgId" src="defaultImage">
</template>

<script>
export default {
  data () {
    return {
      source: '//path/xxx.png',
      defaultImage: '//path/default.png'
    }
  },
  computed: {
    imgId () {
      // get unique image id 
      return id
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
