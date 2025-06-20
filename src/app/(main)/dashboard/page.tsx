import AppContent from '@/components/layout/AppContent'
import AppFooter from '@/components/layout/AppFooter'
import AppHeader from '@/components/layout/AppHeader'
import AppNavbar from '@/components/layout/AppNavbar'
import React from 'react'

export default function Dashboard() {
  return (
    <div>
      <AppNavbar />
      <AppHeader />
      <AppContent />
      <AppFooter />
    </div>
  )
}
