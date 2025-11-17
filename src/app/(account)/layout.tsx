import Header from '@/components/web/header'
import React from 'react'
// import { Toaster } from 'sonner'

function layout({children}: {children: React.ReactNode}) {
  return (
    <div className='bg-[#0F172A]'>
      
      {/* <Toaster richColors  position="bottom-right"/> */}
      <Header />
        {children}
    </div>
  )
}

export default layout