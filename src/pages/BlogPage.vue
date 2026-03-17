<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getAllPosts } from '@/data/posts'

const route = useRoute()

const category = computed(() => route.meta.category)

const posts = computed(() =>
  getAllPosts().filter((post) => post.category === category.value)
)

const categoryLabel = computed(() =>
  category.value === 'Tech' ? 'Tech' : 'Life'
)
</script>

<template>
  <section class="blog">
    <div class="blog-inner">
      <h1 class="blog-title">{{ categoryLabel }}</h1>

      <div class="post-list">
        <router-link
          v-for="post in posts"
          :key="post.slug"
          :to="`/blog/${post.slug}`"
          class="post-card"
        >
          <div class="post-meta">
            <span class="post-tag">{{ post.tag }}</span>
            <span class="post-date">{{ post.date }}</span>
          </div>
          <h2 class="post-title">{{ post.title }}</h2>
          <p class="post-excerpt">{{ post.excerpt }}</p>
        </router-link>

        <p v-if="posts.length === 0" class="no-posts">아직 작성된 글이 없습니다.</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.blog {
  padding: 80px 40px;
}

.blog-inner {
  max-width: var(--mid-width);
  margin: 0 auto;
}

.blog-title {
  font-size: 36px;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 40px;
}

.post-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.post-card {
  display: block;
  padding: 32px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  transition: box-shadow 0.2s, border-color 0.2s;
  text-decoration: none;
  color: inherit;
}

.post-card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border-color: var(--color-accent);
}

.post-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
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
  font-size: 22px;
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: 8px;
}

.post-excerpt {
  font-size: 15px;
  color: var(--color-text-light);
  line-height: 1.7;
}

.no-posts {
  font-size: 16px;
  color: var(--color-text-light);
  padding: 40px 0;
  text-align: center;
}

@media (max-width: 768px) {
  .blog {
    padding: 48px 20px;
  }

  .blog-title {
    font-size: 28px;
    margin-bottom: 28px;
  }

  .post-card {
    padding: 24px;
  }

  .post-title {
    font-size: 19px;
  }

  .post-excerpt {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .blog {
    padding: 32px 16px;
  }

  .blog-title {
    font-size: 24px;
    margin-bottom: 20px;
  }

  .post-card {
    padding: 20px;
  }

  .post-title {
    font-size: 17px;
  }

  .post-meta {
    gap: 8px;
  }

  .post-tag {
    font-size: 12px;
  }

  .post-date {
    font-size: 13px;
  }
}
</style>
