<template>
  <aside @mousemove="bubble">
    <ul>
      <li v-for="(item, i) in items" :key="i" :style="isHoverTarget(i)"><a href="#" :data-index="i">{{item}}</a></li>
    </ul>
  </aside>
</template>

<script>
export default {
  name: 'bubble-hover',
  data: () => ({
    target: 6,
    items: [
      'React',
      'Vue.js',
      'jQuery',
      'Angular',
      'Backbone',
      'Backbone',
      'Angular',
      'jQuery',
      'Vue.js',
      'React',
    ]
  }),
  methods: {
    isHoverTarget(i) {
      const fontSizeMax = 2
      const fontSizeBase = 0.5
      const opacityMax = 1
      const opacityBase = 0.2
      const multiplier = 10

      if (this.target === i) {
        return {
          fontSize: `${fontSizeMax}em`,
          opacity: `${opacityMax}`
        }
      }

      const distance = Math.abs(this.target - i)

      if (distance > 4) {
        return {
          fontSize: `${fontSizeBase}em`,
          opacity: `${opacityBase}`
        }
      }

      const fontSizeAdjustment = fontSizeMax * (distance / multiplier)
      const opacityAdjustment = opacityMax * (distance / multiplier)

      return {
        fontSize: `${fontSizeMax - fontSizeAdjustment}em`,
        opacity: `${opacityMax - opacityAdjustment}`
      }
    },
    bubble(e) {
      const $target = e.target

       if ($target.nodeName === 'A') {
         this.target = +$target.dataset.index
       }
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Prata');

body {
  font: 3em Prata;
  background: #111;
  color: #555;
}

aside {
  text-align: right;
}

ul {
  list-style: none;
}

a {
  color: #ddd;
  text-decoration: none;
  border-bottom: solid .2em #555;
  line-height: 0.8em;
  display: inline-block;
  transition: font-size 0.5s;
}
</style>
