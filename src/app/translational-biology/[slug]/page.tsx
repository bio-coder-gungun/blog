import { notFound } from 'next/navigation'
import { compileMDX } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypePrismPlus from 'rehype-prism-plus'
import { getPostsByArm, getPost } from '@/lib/posts'
import { getArm } from '@/lib/arms'
import { mdxComponents } from '@/components/mdx-components'
import Link from 'next/link'
import type { Metadata } from 'next'

const arm = getArm('translational-biology')

export async function generateStaticParams() {
  return getPostsByArm('translational-biology').map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPost('translational-biology', params.slug)
  if (!post) return {}
  return { title: post.title, description: post.description }
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = getPost('translational-biology', params.slug)
  if (!post) notFound()

  const { content } = await compileMDX({
    source: post.content,
    components: mdxComponents,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm, remarkMath],
        rehypePlugins: [rehypeKatex, [rehypePrismPlus, { ignoreMissing: true }]],
        format: 'mdx',
      },
    },
  })

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-8">
        <Link
          href={arm.path}
          className="inline-flex items-center gap-1.5 text-sm font-medium hover:opacity-75 transition-opacity mb-6"
          style={{ color: arm.color }}
        >
          <span>&larr;</span>
          <span>{arm.name}</span>
        </Link>

        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full text-white"
            style={{ backgroundColor: arm.color }}
          >
            {arm.shortName}
          </span>
          <time className="text-sm text-gray-400">
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          <span className="text-sm text-gray-400">&middot; {post.readingTime} min read</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-4 leading-tight">
          {post.title}
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed">{post.description}</p>

        {post.tags.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-full border text-sm"
                style={{ borderColor: arm.color + '40', color: arm.color, backgroundColor: arm.color + '0d' }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <hr className="border-gray-100 mb-10" />

      <article className="prose prose-gray prose-lg max-w-none">{content}</article>
    </div>
  )
}
