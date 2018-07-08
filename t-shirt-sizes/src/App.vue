<template>
  <main>
    <header>Hover an item</header>
    <section>
      <AbbrHover title="Small" abbr="S" />
      <AbbrHover title="Medium" abbr="M" />
      <AbbrHover title="Large" abbr="L" />
      <AbbrHover title="X-Large" abbr="XL" />
    </section>
    <section>
      <AbbrHover title="Jerry Seinfeld" abbr="JS" />
      <AbbrHover title="Ellaine Benes" abbr="EB" />
      <AbbrHover title="George Costanza" abbr="GC" />
      <AbbrHover title="Cosmo Kramer" abbr="CK" />
    </section>
  </main>
</template>

<script>
import AbbrHover from './components/AbbrHover'
export default {
  name: 'home',
  components: {
    AbbrHover
  },
  data: () => ({

  })
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Prata');

html, body, main {
  height: 100vh;
}
body {
  font: normal 3rem Prata;
  margin: 0;
}

main {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

section {
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  /* size scalable via font-size */
  font-size: 1em;

  /* seinfeld demo styles */
  + section {
    font-size: 1.2em;

    .size-box {
      transition: border-radius 100ms, background-color 100ms;
      background-color: rgba(wheat, .7);

      &:hover {
        background-color: gold;
        color: firebrick;
        border-radius: 70% 30%;
        font-style: italic;
        border-bottom: solid 1px black;
        border-right: solid 1px black;

        &:after {
          border: 0 !important;
        }

        .letters {
          font-size: 0.6em;
          text-shadow: 0 1px 0 rgba(0,0,0,0.7);
        }
      }
    }
  }
}
</style>
