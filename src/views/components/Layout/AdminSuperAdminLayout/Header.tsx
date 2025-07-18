import React from "react";
import UsjrLogo from "../../../../assets/usjr.png";
import ScsLogo from "../../../../assets/scs.png";
import { IoNotifications } from "react-icons/io5";
// import { CgProfile } from "react-icons/cg";
import { IoMenu, IoClose } from "react-icons/io5";
import ProfileDropdown from "./ProfileDropdown";
// import { useAuth } from '../../../../context/AuthContext';

interface HeaderProps {
  nav: boolean;
  toggleNav: () => void;
}

const Header: React.FC<HeaderProps> = ({ nav, toggleNav }) => {
  // const { user } = useAuth();

  return (
    <div className="sticky top-0 bg-green-800 h-25 flex items-center justify-between px-4">
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-4 cursor-pointer">
          <img src={UsjrLogo} alt="Logo" className="h-20 cursor-pointer" />
          <img src={ScsLogo} alt="Logo" className="h-15 mt-2 cursor-pointer" />
          <div className="flex flex-col text-center">
            <h3 className="text-white text-xl font-semibold">
              School of Computer Studies
            </h3>
            <h1 className="text-white text-3xl font-bold">Academic Advising</h1>
          </div>
        </div>
        {nav ? (
          <IoClose
            className="text-white size-7 cursor-pointer"
            onClick={() => {
              toggleNav();
            }}
          />
        ) : (
          <IoMenu
            className="text-white size-7 cursor-pointer"
            onClick={() => {
              toggleNav();
            }}
          />
        )}
      </div>
      <div className="sm:text-white sm:flex sm:items-center gap-10 hidden">
        <div className="flex items-center gap-4">
          {/* <p className='font-medium cursor-pointer'>{user!.fname} {user!.lname}</p> */}
          <p className="font-medium cursor-pointer">John Doe</p>
          <ProfileDropdown />
        </div>
      </div>
    </div>
  );
};

export default Header;
