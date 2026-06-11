import Link from 'next/link'
import { ARMS } from '@/lib/arms'

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {ARMS.map(arm => (
            <div key={arm.slug}>
              <Link
                href={arm.path}
                className="text-sm font-semibold hover:opacity-75 transition-opacity"
                style={{ color: arm.color }}
              >
                {arm.name}
              </Link>
              <p className="mt-1 text-xs text-gray-500 leading-relaxed">{arm.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 pt-6 border-t border-gray-100 text-xs text-gray-400">
          &copy; {new Date().getFullYear()} bio-coder-gungun
        </div>
      </div>
    </footer>
  )
}
