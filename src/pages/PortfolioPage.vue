<template>
  <section class="page">
    <div class="page-inner">
      <h1 class="page-title">Portfolio</h1>
      <p class="page-text">
        포트폴리오 페이지입니다. 원하는 내용으로 교체하세요.
      </p>
    </div>
  </section>
</template>

<style scoped>
.page {
  padding: 80px 40px;
}

.page-inner {
  max-width: var(--mid-width);
  margin: 0 auto;
}

.page-title {
  font-size: 36px;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 24px;
}

.page-text {
  font-size: 17px;
  color: var(--color-text-light);
  line-height: 1.8;
  max-width: 700px;
}

@media (max-width: 768px) {
  .page { padding: 48px 20px; }
  .page-title { font-size: 28px; }
  .page-text { font-size: 15px; }
}

@media (max-width: 480px) {
  .page { padding: 32px 16px; }
  .page-title { font-size: 24px; }
  .page-text { font-size: 14px; }
}
</style>
