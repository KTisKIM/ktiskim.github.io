<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const visible = ref(false)

function onScroll() {
  visible.value = window.scrollY > 300
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <transition name="fade">
    <button v-if="visible" class="scroll-to-top" @click="scrollToTop" aria-label="맨 위로 이동">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 16V4M10 4L4 10M10 4L16 10" stroke="currentColor" stroke-width="2" stroke-linecap="round"
          stroke-linejoin="round" />
      </svg>
    </button>
  </transition>
</template>

<style scoped>
.scroll-to-top {
  position: fixed;
  top: 90px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 99;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: none;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  background-color: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(8px);
  color: var(--color-primary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s, box-shadow 0.2s;
}

.scroll-to-top:hover {
  background-color: var(--color-primary);
  color: #fff;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .scroll-to-top {
    top: 72px;
    width: 38px;
    height: 38px;
  }
}

@media (max-width: 480px) {
  .scroll-to-top {
    top: 64px;
    width: 34px;
    height: 34px;
  }

  .scroll-to-top svg {
    width: 16px;
    height: 16px;
  }
}
</style>
