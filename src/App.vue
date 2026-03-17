<script setup>
import HeaderBar from './components/HeaderBar.vue'
import FooterBar from './components/FooterBar.vue'
import ScrollToTop from './components/ScrollToTop.vue'
</script>

<template>
  <div id="app-wrapper">
    <HeaderBar />
    <main>
      <router-view />
    </main>
    <FooterBar />
    <ScrollToTop />
  </div>
</template>

<style scoped>
#app-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
}
</style>
