import Link from 'next/link'
import { ARMS } from '@/lib/arms'

export default function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-gray-900 font-semibold text-lg tracking-tight hover:opacity-75 transition-opacity">
            bio-coder-gungun
          </Link>

          <div className="flex items-center gap-6">
            {ARMS.map(arm => (
              <Link
                key={arm.slug}
                href={arm.path}
                className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                <span
                  className="inline-block w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: arm.color }}
                />
                <span className="hidden sm:inline">{arm.shortName}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
