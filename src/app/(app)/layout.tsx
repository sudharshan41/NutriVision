import MainSidebar from '@/components/layout/main-sidebar';
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
} from '@/components/sidebar';

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <Sidebar>
        <MainSidebar />
      </Sidebar>
      <SidebarInset>
        <div className="min-h-screen">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
