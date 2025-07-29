import React from "react";
import UsjrLogo from "../../../../assets/usjr.png";
import ScsLogo from "../../../../assets/scs.png";
import { IoMenu, IoClose } from "react-icons/io5";
import ProfileDropdown from "./ProfileDropdown";
import { useAuth } from "../../../../contexts/authContext.tsx";

interface HeaderProps {
  nav: boolean;
  toggleNav: () => void;
}

const Header: React.FC<HeaderProps> = ({ nav, toggleNav }) => {
  const { user } = useAuth();

  return (
    <div className="sticky top-0 bg-green-800 h-25 flex items-center justify-between px-4 z-100">
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-4 cursor-pointer">
          <img src={UsjrLogo} alt="Logo" className="h-20 cursor-pointer" />
          <img src={ScsLogo} alt="Logo" className="h-15 mt-2 cursor-pointer" />
          <div className="flex flex-col text-center leading-tight">
            <h3 className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-semibold">
              School of Computer Studies
            </h3>
            <h1 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
              Academic Advising
            </h1>
          </div>
        </div>
        {nav ? (
          <IoClose
            className="text-white size-7 cursor-pointer"
            onClick={toggleNav}
          />
        ) : (
          <IoMenu
            className="text-white size-7 cursor-pointer"
            onClick={toggleNav}
          />
        )}
      </div>
      <div className="sm:text-white sm:flex sm:items-center gap-10 hidden">
        <div className="flex items-center gap-4">
          <p className="font-medium cursor-pointer">
            {user?.first_name || user?.fname || ""}{" "}
            {user?.last_name || user?.lname || ""}
          </p>
          <ProfileDropdown />
        </div>
      </div>
    </div>
  );
};

export default Header;
