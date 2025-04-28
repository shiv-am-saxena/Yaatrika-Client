import React from 'react'
import { Outlet } from 'react-router-dom'

export default function AuthPage() {
    return (
        <div className='h-full py-20 w-full bg-gradient-to-b from-purple-950 to-purple-700'>
            
            <Outlet />
        </div>
    )
}
