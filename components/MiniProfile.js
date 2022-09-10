import React from 'react'
import { signOut, useSession } from 'next-auth/react'

function MiniProfile() {
  const { data: session } = useSession();

  return (
    <div className = 'flex justify-between items-center mt-9 ml-7'>
        <img 
          className = 'h-14 w-14 rounded-full border p-[2px] cursor-pointer' 
          src = {session?.user?.image}
          alt = ''
        />

        <div className = 'flex-1 mx-3.5'>
          <h2 className = 'font-semibold text-[15px] cursor-pointer'>{session?.user?.username}</h2>
          <h3 className = 'text-[13px] text-gray-400'>Welcome to Instagram</h3>
        </div>

        <button onClick = {signOut} className = 'text-blue-400 text-xs font-bold'>Switch</button>
    </div>
  )
}

export default MiniProfile
