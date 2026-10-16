"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  Boxes,
  LayoutDashboard,
  Package,
  History,
  BrainCircuit,
  LogIn,
  UserPlus,
  LogOut,
  UserRound,
  ChevronDown,
  Settings,
  Info,
  Mail,
} from "lucide-react";
import { authClient, useSession } from "@/lib/auth-client";

const Navbar = () => {
  const { data: sessionData, isPending } = useSession();
  const user = sessionData?.user;

  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");

  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setShowProfileMenu(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowProfileMenu(false);
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const closeMenus = () => {
    setShowProfileMenu(false);
    setIsOpen(false);
    setLogoutError("");
  };

  const navLinks = [
    { name: "Home", href: "/", icon: Boxes },
    { name: "About", href: "/about", icon: Info },
    { name: "Contact", href: "/contact", icon: Mail },
    ...(user
      ? [{ name: "Dashboard", href: "/dashboard", icon: LayoutDashboard }]
      : []),
  ];

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  const userName = user?.name || "User";
  const userEmail = user?.email || "";
  const initial = userName.trim().charAt(0).toUpperCase() || "U";

  const handleLogout = async () => {
    setIsLoggingOut(true);
    setLogoutError("");

    try {
      const { error } = await authClient.signOut();

      if (error) {
        setLogoutError(error.message || "Logout failed. Please try again.");
        return;
      }

      closeMenus();
      router.replace("/login");
      router.refresh();
    } catch {
      setLogoutError("Logout failed. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  const renderNavLinks = (mobile = false) =>
    navLinks.map((link) => {
      const Icon = link.icon;
      const active = isActive(link.href);

      return (
        <Link
          key={link.href}
          href={link.href}
          onClick={closeMenus}
          aria-current={active ? "page" : undefined}
          className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition duration-200 ${
            active
              ? "bg-emerald-50 text-emerald-700"
              : "text-slate-600 hover:bg-slate-100 hover:text-emerald-700"
          } ${mobile ? "w-full" : ""}`}
        >
          <Icon size={17} />
          {link.name}
        </Link>
      );
    });

  const profileLinks = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "My Products",
      href: "/dashboard/products",
      icon: Package,
    },
    {
      name: "Stock History",
      href: "/dashboard/stock-movements",
      icon: History,
    },
    {
      name: "AI Insights",
      href: "/dashboard/ai-insights",
      icon: BrainCircuit,
    },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white backdrop-blur-xl">
      {/* Shared container: same width as Hero and Footer */}
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
        {/* Brand */}
        <Link
          href="/"
          onClick={closeMenus}
          className="flex shrink-0 items-center gap-2.5"
        >
          <span className="flex h-10 w-10 items-center justify-center text-emerald-600">
            <Boxes size={35} />
          </span>

          <span className="text-xl font-bold tracking-tight text-slate-900">
            Stock
            <span className="text-emerald-600">Wise</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 lg:flex">
          {renderNavLinks()}
        </div>

        {/* Desktop Authentication */}
        <div className="hidden items-center gap-3 md:flex">
          {isPending ? (
            <div className="h-10 w-28 animate-pulse rounded-xl bg-slate-100" />
          ) : user ? (
            <div ref={profileRef} className="relative">
              <button
                type="button"
                onClick={() => setShowProfileMenu((prev) => !prev)}
                aria-expanded={showProfileMenu}
                aria-haspopup="menu"
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-1.5 pr-3 transition hover:border-emerald-200 hover:bg-emerald-50/50"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
                  {initial}
                </span>

                <span className="max-w-28 text-left">
                  <span className="block truncate text-sm font-semibold text-slate-800">
                    {userName}
                  </span>
                  <span className="block text-xs text-slate-500">
                    StockWise User
                  </span>
                </span>

                <ChevronDown
                  size={16}
                  className={`text-slate-500 transition-transform ${
                    showProfileMenu ? "rotate-180" : ""
                  }`}
                />
              </button>

              {showProfileMenu && (
                <div
                  role="menu"
                  className="absolute right-0 top-full mt-3 w-72 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10"
                >
                  <div className="bg-gradient-to-br from-emerald-50 to-white p-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-lg font-bold text-white">
                        {initial}
                      </span>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-slate-900">
                          {userName}
                        </p>
                        <p className="truncate text-xs text-slate-500">
                          {userEmail}
                        </p>
                        <span className="mt-1 inline-flex rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
                          StockWise User
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-2">
                    {profileLinks.map((link) => {
                      const Icon = link.icon;

                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          role="menuitem"
                          onClick={closeMenus}
                          className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                            isActive(link.href)
                              ? "bg-emerald-50 font-medium text-emerald-700"
                              : "text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
                          }`}
                        >
                          <Icon size={17} />
                          {link.name}
                        </Link>
                      );
                    })}

                    <div className="my-2 border-t border-slate-100" />

                    <button
                      type="button"
                      role="menuitem"
                      disabled={isLoggingOut}
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <LogOut size={17} />
                      {isLoggingOut ? "Logging out..." : "Logout"}
                    </button>

                    {logoutError && (
                      <p role="alert" className="px-3 py-2 text-xs text-red-600">
                        {logoutError}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                <LogIn size={17} />
                Login
              </Link>

              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 hover:shadow-md"
              >
                <UserPlus size={17} />
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          className="rounded-xl p-2 text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-700 md:hidden"
        >
          {isOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-slate-200 bg-white px-5 py-4 shadow-lg sm:px-8 md:hidden">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-1">
            {user && (
              <div className="mb-3 flex items-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-700">
                  {initial}
                </span>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-900">
                    {userName}
                  </p>
                  <p className="truncate text-xs text-slate-500">
                    {userEmail}
                  </p>
                </div>
              </div>
            )}

            {renderNavLinks(true)}

            <div className="my-2 border-t border-slate-200" />

            {isPending ? (
              <div className="h-10 animate-pulse rounded-xl bg-slate-100" />
            ) : user ? (
              <>
                {profileLinks
                  .filter((link) =>
                    ["/dashboard/profile", "/dashboard/settings"].includes(
                      link.href
                    )
                  )
                  .map((link) => {
                    const Icon = link.icon;

                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={closeMenus}
                        className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-700"
                      >
                        <Icon size={18} />
                        {link.name}
                      </Link>
                    );
                  })}

                <button
                  type="button"
                  disabled={isLoggingOut}
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                >
                  <LogOut size={18} />
                  {isLoggingOut ? "Logging out..." : "Logout"}
                </button>

                {logoutError && (
                  <p role="alert" className="px-3 py-2 text-sm text-red-600">
                    {logoutError}
                  </p>
                )}
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={closeMenus}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  <LogIn size={18} />
                  Login
                </Link>

                <Link
                  href="/register"
                  onClick={closeMenus}
                  className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-3 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                  <UserPlus size={18} />
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;