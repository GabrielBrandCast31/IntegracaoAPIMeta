import { SideNav } from './components/layout/SideNav'
import { TopNav } from './components/layout/TopNav'
import { DashboardPage } from './pages/DashboardPage'

function App() {
  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex">
      <SideNav />
      <div className="flex-1 ml-0 md:ml-64 flex flex-col min-h-screen">
        <TopNav />
        <DashboardPage />
      </div>
    </div>
  )
}

export default App
