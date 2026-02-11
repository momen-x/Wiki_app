"use client";
import {
  Menu,
  ChevronLeft,
 LayoutDashboardIcon,
  NewspaperIcon,
  MessageSquareTextIcon,
  LayoutPanelTop,
  Users,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/app/_Components/ui/button";
import NavButton from "@/app/_Components/ui/NavButton";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const pages = [
  { icon:  LayoutDashboardIcon , label: "Dashboard", path: "/admindashboard" },
  { icon: Users , label: "Users", path: "/admindashboard/users" },
  { icon: NewspaperIcon , label: "Articles", path: "/admindashboard/articles" },
  { icon: MessageSquareTextIcon , label: "Comments", path: "/admindashboard/comments" },

];
const Dashboard =(  { children }: DashboardLayoutProps) => {
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const pathname = usePathname();

  return (
    <div className="flex h-screen">
      <div
        className={`
          border-r
          transition-all duration-300 ease-in-out
          flex flex-col
          ${isSidebarOpen ? "w-64" : "w-20"}
        `}
      >
        <div className="p-4 border-b flex items-center justify-between cursor-pointer">
          <Link href={"/"}>
            {isSidebarOpen && (
              <div className="flex items-center">
                <div className="h-8 w-8 bg-indigo-600 rounded-md flex items-center justify-center">
                  <LayoutPanelTop  className="h-5 w-5 text-white" />
                </div>
                <span className="ml-2 text-xl font-semibold">Wiki</span>
              </div>
            )}
            {!isSidebarOpen && (
              <div className="flex justify-center w-full">
                <div className="h-8 w-8 bg-indigo-600 rounded-md flex items-center justify-center">
                  <LayoutDashboardIcon className="h-5 w-5 text-white" />
                </div>
              </div>
            )}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="h-8 w-8"
          >
            {isSidebarOpen ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </Button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {pages.map((page) => (
            <NavButton
              key={page.path}
              icon={page.icon}
              label={page.label}
              path={page.path}
              isSidebarOpen={isSidebarOpen}
            />
          ))}
        </nav>

        <div className="p-4 border-t space-y-4">
          <div
            className={`flex ${
              isSidebarOpen ? "justify-between" : "justify-center"
            }`}
          ></div>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="border-b p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">
              {pathname.substring(1).trim()
                ? pathname.substring(1)
                : "Dashboard"}
            </h1>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6"> {children}</main>
      </div>
    </div>
  );
};

export default Dashboard;
