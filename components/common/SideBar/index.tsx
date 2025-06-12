"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Search,
  Menu,
  ChevronDown,
  Plus,
  LogOut,
  User,
  Settings,
  Bell,
  CircleUser,
  FileText,
  BarChart3,
  Shield,
  Users,
  Package,
  CreditCard,
  Zap,
  Activity,
  Calendar,
  Mail,
  MessageSquare,
  CircleUserIcon,
  LucideIcon,
  StepBack,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarConfig,
  defaultSidebarConfig,
  filterMenuItemsByPermissions,
} from "@/lib/sidebar-config";
import Home from "@/app/page";

interface SidebarProps {
  config?: SidebarConfig;
  userPermissions?: string[];
  user?: {
    name: string;
    email: string;
    avatar?: string;
    initials?: string;
  };
  onLogout?: () => void;
}

const iconMap: Record<string, React.ElementType> = {
  Home,
  Settings,
  User,
  FileText,
  BarChart3,
  Bell,
  Shield,
  Users,
  Package,
  CreditCard,
  Zap,
  Activity,
  Calendar,
  Mail,
  MessageSquare,
  CircleUserIcon,
  StepBack
};

function SidebarHeaderComponent({ config }: { config: SidebarConfig }) {
  const { open } = useSidebar();

  console.log({ open });
  return (
    <SidebarHeader className="border-b border-sidebar-border">
      <div className="flex items-center gap-2 py-[3.5px]">
        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
          {config.appLogo ? (
            <img src={config.appLogo} alt={config.appName} className="size-6" />
          ) : (
            <Menu className="size-4" />
          )}
        </div>
        {open && (
          <div className="flex flex-col gap-0">
            <span className="text-sm font-semibold">{config.appName}</span>
            {config.workspaceName && (
              <span className="text-xs text-sidebar-foreground/70">
                {config.workspaceName}
              </span>
            )}
          </div>
        )}
      </div>
    </SidebarHeader>
  );
}

function NavigationMenu({
  config,
  userPermissions,
}: {
  config: SidebarConfig;
  userPermissions?: string[];
}) {
  const pathname = usePathname();
  const [openSubmenus, setOpenSubmenus] = React.useState<
    Record<string, boolean>
  >({});

  const toggleSubmenu = (title: string) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const menuItems = userPermissions
    ? filterMenuItemsByPermissions(config.menuItems, userPermissions)
    : config.menuItems;

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Navigation</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {menuItems.map((item) => {
              const Icon = iconMap[item.icon];

              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild={!item.submenu}
                    isActive={pathname === item.href}
                    onClick={
                      item.submenu ? () => toggleSubmenu(item.title) : undefined
                    }
                  >
                    {item.submenu ? (
                      <div className="flex w-full items-center">
                        {Icon && <Icon className="size-4" />}
                        <span className="flex-1">{item.title}</span>
                        <ChevronDown
                          className={`size-4 transition-transform ${
                            openSubmenus[item.title] ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className="flex items-center gap-2"
                      >
                        {Icon && <Icon className="size-4" />}
                        <span>{item.title}</span>
                        {item.badge && (
                          <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                        )}
                      </Link>
                    )}
                  </SidebarMenuButton>

                  {item.submenu && openSubmenus[item.title] && (
                    <SidebarMenuSub>
                      {item.submenu.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.href}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={pathname === subItem.href}
                          >
                            <Link href={subItem.href}>{subItem.title}</Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  )}
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
}

// Footer component with user profile
function SidebarFooterComponent({
  config,
  user = { name: "John Doe", email: "john@example.com", initials: "JD" },
  onLogout,
}: {
  config: SidebarConfig;
  user?: { name: string; email: string; avatar?: string; initials?: string };
  onLogout?: () => void;
}) {
  const userMenuItems = config.userMenuItems || [
    { title: "Profile", icon: User, href: "/profile" },
    { title: "Settings", icon: Settings, href: "/settings" },
    { title: "Notifications", icon: Bell, href: "/notifications" },
  ];

  return (
    <SidebarFooter className="border-t border-sidebar-border">
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                <Avatar className="size-6">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.initials}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col text-left">
                  <span className="text-sm font-medium">{user.name}</span>
                  <span className="text-xs text-sidebar-foreground/70">
                    {user.email}
                  </span>
                </div>
                <ChevronDown className="size-4 ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56" align="end" side="top">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />

              {userMenuItems.map((item) => {
                const Icon = iconMap[item.icon]; // 🔁 resolve string -> component
                return (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link href={item.href} className="flex items-center gap-2">
                      {Icon && <Icon className="size-4" />}
                      {item.title}
                    </Link>
                  </DropdownMenuItem>
                );
              })}

              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={onLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="size-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}

// Main sidebar component
function AppSidebar({
  config = defaultSidebarConfig,
  userPermissions,
  user,
  onLogout,
}: SidebarProps) {
  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <React.Suspense fallback={<div>Loading...</div>}>
        <SidebarHeaderComponent config={config} />
      </React.Suspense>
      <NavigationMenu config={config} userPermissions={userPermissions} />
      {/* <SidebarFooterComponent config={config} user={user} onLogout={onLogout} /> */}
    </Sidebar>
  );
}

interface CommonLayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
  sidebarConfig?: SidebarConfig;
  userPermissions?: string[];
  user?: {
    name: string;
    email: string;
    avatar?: string;
    initials?: string;
  };
  onLogout?: () => void;
  headerTitle?: string;
}

function CommonLayout({
  children,
  showSidebar = true,
  sidebarConfig,
  userPermissions,
  user,
  onLogout,
  headerTitle = "Dashboard",
}: CommonLayoutProps) {
  if (!showSidebar) {
    return <>{children}</>;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar
          config={sidebarConfig}
          userPermissions={userPermissions}
          user={user}
          onLogout={onLogout}
        />
        <main className="flex-1">
          <header className="flex h-14 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger className="-ml-1" />
            <div className="flex-1">
              <h1 className="flex text-lg font-semibold justify-end">
                {headerTitle}
              </h1>
            </div>
          </header>
          <div className="flex-1 p-6">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}

export { AppSidebar, CommonLayout, SidebarProvider, SidebarHeaderComponent };
