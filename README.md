# vue-lazy-image
A simple clean vue plugin for image lazy load. load image when it is within the viewport. no try again when load failed

# require
Vue2, ES6

# usage
```js
// entry.js
import Vue from 'vue'
import LazyImg from 'v2-lazy-image'

Vue.use(LazyImg)

```

```vue
// your component.vue
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
```

# license
ISC
