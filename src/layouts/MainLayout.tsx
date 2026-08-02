import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '@/layouts/components/Navbar'
import Footer from '@/layouts/components/Footer'

const MainLayout: React.FC<{ onAdminClick?: () => void; onLogout?: () => void }> = ({ onAdminClick, onLogout }) => {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar onAdminClick={onAdminClick} onLogout={onLogout} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
