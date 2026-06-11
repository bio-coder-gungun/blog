import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Post, ArmSlug } from './types'

const CONTENT_DIR = path.join(process.cwd(), 'content')

const ARM_SLUGS: ArmSlug[] = [
  'mathematical-intuition',
  'translational-biology',
  'tools-and-news',
]

export function getAllPosts(): Post[] {
  const posts: Post[] = []

  for (const arm of ARM_SLUGS) {
    const armDir = path.join(CONTENT_DIR, arm)
    if (!fs.existsSync(armDir)) continue

    const files = fs.readdirSync(armDir).filter(f => f.endsWith('.mdx'))

    for (const file of files) {
      const slug = file.replace(/\.mdx$/, '')
      const raw = fs.readFileSync(path.join(armDir, file), 'utf-8')
      const { data, content } = matter(raw)

      if (data.draft && process.env.NODE_ENV === 'production') continue

      const wordCount = content.split(/\s+/).length
      posts.push({
        title: data.title ?? '',
        slug,
        arm,
        date: data.date ?? '',
        tags: data.tags ?? [],
        description: data.description ?? '',
        draft: data.draft ?? false,
        content,
        readingTime: Math.ceil(wordCount / 200),
      })
    }
  }

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export function getPostsByArm(arm: ArmSlug): Post[] {
  return getAllPosts().filter(p => p.arm === arm)
}

export function getPost(arm: ArmSlug, slug: string): Post | undefined {
  return getAllPosts().find(p => p.arm === arm && p.slug === slug)
}

export function getRecentPosts(n = 6): Post[] {
  return getAllPosts().slice(0, n)
}
