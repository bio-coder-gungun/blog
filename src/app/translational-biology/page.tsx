import { getPostsByArm } from '@/lib/posts'
import { getArm } from '@/lib/arms'
import ArmHero from '@/components/ArmHero'
import PostCard from '@/components/PostCard'
import type { Metadata } from 'next'

const arm = getArm('translational-biology')

export const metadata: Metadata = {
  title: arm.name,
  description: arm.description,
}

export default function BioPage() {
  const posts = getPostsByArm('translational-biology')
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <ArmHero arm={arm} postCount={posts.length} />
      {posts.length === 0 ? (
        <p className="text-gray-400 text-center py-16">No posts yet — coming soon.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map(post => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
