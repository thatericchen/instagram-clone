import React from 'react'
import Stories from './Stories'
import Posts from './Posts'
import MiniProfile from './MiniProfile'
import Suggestions from './Suggestions'
import { useSession } from 'next-auth/react'

function Feed() {
  const { data: session } = useSession();

  return (
    <main className = {`grid grid-cols-1 md:grid-cols-2 xs:max-w-sm sm:max-w-sm md:max-w-3xl xl:grid-cols-[430px_minmax(325px,_1fr)_50px] xl:max-w-3xl mx-auto ${!session && "!grid-cols-1 !max-w-3xl"}`}>
        <section className= 'col-span-1'>
            <Stories />
            <Posts />
        </section>

  {session && (
    <section className= 'hidden md:inline-grid md:col-span-1'>
      <div className= 'mt-3.5'>
        <MiniProfile />
        <Suggestions />
      </div>
    </section>
  )}
        
    </main>
  )
}

export default Feed