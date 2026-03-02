import React from 'react'
import SideBarOptions from './elements/SideBarOptions'

export default function Sidebar() {
  return (
    <aside className="w-50 max-w-50 min-w-50 bg-[#121214] border-r border-[#191924] p-4 overflow-hidden">
      <nav className="space-y-3">
        <SideBarOptions />
      </nav>
    </aside>
  )
}
