import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

export function Layout() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 pt-16">
        <Outlet />
      </main>
    </div>
  )
} 