import React from 'react';
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { IoNotifications } from "react-icons/io5";
import { MdMeetingRoom } from "react-icons/md";
import { FaBookBookmark, FaUser } from "react-icons/fa6";
import { FaUserCog } from 'react-icons/fa';

export const navLinks: Record<string, Record<string, { label: string; icon: React.ReactNode; path: string }>> = {
    admin: {
        dashboard: {
            label: 'Dashboard',
            icon: React.createElement(RiDashboardHorizontalFill, { className: 'size-5' }),
            path: '/admin/dashboard',
        },
    },
    users: {
        users: {
            label: 'View Users',
            icon: React.createElement(FaUser, { className: 'size-5' }),
            path: '/admin/users/view',
        },
    },
}