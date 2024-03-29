import React from 'react'
import Image from 'next/image'
import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon
} from '@heroicons/react/outline'
import { HomeIcon } from '@heroicons/react/solid';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { modalState } from '../atoms/modalAtom';

function Header() {
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);
  const router = useRouter();

  return (
    <div className = 'shadow-sm border-b bg-white sticky top-0 z-50'>
      <div className = 'flex justify-between max-w-4xl mx-5 lg:mx-auto mt-0'>
        {/* Left */}
        <div onClick = {() => router.push('/')} className = 'relative hidden lg:inline-grid w-24 cursor-pointer'>
          <Image 
            src = 'https://links.papareact.com/ocw' 
            layout = 'fill'
            objectFit = 'contain'
          />
        </div>

        <div onClick = {() => router.push('/')} className = 'relative w-9 lg:hidden flex-shrink-0 cursor-pointer'> 
        <Image 
            src = 'https://links.papareact.com/jjm' 
            layout = 'fill'
            objectFit = 'contain'
          />
        </div>

        {/* Middle - Search input field*/}
        <div className = 'ml-20 max-w-md'>
          <div className = 'relative mt-0.5 p-3 rounded-md'>
            <div className = 'absolute inset-y-0 pl-3 flex items-center pointer-events-none'>
              <SearchIcon className = 'h-4 w-4 text-gray-500'/>
            </div>
            <input 
              className = 'bg-gray-100 block w-full pl-10 sm:text-sm border-gray-100 focus:ring-gray-100 focus:border-gray-100 rounded-md' 
              type = 'text'
              placeholder = 'Search'
            />
          </div>
        </div>
        
        {/* Right */}
        <div className = 'flex items-center mr-7 space-x-5'> 
          <HomeIcon onClick = {() => router.push('/')} className = 'navBtn'/>
          <MenuIcon className = 'h-6 md:hidden cursor-pointer'/>

      {session ? (
        <>
          <div className = 'relative navBtn'>
            <PaperAirplaneIcon className = 'navBtn rotate-45'/>
            <div className = 'absolute -top-1.5 -right-2 text-xs h-5 w-5 bg-red-500 rounded-full flex items-center justify-center text-white'>
             3
            </div>
         </div>
         <PlusCircleIcon onClick = {() => setOpen(true)} className = 'navBtn'/>
         <UserGroupIcon className = 'navBtn'/>
         <HeartIcon className = 'navBtn'/>
         
         <img
         onClick={signOut} 
            src = {session?.user?.image}
            alt = 'profile pic'
            className = 'h-6 w-6 rounded-full cursor-pointer'
          />
        </>
      ) : (
        <button onClick={signIn}>Sign In</button>
      )}  
        </div> 
      </div>
    </div>
  )
}

export default Header