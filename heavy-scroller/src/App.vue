<template>
  <aside @mousemove.capture="bubble">
    <ul>
      <li v-for="(item, i) in items" :key="i" :style="genFontSize(i)"><a href="#" :data-index="i">{{item}}</a></li>
    </ul>
  </aside>
</template>

<script>
export default {
  name: 'bubble-hover',
  data: () => ({
    target: 6,
    percent: 0,
    items: [
      'React',
      'Vue.js',
      'jQuery',
      'Node.js',
      'Express',
      'Angular',
      'Backbone',
    ],
    settings: {
      fontSizeMax: 2,
      fontSizeBase: 0.7,
      opacityMax: 1,
      opacityBase: 0,
      multiplier: 1.5
    }
  }),
  mounted() {
  },
  methods: {
    genFontSize(i) {
      const {
        fontSizeMax,
        fontSizeBase,
        opacityMax,
        opacityBase,
        multiplier
      } = this.settings

      const itemHeight = (1 / this.items.length)
      const itemPercent = ((itemHeight * i) - Math.floor(itemHeight / 2)) * 100
      const start = Math.round((1 / this.items.length) * i * 100)
      const end = Math.round(start + (1 / this.items.length) * 100)

      if (this.percent >= start && this.percent <= end) {
        this.target = i
      }

      const distance = Math.abs(this.percent - itemPercent)

      const fontSizeAdjustment = (fontSizeMax * (distance * multiplier) / 100).toFixed(2)
      const opacityAdjustment = (opacityMax * (distance * multiplier) / 100).toFixed(2)

      const adjustedFontSize = fontSizeMax - fontSizeAdjustment
      const adjustedOpacity = opacityMax - opacityAdjustment

      return {
        fontSize: `${adjustedFontSize < fontSizeBase ? fontSizeBase : adjustedFontSize}em`,
        opacity: `${adjustedOpacity < opacityBase ? opacityBase : adjustedOpacity}`
      }
    },
    bubble(e) {
      const $target = e.target

      // const x = e.pageX - this.$el.offsetLeft
      const y = e.pageY - this.$el.offsetTop
      const h = this.$el.offsetHeight
      const percent = Math.round((y / h) * 100)
      // console.log(h, y, percent)

      this.percent = percent

      // windowSize
      // aside offsetY, clientY

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
  font: normal 3em Prata;
  background: #111;
  color: #555;
  margin: 0;
}

aside {
  text-align: right;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

ul {
  list-style: none;
  padding: 1em;
}

a {
  color: #ddd;
  text-decoration: none;
  border-bottom: solid .2em #555;
  line-height: 0.8em;
  display: inline-block;
}
</style>
