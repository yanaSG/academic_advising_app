import React, { useState, useRef, useEffect } from "react";
import Avatar from "../../../../assets/user-avatar.svg";
import ProfileDropdownLink from "./ProfileDropdownLink.tsx";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "../../../../contexts/authContext.tsx"; // ✅ enable AuthContext
import { useNavigate } from "react-router";

const ProfileDropdown: React.FC = () => {
    const [open, setOpen] = useState(false);
    const { logout, user } = useAuth(); // ✅ get user from context
    const navigate = useNavigate();
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleLogout = async () => {
        try {
            await logout(); // ✅ clear tokens
            navigate("/login");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative flex items-center h-full z-50" ref={dropdownRef}>
            <button onClick={() => setOpen(!open)} className="focus:outline-none cursor-pointer">
                <img
                    src={Avatar}
                    className="h-10 w-10 transition duration-200 hover:scale-110"
                    alt="User Avatar"
                />
            </button>
            <div
                className={`absolute right-0 top-full mt-1 w-60 bg-white rounded-md z-100 transform transition-all p-5 duration-300 ease-out 
                ${open ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"}
                shadow-[0_0_9px_rgba(0,0,0,0.1)]`}
            >
                <div className="pb-2 flex flex-row text-[#1F2937] gap-2 items-center font-semibold text-md">
                    <img src={Avatar} className="h-9 w-9" alt="User Avatar" />
                    <p>
                        {user?.first_name || user?.fname || ""}{" "}
                        {user?.last_name || user?.lname || ""}
                    </p>
                </div>
                <div className="border-t border-gray-200 my-2"></div>
                <div className="flex flex-col gap-3 mt-3 mx-1">
                    <ProfileDropdownLink
                        label="Logout"
                        icon={<FiLogOut size={20} />}
                        onClick={handleLogout}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProfileDropdown;
