"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarContent,
} from '@/components/sidebar';
import { Logo } from '@/components/icons/logo';
import {
  LayoutDashboard,
  UtensilsCrossed,
  ShieldAlert,
  User,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/meal-planner', icon: UtensilsCrossed, label: 'Meal Planner' },
  { href: '/allergy-check', icon: ShieldAlert, label: 'Allergy Check' },
  { href: '/profile', icon: User, label: 'Profile' },
];

export default function MainSidebar() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center justify-between">
            <Logo />
            <SidebarTrigger className="group-data-[collapsible=icon]:hidden" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href}>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  tooltip={{ children: item.label, side: 'right' }}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <Separator className="my-2" />
        <div className="flex flex-col gap-2 p-2 text-sm text-muted-foreground group-data-[state=collapsed]:hidden">
            <span className='text-xs'>Your AI Nutrition Assistant</span>
        </div>
      </SidebarFooter>
    </>
  );
}
