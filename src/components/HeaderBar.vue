<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import logoImg from '@/assets/RS_Black-small.png'

const menuItems = [
  {
    name: 'Blog',
    children: [
      { name: 'Life', to: '/blog/life' },
      { name: 'Tech', to: '/blog/tech' },
    ],
  },
  {
    name: 'Portfolio',
    children: [
      { name: 'About', to: '/about' },
      { name: 'Portfolio', to: '/portfolio' },
      { name: 'Contact', to: '/contact' },
    ],
  },
]

const route = useRoute()
const menuOpen = ref(false)
const scrolled = ref(false)
const activeMenu = ref(null)
const transitioning = ref(false)

function getMenuForRoute(path) {
  for (const menu of menuItems) {
    if (menu.children.some((child) => path.startsWith(child.to))) {
      return menu.name
    }
  }
  return null
}

// 페이지 이동 시 해당 상위 메뉴 상태 유지
watch(() => route.path, (path) => {
  activeMenu.value = getMenuForRoute(path)
}, { immediate: true })

function toggleMenu() {
  menuOpen.value = !menuOpen.value
  activeMenu.value = null
}

function selectMenu(name) {
  if (transitioning.value) return
  transitioning.value = true

  if (activeMenu.value === name) {
    activeMenu.value = null
    setTimeout(() => { transitioning.value = false }, 500)
  } else {
    activeMenu.value = name
    setTimeout(() => { transitioning.value = false }, 500)
  }
}

function closeAll() {
  menuOpen.value = false
  activeMenu.value = null
}

function onChildClick() {
  menuOpen.value = false
}

function onScroll() {
  scrolled.value = window.scrollY > 50
}

function onClickOutside(e) {
  const nav = document.querySelector('.nav')
  if (nav && !nav.contains(e.target)) {
    activeMenu.value = null
  }
}

onMounted(() => {
  window.addEventListener('scroll', onScroll)
  document.addEventListener('click', onClickOutside)
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  document.removeEventListener('click', onClickOutside)
})
</script>

<template>
  <header class="header" :class="{ scrolled }">
    <div class="header-inner">
      <router-link to="/" class="logo" @click="closeAll">
        <img :src="logoImg" alt="Logo" class="logo-img" />
      </router-link>

      <button class="menu-toggle" @click="toggleMenu" :class="{ active: menuOpen }">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav class="nav" :class="{ open: menuOpen }">
        <div v-for="menu in menuItems" :key="menu.name" class="nav-group" :class="{
          active: activeMenu === menu.name,
          hidden: activeMenu && activeMenu !== menu.name,
        }">
          <button class="nav-link parent" @click="selectMenu(menu.name)">
            <span class="back-arrow" :class="{ visible: activeMenu === menu.name }"></span>
            {{ menu.name }}
          </button>

          <div class="children-wrapper">
            <router-link v-for="child in menu.children" :key="child.name" :to="child.to" class="nav-link child"
              @click="onChildClick">
              {{ child.name }}
            </router-link>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
  transition: background-color 0.3s, border-color 0.3s, backdrop-filter 0.3s;
}

.header.scrolled {
  background-color: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(6px);
  border-bottom-color: rgba(224, 224, 224, 0.5);
}

.header-inner {
  max-width: var(--mid-width);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  height: 72px;
}

.logo {
  display: flex;
  align-items: center;
}

.logo-img {
  height: 40px;
  width: auto;
}

.nav {
  display: flex;
  align-items: center;
  gap: 16px;
}

/* Nav group - each top-level menu + its children */
.nav-group {
  display: flex;
  align-items: center;
  overflow: hidden;
  /* returning: wait for children to fully close, then fade in */
  transition: max-width 0.55s cubic-bezier(0.4, 0, 0.2, 1) 0.6s,
    opacity 0.5s ease 0.6s,
    filter 0.5s ease 0.6s;
  max-width: 400px;
  opacity: 1;
  filter: blur(0);
}

.nav-group.hidden {
  max-width: 0;
  opacity: 0;
  filter: blur(6px);
  /* hiding: fade out immediately */
  transition: max-width 0.25s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.2s ease;
}

