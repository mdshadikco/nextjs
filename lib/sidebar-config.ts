import { 
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
    LucideIcon
  } from "lucide-react"
  
  export interface MenuItem {
    title: string
    icon: string
    href: string
    badge?: string
    submenu?: SubMenuItem[]
    permissions?: string[]
  }
  
  export interface SubMenuItem {
    title: string
    href: string
    permissions?: string[]
  }
  
  export interface SidebarConfig {
    appName: string
    appLogo?: string
    workspaceName?: string
    menuItems: MenuItem[]
    userMenuItems: MenuItem[]
  }
  
  export const defaultSidebarConfig: SidebarConfig = {
    appName: "Your App",
    workspaceName: "Workspace",
    menuItems: [
      {
        title: "Dashboard",
        icon: "Home",
        href: "/dashboard",
      },
      {
        title: "Analytics",
        icon: "BarChart3",
        href: "/analytics",
        badge: "New",
      },
      {
        title: "Documents",
        icon: "FileText",
        href: "/documents",
        submenu: [
          { title: "All Documents", href: "/documents" },
          { title: "Shared", href: "/documents/shared" },
          { title: "Drafts", href: "/documents/drafts" },
        ],
      },
      {
        title: "Calendar",
        icon: "Calendar",
        href: "/calendar",
      },
      {
        title: "Messages",
        icon: "MessageSquare",
        href: "/messages",
        badge: "3",
      },
      {
        title: "Settings",
        icon: "Settings",
        href: "/settings",
        submenu: [
          { title: "Profile", href: "/settings/profile" },
          { title: "Account", href: "/settings/account" },
          { title: "Preferences", href: "/settings/preferences" },
        ],
      },
    ],
    userMenuItems: [
      {
        title: "Profile",
        icon: "User",
        href: "/profile",
      },
      {
        title: "Settings",
        icon: "Settings",
        href: "/settings",
      },
      {
        title: "Notifications",
        icon: "Bell",
        href: "/notifications",
      },
    ]
  }
  
  export const userSideBarConfig: SidebarConfig = {
    appName: "User",
    workspaceName: "User Workspace",
    menuItems: [
      {
        title: "Users",
        icon: "CircleUserIcon",
        href: "/users",
      },
      {
        title: "Back To Home",
        icon: "StepBack",
        href: "/",
      },
    ],
    userMenuItems: [

    ]
  }
  
  
  // Function to get config based on route or user role
  export function getSidebarConfig(type: 'default' | 'user'): SidebarConfig {
    switch (type) {
      case 'user':
        return userSideBarConfig
      default:
        return defaultSidebarConfig
    }
  }
  
  // Function to filter menu items based on permissions
  export function filterMenuItemsByPermissions(
    menuItems: MenuItem[], 
    userPermissions: string[]
  ): MenuItem[] {
    return menuItems.filter(item => {
      if (!item.permissions || item.permissions.length === 0) {
        return true
      }
      return item.permissions.some(permission => userPermissions.includes(permission))
    }).map(item => ({
      ...item,
      submenu: item.submenu?.filter(subItem => {
        if (!subItem.permissions || subItem.permissions.length === 0) {
          return true
        }
        return subItem.permissions.some(permission => userPermissions.includes(permission))
      })
    }))
  }