import Link from "next/link";
import Image from "next/image";
import BiotechOutlinedIcon from "@mui/icons-material/BiotechOutlined";
import HomeIcon from "@mui/icons-material/Home";
import ArticleIcon from "@mui/icons-material/Article";
import InfoIcon from "@mui/icons-material/Info";
import DashboardIcon from "@mui/icons-material/Dashboard";
import cloude from "../images/cloud.png";
import { verifyTokenForPage } from "../utils/verifyToken";
import { MobileMenu } from "./MobileMenu";
import { AuthButtons } from "./AuthButtons";
import { cookies } from "next/headers";

interface IURL {
  name: string;
  path: string;
  icon: React.ReactNode;
}

const basePages: IURL[] = [
  { name: "Home", path: "/", icon: <HomeIcon /> },
  { name: "Article", path: "/article", icon: <ArticleIcon /> },
  { name: "About", path: "/about", icon: <InfoIcon /> },
];

const NavBar = async () => {
  const pages = [...basePages];

  const cookieStore = cookies();
  const token = (await cookieStore)?.get("token");
  const payload = verifyTokenForPage(token?.value ||"");
  // console.log(payload);

  if (payload?.isAdmin) {
    if (!pages.some((p) => p.name === "Admin Dashboard")) {
      pages.push({
        name: "Admin Dashboard",
        path: "/admindashboard",
        icon: <DashboardIcon />,
      });
    }
  }

  return (
    <header className="w-full bg-blue-500 shadow-md relative">
      <nav className="flex items-center justify-between px-4 lg:px-6 py-3 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
            <Image
              src={cloude}
              alt="logo"
              width={40}
              height={40}
              className="rounded-full"
              priority
            />
            <span className="font-bold text-white text-lg hidden xs:inline-flex items-center">
              <span className="hidden sm:inline">Cloude</span>
              <span className="sm:hidden">C</span>
              <BiotechOutlinedIcon className="ml-1" fontSize="inherit" />
              <span className="hidden sm:inline">Hosting</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          <ul className="flex items-center space-x-8 text-white text-base">
            {pages.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.path}
                  className="hover:text-amber-300 transition-colors duration-200 py-2"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Tablet Navigation (Icons + Text on hover) */}
        <div className="hidden md:flex lg:hidden items-center space-x-2">
          <ul className="flex items-center space-x-2 text-white">
            {pages.map((item) => (
              <li key={item.name} className="group relative">
                <Link
                  href={item.path}
                  className="hover:text-amber-300 transition-colors duration-200 p-3 rounded-lg hover:bg-blue-600 flex items-center justify-center"
                  title={item.name}
                >
                  {item.icon}
                </Link>
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                  {item.name}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Auth Buttons - Desktop & Tablet */}
        <AuthButtons payload={payload} username={payload?.username} />

        {/* Mobile Menu Button */}
        <MobileMenu pages={pages} payload={payload} />
      </nav>
    </header>
  );
};

export default NavBar;