/* Parent button */
.nav-link {
  font-size: 15px;
  font-weight: 500;
  color: var(--color-text-light);
  padding: 8px 18px;
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
  white-space: nowrap;
  transition: color 0.2s;
  text-decoration: none;
}

.nav-link:hover {
  color: var(--color-accent);
}

.nav-group.active .nav-link.parent {
  color: var(--color-accent);
}

/* Back arrow indicator */
.back-arrow {
  display: inline-block;
  vertical-align: middle;
  width: 6px;
  height: 6px;
  border-left: 1.5px solid currentColor;
  border-bottom: 1.5px solid currentColor;
  transform: rotate(45deg) translateY(-1px);
  opacity: 0;
  max-width: 0;
  overflow: hidden;
  transition: opacity 0.3s ease, max-width 0.3s ease;
}

.back-arrow.visible {
  opacity: 0.5;
  max-width: 16px;
  margin-right: 7px;
  transition: opacity 0.3s ease 0.6s, max-width 0.3s ease 0.6s;
}

/* Children wrapper */
.children-wrapper {
  display: flex;
  align-items: center;
  max-width: 0;
  opacity: 0;
  filter: blur(6px);
  overflow: hidden;
  /* closing: shrink smoothly */
  transition: max-width 0.6s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.5s ease,
    filter 0.5s ease;
  filter: blur(0);
}

.nav-group.active .children-wrapper {
  max-width: 400px;
  opacity: 1;
  filter: blur(0);
  /* opening: wait for other menu to fade out, then appear */
  transition: max-width 0.65s cubic-bezier(0.4, 0, 0.2, 1) 0.35s,
    opacity 0.55s ease 0.4s,
    filter 0.55s ease 0.4s;
}

/* Child link separator */
.nav-link.child {
  position: relative;
}

.nav-link.child::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 1px;
  height: 16px;
  background-color: var(--color-border);
}

/* Hamburger */
.menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
}

.menu-toggle span {
  display: block;
  width: 24px;
  height: 2px;
  background-color: var(--color-primary);
  transition: transform 0.3s, opacity 0.3s;
}

.menu-toggle.active span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.menu-toggle.active span:nth-child(2) {
  opacity: 0;
}

.menu-toggle.active span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* 1024px */
@media (max-width: 1024px) {
  .header-inner {
    padding: 0 24px;
    height: 60px;
  }

  .nav-link {
    font-size: 14px;
    padding: 8px 10px;
  }
}

/* 768px - Tablet */
@media (max-width: 768px) {
  .header-inner {
    padding: 0 20px;
    height: 56px;
  }

  .logo-img {
    height: 32px;
  }

  .menu-toggle {
    display: flex;
  }

  .nav {
    display: none;
    position: absolute;
    top: 56px;
    left: 0;
    right: 0;
    flex-direction: column;
    background-color: var(--color-bg);
    border-bottom: 1px solid var(--color-border);
    padding: 4px 20px;
    gap: 0;
    align-items: flex-start;
  }

  .nav.open {
    display: flex;
  }

  .nav-group {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    max-width: none;
    border-bottom: 1px solid var(--color-border);
    overflow: visible;
  }

  .nav-group:last-child {
    border-bottom: none;
  }

  .nav-group.hidden {
    max-width: none;
    max-height: 0;
    opacity: 0;
    border: none;
  }

  .nav-link {
    font-size: 15px;
    padding: 4px 0;
  }

  .children-wrapper {
    flex-direction: column;
    align-items: flex-start;
    padding-left: 16px;
  }

  .nav-group.active .children-wrapper {
    padding-bottom: 2px;
  }

  .nav-link.child {
    padding: 3px 0;
  }

  .nav-link.child::before {
    display: none;
  }
}

/* 480px - Mobile */
@media (max-width: 480px) {
  .header-inner {
    padding: 0 16px;
    height: 50px;
  }

  .logo-img {
    height: 28px;
  }

  .nav {
    top: 50px;
    padding: 8px 16px;
  }

  .nav-link {
    font-size: 15px;
    padding: 10px 0;
  }
}
</style>
