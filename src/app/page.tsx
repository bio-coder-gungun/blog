import Link from 'next/link'
import { getRecentPosts } from '@/lib/posts'
import { ARMS } from '@/lib/arms'
import PostCard from '@/components/PostCard'

export default function HomePage() {
  const recentPosts = getRecentPosts(6)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      {/* Hero */}
      <section className="mb-20 max-w-3xl">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-5 leading-tight">
          Science, math,<br className="hidden sm:block" /> and the clinic.
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
          Exploring mathematical intuition, translational biology, and the tools shaping modern
          clinical research — written for scientists who like to go deep.
        </p>
      </section>

      {/* Arm cards */}
      <section className="mb-20">
        <h2 className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-6">
          Explore by topic
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {ARMS.map(arm => (
            <Link
              key={arm.slug}
              href={arm.path}
              className="group block bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
              style={{ borderTopWidth: '3px', borderTopColor: arm.color }}
            >
              <h3
                className="font-semibold mb-2 group-hover:opacity-75 transition-opacity"
                style={{ color: arm.color }}
              >
                {arm.name}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">{arm.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent posts */}
      {recentPosts.length > 0 && (
        <section>
          <h2 className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-6">
            Recent posts
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentPosts.map(post => (
              <PostCard key={`${post.arm}-${post.slug}`} post={post} />
            ))}
          </div>
        </section>
      )}

      {recentPosts.length === 0 && (
        <section className="text-center py-20 text-gray-400">
          <p className="text-lg">No posts yet — coming soon.</p>
        </section>
      )}
    </div>
  )
}
