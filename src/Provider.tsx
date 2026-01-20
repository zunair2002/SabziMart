"use client"
import { SessionProvider } from 'next-auth/react'
import React from 'react'

//Session sari app ko provide kr rhy hain 

function Provider({children}:{children:React.ReactNode}) {
  return (
    <div>
      <SessionProvider>
        {children}
      </SessionProvider>
    </div>
  )
}

export default Provider
