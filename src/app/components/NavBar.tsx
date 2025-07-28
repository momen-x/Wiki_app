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
  { name: "Article", path: "/article?pageNumber=1", icon: <ArticleIcon /> },
  { name: "About", path: "/about", icon: <InfoIcon /> },
];

interface NavBarProps {
  token?: string;
}

const NavBar = async () => {
  const pages = [...basePages];

  const cookieStore = cookies();
  const token = cookieStore.get("token"); // Read a cookie
  const payload = verifyTokenForPage(token?.value);
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
    <header className="w-full bg-blue-500 shadow-md">
      <nav className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src={cloude}
            alt="logo"
            width={40}
            height={40}
            className="rounded-full"
            priority
          />
          <span className="font-bold text-white text-lg hidden sm:inline-flex items-center">
            Cloude
            <BiotechOutlinedIcon className="ml-1" fontSize="inherit" />
            Hosting
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <ul className="flex items-center space-x-6 text-white text-base">
            {pages.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.path}
                  className="hover:text-amber-300 transition-colors"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Tablet Navigation (Icons only) */}
        <div className="hidden sm:flex md:hidden items-center space-x-4">
          <ul className="flex items-center space-x-4 text-white">
            {pages.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.path}
                  className="hover:text-amber-300 transition-colors p-2"
                  title={item.name}
                >
                  {item.icon}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <AuthButtons payload={payload} username={payload?.username} />

        <MobileMenu pages={pages} payload={payload} />
      </nav>
    </header>
  );
};

export default NavBar;
