import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LayoutGrid } from 'lucide-react'
import {
  BOTTOM_NAV_MORE_TABS,
  BOTTOM_NAV_PRIMARY_TABS,
  type BottomNavTab,
} from '../../config/constants/bottom-navigation.config'

function isTabActive(pathname: string, path: string) {
  return pathname === path || pathname.startsWith(`${path}/`)
}

function TabIconView({ isActive, Icon }: { isActive: boolean; Icon: BottomNavTab['icon'] }) {
  return (
    <div className={`transition-all duration-200 ${isActive ? 'scale-110' : ''}`}>
      <Icon
        className={`w-6 h-6 ${
          isActive ? 'drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]' : ''
        }`}
      />
    </div>
  )
}

function NavTabLink({ tab, isActive }: { tab: BottomNavTab; isActive: boolean }) {
  const Icon = tab.icon

  return (
    <Link
      to={tab.path}
      className={`flex flex-col items-center justify-center flex-1 h-full transition-all duration-200 ${
        isActive ? 'text-violet-400' : 'text-slate-400 hover:text-slate-200'
      }`}
    >
      <TabIconView isActive={isActive} Icon={Icon} />
      <span
        className={`text-xs mt-1 font-medium ${
          isActive ? 'text-violet-400' : 'text-slate-500'
        }`}
      >
        {tab.label}
      </span>
    </Link>
  )
}

export function BottomNavigation() {
  const location = useLocation()
  const [moreOpen, setMoreOpen] = useState(false)

  const isMoreActive = BOTTOM_NAV_MORE_TABS.some((tab) =>
    isTabActive(location.pathname, tab.path),
  )

  const closeMore = () => setMoreOpen(false)

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-slate-950/95 backdrop-blur-sm border-t border-slate-700/50 shadow-2xl z-40">
      <div className="max-w-md mx-auto">
        <div className="flex justify-around items-center h-16">
          {BOTTOM_NAV_PRIMARY_TABS.map((tab) => (
            <NavTabLink
              key={tab.id}
              tab={tab}
              isActive={isTabActive(location.pathname, tab.path)}
            />
          ))}

          <div className="relative flex-1 h-full">
            {moreOpen && (
              <button
                type="button"
                aria-label="Close menu"
                className="fixed inset-0 z-40"
                onClick={closeMore}
              />
            )}

            {moreOpen && (
              <div className="absolute bottom-full right-0 mb-2 z-50 min-w-[10.5rem] rounded-xl border border-slate-700/50 bg-slate-900 shadow-2xl overflow-hidden">
                {BOTTOM_NAV_MORE_TABS.map((tab) => {
                  const isActive = isTabActive(location.pathname, tab.path)
                  const Icon = tab.icon

                  return (
                    <Link
                      key={tab.id}
                      to={tab.path}
                      onClick={closeMore}
                      className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                        isActive
                          ? 'bg-violet-500/15 text-violet-400'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <Icon className="w-5 h-5 shrink-0" />
                      <span className="text-sm font-medium">{tab.label}</span>
                    </Link>
                  )
                })}
              </div>
            )}

            <button
              type="button"
              onClick={() => setMoreOpen((open) => !open)}
              className={`flex flex-col items-center justify-center w-full h-full transition-all duration-200 ${
                isMoreActive || moreOpen
                  ? 'text-violet-400'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div
                className={`transition-all duration-200 ${
                  isMoreActive || moreOpen ? 'scale-110' : ''
                }`}
              >
                <LayoutGrid
                  className={`w-6 h-6 ${
                    isMoreActive || moreOpen
                      ? 'drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]'
                      : ''
                  }`}
                />
              </div>
              <span
                className={`text-xs mt-1 font-medium ${
                  isMoreActive || moreOpen ? 'text-violet-400' : 'text-slate-500'
                }`}
              >
                More
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
