import MarkdownIt from 'markdown-it'

const md = new MarkdownIt()

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) return { meta: {}, content: raw }

  const meta = {}
  match[1].split('\n').forEach((line) => {
    const idx = line.indexOf(':')
    if (idx !== -1) {
      const key = line.slice(0, idx).trim()
      const value = line.slice(idx + 1).trim()
      meta[key] = value
    }
  })

  return { meta, content: match[2].trim() }
}

const markdownFiles = import.meta.glob('@/posts/*.md', { eager: true, query: '?raw', import: 'default' })

const posts = Object.entries(markdownFiles).map(([path, raw]) => {
  const filename = path.split('/').pop().replace('.md', '')
  const slug = filename.replace(/^\d{8}_/, '')
  const { meta, content } = parseFrontmatter(raw)

  return {
    slug,
    title: meta.title || slug,
    date: meta.date || '',
    category: meta.category || 'Tech',
    tag: meta.tag || '',
    excerpt: meta.excerpt || '',
    html: md.render(content),
  }
})

export function getAllPosts() {
  return [...posts].sort((a, b) => new Date(b.date) - new Date(a.date))
}

export function getPostBySlug(slug) {
  return posts.find((p) => p.slug === slug)
}
