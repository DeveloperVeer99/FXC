import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '@/layouts/components/Navbar'
import EditableFooter from '@/layouts/components/EditableFooter'

const MainLayout: React.FC<{ onAdminClick?: () => void; onLogout?: () => void }> = ({ onAdminClick, onLogout }) => {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar onAdminClick={onAdminClick} onLogout={onLogout} />
      <main className="flex-1">
        <Outlet />
      </main>
      <EditableFooter />
    </div>
  )
}

export default MainLayout
