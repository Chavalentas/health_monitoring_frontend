export interface NavigationProps{
    sidebarTitle: string;
    navigationTitle: string;
    homeNavigation: string;
    profileNavigation: string;
    impressumNavigation: string;
    onLogOut: () => void;
    homeNavigationLink: string;
    profileNavigationLink: string;
    impressumNavigationLink: string;
}