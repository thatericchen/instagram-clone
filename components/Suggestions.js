import { faker } from '@faker-js/faker';
import React from 'react'
import { useEffect, useState } from 'react';

function Suggestions() {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const suggestions = [...Array(5)].map((_,i) => ({
        ...faker.helpers.contextualCard(),
        id: i,
    })); 
    setSuggestions(suggestions);
  }, []);

  return (
    <div className = "mt-3 ml-8">
      <div className = "flex justify-between text-sm mb-3">
        <h3 className = 'text-[13.3px] font-bold text-gray-500'>
          Suggestions for you
        </h3>
        <button className = 'text-gray-600 font-bold text-[11px]'>See All</button>
      </div>

      {suggestions.map((profile) => (
          <div
            keys = {profile.id}
            className = "flex items-center justify-between mt-2.5"
          >
            <img
              className = "h-8 w-8 rounded-full border p-[1px] border-gray-300 cursor-pointer"
              src = {profile.avatar} 
              alt = ""
            />

            <div className = 'flex-1 ml-2.5'>
              <h2 className = 'font-bold text-[13px] cursor-pointer'>{profile.username}</h2>
              <h3 className = 'text-[11px] text-gray-400'>Suggested for you</h3>
            </div>
            <button className = 'text-xs font-bold text-blue-400'>Follow</button>

          </div>
        ))}
        <p className = 'text-[10.5px] text-gray-300 mt-6 cursor-pointer'>About ◦ Help ◦ Press ◦ API ◦ Jobs ◦ Privacy ◦ Terms ◦ Locations ◦</p>
        <p className = 'text-[10.5px] text-gray-300 cursor-pointer'>Language</p>
        <p className = 'text-[10.5px] text-gray-300 mt-3.5'>© 2022 ERIC CHEN</p>
    </div>
  )
}

export default Suggestions