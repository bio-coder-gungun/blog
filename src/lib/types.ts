export type ArmSlug =
  | 'mathematical-intuition'
  | 'translational-biology'
  | 'tools-and-news'

export interface PostFrontmatter {
  title: string
  slug: string
  arm: ArmSlug
  date: string
  tags: string[]
  description: string
  draft?: boolean
}

export interface Post extends PostFrontmatter {
  content: string
  readingTime: number
}
