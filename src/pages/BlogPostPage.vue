<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getPostBySlug } from '@/data/posts'

const route = useRoute()
const post = computed(() => getPostBySlug(route.params.slug))
const backLink = computed(() => {
  if (!post.value) return '/blog/life'
  return post.value.category === 'Tech' ? '/blog/tech' : '/blog/life'
})
</script>

<template>
  <section class="post-page" v-if="post">
    <div class="post-inner">
      <router-link :to="backLink" class="back-link">&larr; Blog</router-link>

      <div class="post-meta">
        <span class="post-tag">{{ post.tag }}</span>
        <span class="post-date">{{ post.date }}</span>
      </div>

      <h1 class="post-title">{{ post.title }}</h1>

      <div class="post-content" v-html="post.html"></div>
    </div>
  </section>

  <section class="post-page" v-else>
    <div class="post-inner">
      <router-link :to="backLink" class="back-link">&larr; Blog</router-link>
      <h1 class="post-title">포스트를 찾을 수 없습니다.</h1>
    </div>
  </section>
</template>

<style scoped>
.post-page {
  padding: 80px 40px;
}

.post-inner {
  max-width: 800px;
  margin: 0 auto;
}

.back-link {
  display: inline-block;
  font-size: 15px;
  color: var(--color-accent);
  margin-bottom: 32px;
  transition: opacity 0.2s;
}

.back-link:hover {
  opacity: 0.7;
}

.post-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.post-tag {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-accent);
  background-color: rgba(52, 152, 219, 0.1);
  padding: 2px 10px;
  border-radius: 12px;
}

.post-date {
  font-size: 14px;
  color: var(--color-text-light);
}

.post-title {
  font-size: 32px;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 40px;
  line-height: 1.4;
}

.post-content {
  font-size: 17px;
  color: var(--color-text);
  line-height: 1.9;
}

.post-content :deep(p) {
  margin-bottom: 20px;
}

.post-content :deep(h2) {
  font-size: 24px;
  font-weight: 600;
  color: var(--color-primary);
  margin-top: 40px;
  margin-bottom: 16px;
}

.post-content :deep(h3) {
  font-size: 20px;
  font-weight: 600;
  color: var(--color-primary);
  margin-top: 32px;
  margin-bottom: 12px;
}

.post-content :deep(strong) {
  font-weight: 600;
  color: var(--color-primary);
}

.post-content :deep(code) {
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 0.9em;
  background-color: #f4f4f4;
  padding: 2px 6px;
  border-radius: 4px;
}

.post-content :deep(pre) {
  background-color: #2c3e50;
  color: #ecf0f1;
  padding: 20px;
  border-radius: 8px;
  overflow-x: auto;
  margin-bottom: 20px;
}

.post-content :deep(pre code) {
  background: none;
  padding: 0;
  color: inherit;
}

.post-content :deep(ul),
.post-content :deep(ol) {
  padding-left: 24px;
  margin-bottom: 20px;
}

.post-content :deep(li) {
  margin-bottom: 8px;
}

.post-content :deep(blockquote) {
  border-left: 4px solid var(--color-accent);
  padding-left: 16px;
  margin: 20px 0;
  color: var(--color-text-light);
  font-style: italic;
}

.post-content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 8px 0;
}

@media (max-width: 768px) {
  .post-page {
    padding: 48px 20px;
  }

  .post-title {
    font-size: 26px;
    margin-bottom: 28px;
  }

  .post-content {
    font-size: 15px;
  }
}

@media (max-width: 480px) {
  .post-page {
    padding: 32px 16px;
  }

  .post-title {
    font-size: 22px;
    margin-bottom: 24px;
  }

  .post-content {
    font-size: 14px;
  }

  .back-link {
    font-size: 14px;
    margin-bottom: 24px;
  }
}
</style>
