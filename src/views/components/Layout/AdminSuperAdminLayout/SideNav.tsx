import React from 'react';
import SideNavLinkDropdown from './SideNavLinkDropdown';
import { MdAdminPanelSettings, MdMeetingRoom } from 'react-icons/md';
import { FaUser, FaLayerGroup,  } from 'react-icons/fa';
import { FaChalkboardUser } from "react-icons/fa6";

interface SideNavProps {
  nav: boolean;
  role: 'admin' | 'superadmin';
}

const SideNav: React.FC<SideNavProps> = ({ nav, role }) => {
  return (
    <div
      className={`z-100 fixed bg-[#FFFFFF] sm:w-67 w-full h-full flex flex-col overflow-y-auto shadow-zinc-500 shadow-lg duration-300 ease-in-out
        ${nav ? 'translate-x-0' : '-translate-x-full'}`}
    >
      <SideNavLinkDropdown
        icon={<MdAdminPanelSettings className='size-7' />}
        label='Admin View'
      />

      <SideNavLinkDropdown
        icon={<FaUser className='size-5' />}
        label='Students'
      />

      <SideNavLinkDropdown
        icon={<FaChalkboardUser className='size-5' />}
        label='Advisors'
      />

      <SideNavLinkDropdown
        icon={<FaLayerGroup className='size-5' />}
        label='Clusters'
      />
    </div>
  );
};

export default SideNav;
