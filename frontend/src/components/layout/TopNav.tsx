export function TopNav() {
  return (
    <header className="sticky top-0 w-full z-50 flex justify-between items-center px-margin py-base border-b border-outline-variant backdrop-blur-md bg-opacity-70 shadow-sm bg-surface-dim">
      <div className="flex items-center md:hidden">
        <button
          type="button"
          aria-label="Abrir menu"
          className="text-on-surface mr-4 cursor-pointer"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>

      <div className="hidden md:flex flex-1 max-w-md">
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
            search
          </span>
          <input
            type="search"
            placeholder="Buscar campanhas…"
            aria-label="Buscar campanhas"
            className="w-full pl-10 pr-4 py-1.5 bg-surface-container border border-outline-variant rounded-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none text-on-surface placeholder-on-surface-variant"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 ml-auto">
        <button
          type="button"
          aria-label="Notificações"
          className="text-on-surface-variant hover:text-on-surface hover:bg-surface-variant rounded-full p-2 transition-colors"
        >
          <span className="material-symbols-outlined">notifications_active</span>
        </button>
        <button
          type="button"
          aria-label="Ajustar filtros"
          className="text-on-surface-variant hover:text-on-surface hover:bg-surface-variant rounded-full p-2 transition-colors"
        >
          <span className="material-symbols-outlined">tune</span>
        </button>
        <button
          type="button"
          aria-label="Conta"
          className="text-on-surface-variant hover:text-on-surface hover:bg-surface-variant rounded-full p-2 transition-colors"
        >
          <span className="material-symbols-outlined">account_circle</span>
        </button>
        <button
          type="button"
          className="hidden md:block py-1.5 px-4 bg-primary text-on-primary rounded-md font-body-md hover:bg-primary-fixed hover:text-on-primary-fixed transition-colors"
        >
          Go Live
        </button>
        <div
          aria-label="Avatar do usuário"
          className="w-8 h-8 rounded-full bg-surface-container-high overflow-hidden border border-outline-variant ml-2 flex items-center justify-center"
        >
          <span className="material-symbols-outlined text-on-surface-variant">person</span>
        </div>
      </div>
    </header>
  )
}
