import Link from 'next/link'
import { getArm } from '@/lib/arms'
import type { Post } from '@/lib/types'

interface Props {
  post: Post
}

export default function PostCard({ post }: Props) {
  const arm = getArm(post.arm)
  const href = `${arm.path}/${post.slug}`

  return (
    <Link href={href} className="group block">
      <article
        className="h-full bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
        style={{ borderLeftWidth: '4px', borderLeftColor: arm.color }}
      >
        <div className="flex items-center gap-2 mb-3">
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full text-white"
            style={{ backgroundColor: arm.color }}
          >
            {arm.shortName}
          </span>
          <time className="text-xs text-gray-400">
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </time>
          <span className="text-xs text-gray-400">&middot; {post.readingTime} min read</span>
        </div>

        <h2 className="text-base font-semibold text-gray-900 group-hover:opacity-75 transition-opacity leading-snug mb-2">
          {post.title}
        </h2>

        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{post.description}</p>

        {post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {post.tags.slice(0, 3).map(tag => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-500"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </Link>
  )
}
