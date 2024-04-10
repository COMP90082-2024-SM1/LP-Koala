"use client";

import {BarChart, Compass, Layout, List, UserRound} from "lucide-react";
import { usePathname } from "next/navigation";

import { SidebarItem } from "./sidebar-item";

const guestRoutes = [
  {
    icon: Layout,
    label: "Projects",
    href: "/projects",
  },
  // {
  //   icon: Compass,
  //   label: "Projects",
  //   href: "/(projects)",
  // },
  {
    icon: UserRound,
    label: "Users",
    href: "/users"
  }
];

const adminRoutes = [
  {
    icon: List,
    label: "Projects",
    href: "/admin/(projects)",
  },
  {
    icon: BarChart,
    label: "Create",
    href: "/admin/create",
  },
]

export const SidebarRoutes = () => {
  const pathname = usePathname();

  const isAdminPage = pathname?.includes("/admin");

  const routes = isAdminPage ? adminRoutes : guestRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  )
}