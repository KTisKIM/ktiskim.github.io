<template>
  <section class="hero">
    <div class="hero-placeholder">
      <span class="hero-placeholder-text">Image / Video Area</span>
    </div>
  </section>
</template>

<style scoped>
.hero {
  width: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.hero-placeholder {
  max-width: var(--mid-width);
  margin: 0 auto;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-placeholder-text {
  font-size: 24px;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 4px;
  text-transform: uppercase;
}

@media (max-width: 1024px) {
  .hero-placeholder {
    height: 350px;
  }

  .hero-placeholder-text {
    font-size: 20px;
  }
}

/* 768px - Tablet */
@media (max-width: 768px) {
  .hero-placeholder {
    height: 280px;
  }

  .hero-placeholder-text {
    font-size: 18px;
    letter-spacing: 2px;
  }
}

/* 480px - Mobile */
@media (max-width: 480px) {
  .hero-placeholder {
    height: 200px;
  }

  .hero-placeholder-text {
    font-size: 14px;
    letter-spacing: 1px;
  }
}
</style>
