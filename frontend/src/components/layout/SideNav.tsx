interface NavItem {
  icon: string
  label: string
  href: string
  active?: boolean
}

const primaryItems: NavItem[] = [
  { icon: 'grid_view', label: 'Dashboard', href: '#', active: true },
  { icon: 'ads_click', label: 'Campaigns', href: '#' },
  { icon: 'groups', label: 'Audience', href: '#' },
  { icon: 'podcasts', label: 'Broadcasts', href: '#' },
  { icon: 'settings', label: 'Settings', href: '#' },
]

const secondaryItems: NavItem[] = [
  { icon: 'help', label: 'Help Center', href: '#' },
  { icon: 'person', label: 'Account', href: '#' },
]

const inactiveClass =
  'flex items-center gap-sm text-on-surface-variant px-4 py-2 hover:text-on-surface hover:bg-surface-container-high transition-all duration-200 rounded-lg'

const activeClass =
  'flex items-center gap-sm bg-secondary-container text-on-secondary-container rounded-lg px-4 py-2 border-l-4 border-tertiary scale-95 duration-150 ease-in-out font-bold'

export function SideNav() {
  return (
    <nav
      aria-label="Navegação principal"
      className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 overflow-y-auto gap-md py-lg px-sm border-r border-outline-variant backdrop-blur-xl bg-opacity-90 bg-surface-container-low z-20"
    >
      <div className="flex items-center gap-3 px-2">
        <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-on-primary font-bold">
          B
        </div>
        <div>
          <h1 className="font-headline-md text-headline-md font-bold tracking-tighter text-on-surface">
            BrandCast
          </h1>
          <p className="font-body-sm text-body-sm text-secondary">Flow Control</p>
        </div>
      </div>

      <ul className="flex flex-col gap-1 flex-1 mt-4">
        {primaryItems.map((item) => (
          <li key={item.label}>
            <a href={item.href} className={item.active ? activeClass : inactiveClass}>
              <span className="material-symbols-outlined">{item.icon}</span>
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-col gap-1">
        {secondaryItems.map((item, idx) => (
          <a
            key={item.label}
            href={item.href}
            className={`${inactiveClass} ${idx === secondaryItems.length - 1 ? 'mb-4' : ''}`}
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            {item.label}
          </a>
        ))}
        <button
          type="button"
          className="w-full py-2 bg-secondary-container text-on-secondary-container rounded-lg font-body-md hover:bg-secondary hover:text-on-secondary-fixed transition-colors font-bold"
        >
          New Broadcast
        </button>
      </div>
    </nav>
  )
}
