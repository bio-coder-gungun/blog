import PlotlyChart from '@/components/PlotlyChart'
import type { MDXComponents } from 'mdx/types'

export const mdxComponents: MDXComponents = {
  PlotlyChart,
  // Callout box for notes/warnings
  Callout: ({
    type = 'note',
    children,
  }: {
    type?: 'note' | 'warning' | 'tip'
    children: React.ReactNode
  }) => {
    const styles = {
      note: { border: '#4338CA', bg: '#EEF2FF', label: 'Note' },
      warning: { border: '#D97706', bg: '#FFFBEB', label: 'Warning' },
      tip: { border: '#0F766E', bg: '#F0FDFA', label: 'Tip' },
    }
    const s = styles[type]
    return (
      <div
        className="my-6 rounded-lg px-5 py-4 text-sm leading-relaxed"
        style={{ backgroundColor: s.bg, borderLeft: `4px solid ${s.border}` }}
      >
        <span className="font-semibold" style={{ color: s.border }}>
          {s.label}:{' '}
        </span>
        {children}
      </div>
    )
  },
}
