import Header from '@/Header'
import { Outlet } from 'react-router-dom'

const Layout = () => (
  <div className="flex flex-col w-full">
    <Header title="Just enough ML&trade;" />
    <div className="container">
      <main className="max-w-5xl mx-auto">
        <Outlet />
      </main>
    </div>
  </div>
)

export default Layout
