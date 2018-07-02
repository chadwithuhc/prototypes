<template>
  <main>
    <BubbleHover :items="frameworkNames" :settings="verticalSettings" />
    <BubbleHover :items="emojis" />
  </main>
</template>

<script>
import BubbleHover from './components/BubbleHover'
export default {
  name: 'home',
  components: {
    BubbleHover
  },
  data: () => ({
    emojis: [
      '🤔',
      '😘',
      '😭',
      '😻',
      '😳',
      '🤓'
    ],
    frameworkNames: [
      'React',
      'Vue.js',
      'jQuery',
      'Node.js',
      'Express',
      'Angular',
      'Backbone',
    ],
    verticalSettings: {
      fontSizeMax: 2,
      fontSizeBase: 0.7,
      opacityMax: 1,
      opacityBase: 0,
      multiplier: 1.5,
      vertical: true
    }
  })
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

/* demo styles */
.vertical {
  height: 90vh;
}
.horizontal {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
}

a {
  // border-bottom: solid .2em #555;
}
</style>
