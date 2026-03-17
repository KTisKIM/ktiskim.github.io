import { createRouter, createWebHistory } from 'vue-router'
import { getPostBySlug } from '@/data/posts'
import HomePage from '@/pages/HomePage.vue'
import AboutPage from '@/pages/AboutPage.vue'
import BlogPage from '@/pages/BlogPage.vue'
import PortfolioPage from '@/pages/PortfolioPage.vue'
import ContactPage from '@/pages/ContactPage.vue'
import BlogPostPage from '@/pages/BlogPostPage.vue'

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/blog/tech', name: 'BlogTech', component: BlogPage, meta: { category: 'Tech' } },
  { path: '/blog/life', name: 'BlogLife', component: BlogPage, meta: { category: 'Life' } },
  { path: '/blog/:slug', name: 'BlogPost', component: BlogPostPage },
  { path: '/about', name: 'About', component: AboutPage },
  { path: '/portfolio', name: 'Portfolio', component: PortfolioPage },
  { path: '/contact', name: 'Contact', component: ContactPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.afterEach((to) => {
  if (to.name === 'Home') {
    document.title = 'KTisKIM'
  } else if (to.name === 'BlogTech') {
    document.title = 'Tech | Blog | KTisKIM'
  } else if (to.name === 'BlogLife') {
    document.title = 'Life | Blog | KTisKIM'
  } else if (to.name === 'BlogPost') {
    const post = getPostBySlug(to.params.slug)
    document.title = post ? `${post.title} | Blog | KTisKIM` : 'Blog | KTisKIM'
  } else {
    document.title = `${to.name} | KTisKIM`
  }
})

export default router
