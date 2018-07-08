<template>
  <span :class="{
      'size-box': true,
      'full-text': fullText
    }" @mouseenter="showFullText" @mouseleave="showAbbr">
    <span class="letters">{{ text }}</span>
  </span>
</template>

<script>
export default {
  name: 'abbr-hover',
  props: {
    title: String,
    abbr: String,
    settings: {
      type: Object,
      default: () => ({

      })
    }
  },
  data: () => ({
    text: '',
    fullText: false
  }),
  mounted() {
    this.text = this.abbr
  },
  methods: {
    showFullText() {
      this.text = this.title
      this.fullText = true
    },
    showAbbr() {
      this.text = this.abbr
      this.fullText = false
    }
  }
}
</script>

<style lang="scss">
.size-box {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1em;
  height: 1em;
  padding: 0.4em;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 100%;
  font-size: 1em;
  color: white;
  cursor: pointer;
  transition: background-color 200ms;

  &:after {
    content: '';
    position: absolute;
    top: -.2em; left: -.2em;
    bottom: -.2em; right: -.2em;
    border-radius: 100%;
    transition: border 200ms;
  }

  &:hover {
    background-color: rgba(0,0,0,1);

    &:after {
      border: solid 0.1em wheat;
    }
  }
}

.letters {
  font-size: 0.8em;
  line-height: 1em;
  padding-top: 0.2em;
  transition: font-size 100ms;
}

.full-text {
  .letters {
    font-size: 0.4em;
  }
}
</style>
