<template>
  <aside :class="{
    vertical: settings.vertical,
    horizontal: !settings.vertical
    }" @mousemove.capture="bubble">
    <ul>
      <li v-for="(item, i) in items" :key="i" :style="genFontSize(i)"><a href="#" :data-index="i">{{item}}</a></li>
    </ul>
  </aside>
</template>

<script>
export default {
  name: 'bubble-hover',
  props: {
    items: {
      type: Array,
      default: () => []
    },
    settings: {
      type: Object,
      default: () => ({
        fontSizeMax: 2,
        fontSizeBase: 0.7,
        opacityMax: 1,
        opacityBase: 0,
        multiplier: 1.5,
        vertical: false
      })
    }
  },
  data: () => ({
    target: 6,
    percent: 0
  }),
  methods: {
    genFontSize(i) {
      const {
        fontSizeMax,
        fontSizeBase,
        opacityMax,
        opacityBase,
        multiplier
      } = this.settings

      const itemSize = (1 / this.items.length)
      const itemPercent = ((itemSize * i) - Math.floor(itemSize / 2)) * 100
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
      const { vertical } = this.settings
      let d, h

      if (vertical) {
        d = e.pageY - this.$el.offsetTop
        h = this.$el.offsetHeight
      } else {
        d = e.pageX - this.$el.offsetLeft
        h = this.$el.offsetWidth
      }

      this.percent = Math.round((d / h) * 100)
    }
  }
}
</script>

<style lang="scss">
aside {
  display: flex;
  align-items: center;
  justify-content: center;

  &.vertical {
    align-items: center;
    justify-content: center;
  }
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;

  .vertical & {
    align-items: center;
    flex-direction: column;
  }
}

a {
  color: #ddd;
  text-decoration: none;
  line-height: 0.8em;
  display: inline-block;
}
</style>
