import type { ArmSlug } from './types'

export interface ArmMeta {
  slug: ArmSlug
  name: string
  shortName: string
  color: string
  description: string
  path: string
}

export const ARMS: ArmMeta[] = [
  {
    slug: 'mathematical-intuition',
    name: 'Mathematical Intuition',
    shortName: 'Math',
    color: '#4338CA',
    description: 'Building geometric and probabilistic intuition for mathematical concepts.',
    path: '/mathematical-intuition',
  },
  {
    slug: 'translational-biology',
    name: 'Translational Biology',
    shortName: 'Biology',
    color: '#0F766E',
    description: 'From bench to bedside: unpacking the science behind clinical breakthroughs.',
    path: '/translational-biology',
  },
  {
    slug: 'tools-and-news',
    name: 'Tools & News in Clinical Research',
    shortName: 'Tools & News',
    color: '#E11D48',
    description: 'Reviews, tutorials, and news on tools shaping modern clinical research.',
    path: '/tools-and-news',
  },
]

export function getArm(slug: ArmSlug): ArmMeta {
  const arm = ARMS.find(a => a.slug === slug)
  if (!arm) throw new Error(`Unknown arm slug: ${slug}`)
  return arm
}
