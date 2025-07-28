import React, { useState } from 'react';
import { IoIosArrowForward, IoIosArrowDown } from 'react-icons/io';
import { navLinks } from '../../../../constant/superadmin-nav-links';
import SideNavLink from './SideNavLink';

interface SideNavLinkDropdownProps {
  label: string;
  icon: React.ReactNode;
}

const SideNavLinkDropdown: React.FC<SideNavLinkDropdownProps> = ({ label, icon }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(prev => !prev);

  const getNavLinksKey = (label: string) => {
    switch (label.toLowerCase()) {
      case 'admin view':
        return 'admin';
      case 'students':
        return 'students';
      case 'advisors':
        return 'advisors';
      case 'clusters':
        return 'clusters';
      default:
        return '';
    }
  };

  const key = getNavLinksKey(label);
  if (!key || !navLinks[key]) return null;

  const entries = Object.entries(navLinks[key]);
  const maxHeight = isOpen ? `${entries.length * 48}px` : '0';

  return (
    <div className='flex flex-col'>
      <div
        className={`flex items-center justify-between p-3 hover:bg-[#F3F4F6] cursor-pointer text-[#1F2937] text-md font-medium ${
          isOpen ? 'bg-[#F3F4F6]' : ''
        }`}
        onClick={handleToggle}
      >
        <div className='flex items-center gap-4'>
          <span className='w-7 flex items-center justify-center'>{icon}</span>
          <p>{label}</p>
        </div>
        {isOpen ? <IoIosArrowDown className='size-5' /> : <IoIosArrowForward className='size-5' />}
      </div>

      <div
        className='flex flex-col overflow-hidden transition-[max-height] duration-300 ease-in-out'
        style={{ maxHeight }}
      >
        {entries.map(([_, value]) => (
          <SideNavLink
            key={value.path}
            label={value.label}
            icon={value.icon}
            path={value.path}
          />
        ))}
      </div>
    </div>
  );
};

export default SideNavLinkDropdown;
