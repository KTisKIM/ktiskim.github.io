<template>
  <section class="content">
    <div class="content-inner">
      <h1 class="content-title">Welcome</h1>
      <p class="content-description">
        여기에 소개 문구나 설명 텍스트가 들어갑니다.
        원하는 콘텐츠로 자유롭게 교체하세요.
      </p>

      <div class="content-grid">
        <div class="content-card" v-for="n in 18" :key="n">
          <div class="card-icon">{{ n }}</div>
          <h2 class="card-title">Section {{ n }}</h2>
          <p class="card-text">
            이 영역에 콘텐츠 내용을 넣으세요. 프로젝트 소개, 서비스 설명 등 다양한 정보를 배치할 수 있습니다.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.content {
  padding: 60px 40px;
}

.content-inner {
  max-width: var(--mid-width);
  margin: 0 auto;
}

.content-title {
  font-size: 36px;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 20px;
}

.content-description {
  font-size: 18px;
  color: var(--color-text-light);
  max-width: 700px;
  line-height: 1.8;
  margin-bottom: 60px;
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.content-card {
  padding: 32px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  transition: box-shadow 0.2s;
}

.content-card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.card-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: var(--color-accent);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 20px;
}

.card-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: 12px;
}

.card-text {
  font-size: 15px;
  color: var(--color-text-light);
  line-height: 1.7;
}

@media (max-width: 1024px) {
  .content {
    padding: 48px 24px;
  }

  .content-title {
    font-size: 30px;
  }

  .content-description {
    font-size: 16px;
    margin-bottom: 40px;
  }

  .content-grid {
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }
}

/* 768px - Tablet */
@media (max-width: 768px) {
  .content {
    padding: 40px 20px;
  }

  .content-title {
    font-size: 26px;
  }

  .content-description {
    font-size: 15px;
    margin-bottom: 32px;
  }

  .content-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .content-card {
    padding: 24px;
  }
}

/* 480px - Mobile */
@media (max-width: 480px) {
  .content {
    padding: 32px 16px;
  }

  .content-title {
    font-size: 22px;
    margin-bottom: 14px;
  }

  .content-description {
    font-size: 14px;
    margin-bottom: 24px;
    line-height: 1.7;
  }

  .content-grid {
    gap: 16px;
  }

  .content-card {
    padding: 20px;
  }

  .card-icon {
    width: 40px;
    height: 40px;
    font-size: 16px;
    margin-bottom: 16px;
  }

  .card-title {
    font-size: 18px;
  }

  .card-text {
    font-size: 14px;
  }
}
</style>
