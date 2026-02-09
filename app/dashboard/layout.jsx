import React from 'react'
import { UserButton } from '@clerk/nextjs'
import Header from './_components/Header'

function DashboardLayout({ children }) {
  return (
    <div>
      <header style={{ display: 'flex', justifyContent: 'space-between' }}>
        
        
      </header>
      

      <main>
        <Header/>
        <div className='mx-5 md:mx-20 lg:mx-36'>
          {children}

        </div>
        
      </main>
    </div>
  )
}

export default DashboardLayout
