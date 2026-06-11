import type { ArmMeta } from '@/lib/arms'

interface Props {
  arm: ArmMeta
  postCount: number
}

export default function ArmHero({ arm, postCount }: Props) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl px-8 py-12 mb-12"
      style={{ backgroundColor: arm.color + '10', borderLeft: `4px solid ${arm.color}` }}
    >
      <div className="relative z-10">
        <span
          className="inline-block text-xs font-bold tracking-widest uppercase mb-3 px-3 py-1 rounded-full text-white"
          style={{ backgroundColor: arm.color }}
        >
          {arm.shortName}
        </span>
        <h1
          className="text-3xl sm:text-4xl font-bold mb-3 tracking-tight"
          style={{ color: arm.color }}
        >
          {arm.name}
        </h1>
        <p className="text-gray-600 max-w-2xl leading-relaxed">{arm.description}</p>
        <p className="mt-3 text-sm text-gray-400">{postCount} {postCount === 1 ? 'post' : 'posts'}</p>
      </div>
    </div>
  )
}
