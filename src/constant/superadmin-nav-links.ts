import React from 'react';
import { RiDashboardHorizontalFill } from 'react-icons/ri';
import { FaUser, FaUserPlus  } from 'react-icons/fa6';
import { FaLayerGroup } from 'react-icons/fa';

export const navLinks: Record<
  string,
  Record<string, { label: string; icon: React.ReactNode; path: string }>
> = {
  // — Admin View —
  admin: {
    dashboard: {
      label: 'Dashboard',
      icon: React.createElement(RiDashboardHorizontalFill, { size: 20 }),
      path: '/admin/dashboard',
    },
  },

  // — Students —
  students: {
    view: {
      label: 'View Students',
      icon: React.createElement(FaUser, { size: 17 }),
      path: '/admin/students/view',
    },
    add: {
      label: 'Add Student',
      icon: React.createElement(FaUserPlus, { size: 20 }),
      path: '/admin/students/add',
    },
  },

  // — Advisors —
  advisors: {
    view: {
      label: 'View Advisors',
      icon: React.createElement(FaUser, { size: 17 }),
      path: '/admin/advisors/view',
    },
    add: {
      label: 'Add Advisor',
      icon: React.createElement(FaUserPlus, { size: 20 }),
      path: '/admin/advisors/add',
    },
  },

  // — Clusters —
  clusters: {
    view: {
      label: 'View Clusters',
      icon: React.createElement(FaLayerGroup, { size: 18 }),
      path: '/admin/clusters/view',
    },
  },
};
