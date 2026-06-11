'use client'

import dynamic from 'next/dynamic'
import type { PlotParams } from 'react-plotly.js'

const Plot = dynamic(() => import('react-plotly.js'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-64 bg-gray-50 rounded-xl border border-gray-100">
      <span className="text-gray-400 text-sm">Loading chart&hellip;</span>
    </div>
  ),
})

export type { PlotParams }

export default function PlotlyChart(props: PlotParams) {
  return (
    <div className="my-8 rounded-xl overflow-hidden border border-gray-100">
      <Plot
        {...props}
        style={{ width: '100%', ...props.style }}
        config={{ responsive: true, displayModeBar: false, ...props.config }}
      />
    </div>
  )
}
